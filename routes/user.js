const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const User = require("../models/user");

// GET REGISTER USER
router.get("/signup", (req, res, next) => {
  var massagesError = req.flash("error");
  res.render("users/register", {
    title: "تسجيل الدخول",
    massages: massagesError,
  });
});

//REGISTER USER
router.post(
  "/signup",
  [
    check("name").notEmpty().withMessage("ادخل الأسم"),
    check("password").notEmpty().withMessage("ادخل كلمه المرور"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("كلمه المرور يجب ان تكو اكبر من 5 اعداد"),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("===".repeat(50));
      console.log(errors.errors);
      var validationMasseges = [];
      for (let i = 0; i < errors.errors.length; i++) {
        validationMasseges.push(errors.errors[i].msg);
      }
      console.log(validationMasseges);
      req.flash("error", validationMasseges);
      res.redirect("/signup");
      return;
    }
    next();
  },
  passport.authenticate("local-signup", {
    session: false,
    successRedirect: "signin",
    failureRedirect: "signup",
    failureFlash: true,
  })
);
/*
                try{
                    const {name , password} = req.body;
                    const user  = await User.findOne({name})
                            if(user){
                                console.log(user)
                                req.flash("error" , "المستخدم موجود بالفعل")
                                res.redirect("/signup")
                            }else{
                                const newuser = await new User({
                                    name,
                                    password : new User().hashPassword(password)
                                });
                                
                                await newuser.save(newuser);
                                console.log("user" + newuser)
                                res.redirect("/")
                            }
                            
                     
                         
                       

                           
                    }catch(err){
                    console.log(err)
                }
      */

// GET LOGIN USER
router.get("/signin", (req, res) => {
  const LoginError = req.flash("SignInError");
  res.render("users/login", { title: "تسجيل الدخول", massages: LoginError });
});

// LOGIN USER
router.post("/signin", async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("===".repeat(50));
    console.log(errors.errors);
    var validationMasseges = [];
    for (let i = 0; i < errors.errors.length; i++) {
      validationMasseges.push(errors.errors[i].msg);
    }
    console.log(validationMasseges);
    req.flash("SignInError", validationMasseges);
    res.redirect("/signin");
    return;
  }
  // next()
  let { name, password } = req.body;
  try {
    const user = await User.findOne({ name: name });
    if (!user) {
      req.flash("SignInError", "☺,المستخدم غير موحجود");
      return res.redirect("/signin");
    }
    if (!user.Comparepassword(password)) {
      req.flash("SignInError", "☺,هناك خطأ في كلمه المرور");
      return res.redirect("/signin");
    }
    console.log("==".repeat(50));
    // if passwords match return user
    console.log(req.session, user);
    req.session.auth = true;
    req.session.user = user;
    // req.session.user = user;
    console.log("==".repeat(50));

    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.redirect("signin");
});

module.exports = router;
