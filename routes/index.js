const router = require("express").Router();
const moment = require("moment");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");
const Branch = require("../models/Branch");
const Person = require("../models/Person");
const Status = require("../models/status");
const Tmam = require("../models/user_tmam");
const mongoose = require("mongoose");

const isAuth = (req, res, next) => {
  if (!req.session.auth) {
    return res.redirect("signin");
  }
  next();
};

const isAdmin = (req, res, next) => {
  isAuth(req, res, () => {
    if (req.session.user.role !== "admin") {
      return res.redirect("/");
    }
    next();
  });
};

// Dashboard // Persons

// get dashboard Page
router.get(
  "/dashboard",
  isAuth,
  asyncHandler(async (req, res, next) => {
    const user = req.session.user;

    if (user.role === "katebah") {
      const sub_officer = await Person.find({ rank: "ضابط صف" }).populate(
        "branchId"
      );
      const soldier = await Person.find({ rank: "جندي" }).populate("branchId");
      // console.log(sub_officer);
      // console.log(soldier);
      return res.render("admin/dashboard", {
        title: "لوحه التحكم",
        user,
        sub_officer,
        soldier,
      });
    }
    if (user.role === "shon2_dobat") {
      // console.log(officer);
      const officer = await Person.find({ rank: "ضابط" }).populate("branchId");

      return res.render("admin/dashboard", {
        title: "لوحه التحكم",
        user,
        officer,
      });
    }
    if (user.role === "admin") {
      const officer = await Person.find({ rank: "ضابط" }).populate("branchId");
      const sub_officer = await Person.find({ rank: "ضابط صف" }).populate(
        "branchId"
      );
      const soldier = await Person.find({ rank: "جندي" }).populate("branchId");
      // console.log(officer);
      // console.log(sub_officer);
      // console.log(soldier);
      return res.render("admin/dashboard", {
        title: "لوحه التحكم",
        user,
        officer,
        sub_officer,
        soldier,
      });
    }
  })
);

// view person page
router.get(
  "/view/:id",
  isAuth,
  asyncHandler(async (req, res, next) => {
    const user = req.session.user;
    const { id } = req.params;
    console.log("ID" + id);
    const person = await Person.findById(id).populate("branchId");

    console.log(person);
    res.render("admin/ViewPerson", { title: "عرض", user, person });
  })
);

// form to add new person
router.get(
  "/new_person",
  isAuth,
  asyncHandler(async (req, res, next) => {
    const user = req.session.user;
    const branches = await Branch.find({});
    const AddFormError = req.flash("AddPersonValidationError");
    res.render("person/new", {
      title: "إضافه شخص",
      user,
      branches,
      massages: AddFormError,
    });
  })
);

// form to add new person
router.post(
  "/new_person",
  [
    check("name").notEmpty().withMessage("ادخل الاسم"),
    check("rank").notEmpty().withMessage("ادخل الدرجه او الرتبه"),
    check("sub_rank").notEmpty().withMessage("ادخل النوع"),
    check("branchId").notEmpty().withMessage("اختر الفرع"),
    check("mulutary_number").notEmpty().withMessage("ادخل الرقم العسكري"),
    check("shift_type").notEmpty().withMessage("ادخل النوبتجيه"),
  ],
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("===".repeat(50));
      var validationMasseges = [];
      for (let i = 0; i < errors.errors.length; i++) {
        validationMasseges.push(errors.errors[i].msg);
      }
      // console.log(errors.errors);
      // console.log(validationMasseges);
      req.flash("AddPersonValidationError", validationMasseges);
      res.redirect("/new_person");
      return;
    }
    const new_person = new Person(req.body);
    await new_person.save();
    res.redirect("/new_person");
  })
);

// form to edit  person
router.get(
  "/edit_person/:id",
  isAuth,
  asyncHandler(async (req, res, next) => {
    const user = req.session.user;
    const branches = await Branch.find({});
    const { id } = req.params;
    const person = await Person.findById(id);
    console.log(person);

    const EditFormError = req.flash("EditPersonValidationError");
    res.render("person/edit", {
      title: "تعديل شخص",
      user,
      branches,
      person,
      massages: EditFormError,
    });
  })
);
// form to eidt  person
router.put(
  "/edit_person/:id",
  [
    check("name").notEmpty().withMessage("ادخل الاسم"),
    check("rank").notEmpty().withMessage("ادخل الدرجه او الرتبه"),
    check("sub_rank").notEmpty().withMessage("ادخل النوع"),
    check("branchId").notEmpty().withMessage("اختر الفرع"),
    check("mulutary_number").notEmpty().withMessage("ادخل الرقم العسكري"),
    check("shift_type").notEmpty().withMessage("ادخل النوبتجيه"),
  ],
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("===".repeat(50));
      var validationMasseges = [];
      for (let i = 0; i < errors.errors.length; i++) {
        validationMasseges.push(errors.errors[i].msg);
      }
      // console.log(errors.errors);
      // console.log(validationMasseges);
      req.flash("EditPersonValidationError", validationMasseges);
      res.redirect("/edit_person/" + req.params.id);
      return;
    }
    console.log(req.body);
    const { id } = req.params;
    const edit_person = await Person.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(edit_person);
    res.redirect("/dashboard");
  })
);

// form to delete person

router.delete(
  "/delete_person/:id",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    await Person.findByIdAndDelete(id);
    res.redirect("/dashboard");
  })
);

// index page
router.get(
  "/",
  isAuth,
  asyncHandler(async (req, res, next) => {
    const user = req.session.user;
    const status = await Status.find({});
    let userTmam = await Tmam.find({})
      .populate("person", "name")
      .populate("status", "title");
    let st = [];
    console.log("Person --- >");
    userTmam.forEach((el) => {
      console.log(el.date);
      console.log(el.person);
      console.log("/////");
      console.log(el.status);
      st = el.status.map((state) => {
        return state.title;
      });
    });

    console.log("Person --- >");
    console.log(st);
    // let userTmam = await Tmam.find({ status: "حضور" });

    if (user.role === "katebah") {
      const sub_officer = await Person.find({ rank: "ضابط صف" }).populate(
        "branchId"
      );
      const soldier = await Person.find({ rank: "جندي" }).populate("branchId");
      // console.log(sub_officer);
      // console.log(soldier);
      return res.render("index", {
        title: "الصفحه الرئيسيه",
        user,
        sub_officer,
        soldier,
        status,
        userTmam,
      });
    }
    if (user.role === "shon2_dobat") {
      // console.log(officer);
      const officer = await Person.find({ rank: "ضابط" }).populate("branchId");

      return res.render("index", {
        title: "الصفحه الرئيسيه",
        user,
        officer,
        status,
        userTmam,
      });
    }
    if (user.role === "admin") {
      const officer = await Person.find({ rank: "ضابط" }).populate("branchId");
      const sub_officer = await Person.find({ rank: "ضابط صف" }).populate(
        "branchId"
      );
      const soldier = await Person.find({ rank: "جندي" }).populate("branchId");

      // console.log(officer);
      // console.log(sub_officer);
      // console.log(soldier);
      return res.render("index", {
        title: "الصفحه الرئيسيه",
        user,
        officer,
        sub_officer,
        soldier,
        status,
        userTmam,
      });
    }
  })
);

/// new tmam
router.post(
  "/new_tmam",
  isAuth,
  asyncHandler(async (req, res, next) => {
    const { date, person, status, details } = req.body;

    // Create a new instance of Tmam model
    const tmam = new Tmam({
      date,
      person,
      status,
      details,
    });
    tmam.save();
    res.redirect("/");
  })
);
// check is Signin or not

// function isSignIn(req, res, next) {
//   if (!req.isAuthenticated()) {
//     res.redirect("signin");
//     return;
//   }
//   next();
// }
module.exports = router;
