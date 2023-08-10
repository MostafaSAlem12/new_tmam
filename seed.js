const ConnectDB = require("./config/DB");
const Branch = require("./models/Branch");
const User = require("./models/user");
const Status = require("./models/status");
const bcrypt = require("bcrypt");
//Connect to DB
ConnectDB();

const hashPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

let branches = [
  { title: "رئاسه الجهاز" },
  { title: "مساعد رئيس الجهاز" },
  { title: "العمليات" },
  { title: "التدريب" },
  { title: "النظم" },
  { title: "البحوث" },
  { title: "الأفراد" },
  { title: "الإشارة" },
  { title: "السكرتارية والإدارة المحلية" },
  { title: "شئون الضباط" },
  { title: "المركبات" },
  { title: "الأمن" },
  { title: "التسليح" },
  { title: "السكرتارية والمتابعه" },
  { title: "العمارة" },
  { title: "حملة" },
  { title: "تعيينات" },
  { title: "مزرعة" },
  { title: "ارشيف" },
  { title: "ميس" },
];

let st = [
  { title: "حضور" },
  { title: "تخلف/غياب" },
  { title: "سنوية" },
  { title: "عارضة" },
  { title: "مأمورية" },
  { title: "مست" },
  { title: "مرضية" },
  { title: "فرقة" },
  { title: "أجازة" },
  { title: "راحة" },
  { title: "سجن" },
  { title: "لجنة" },
  { title: "اذن" },
  { title: "تأخير" },
];

////////////////////////////users///////////////////////////////
// generate Users
const createUsers = async () => {
  const user = await User.insertMany([
    {
      name: "admin",
      password: hashPassword("123456"),
      role: "admin",
    },
    { name: "leader", password: hashPassword("123456"), role: "leader" },
    { name: "katebah", password: hashPassword("123456"), role: "katebah" },
    {
      name: "shon2_dobat",
      password: hashPassword("123456"),
      role: "shon2_dobat",
    },
  ]);
  console.log("users created...");
  console.log(user);
  process.exit(0);
};
// get All users
const getUsers = async () => {
  const users = await User.find({});
  console.log(users);
  process.exit(0);
};

// delet users
const deleteUsers = async () => {
  await User.deleteMany({});
  console.log("Deleted....");
  process.exit(0);
};
////////////////////////////users///////////////////////////////

////////////////////////////Branches///////////////////////////////
const createBranch = async () => {
  try {
    await Branch.insertMany(branches);
    console.log("branches created....");
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

// get All branches
const getBranches = async () => {
  const branches = await Branch.find({});
  console.log(branches);
  process.exit(0);
};

// delet branches
const deleteBranche = async () => {
  await Branch.deleteMany({});
  console.log("Deleted....");
  process.exit(0);
};
////////////////////////////Branches///////////////////////////////

const createStatus = async () => {
  try {
    await Status.insertMany(st);
    console.log("Status created....");
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

const getStatus = async () => {
  const status = await Status.find({});
  console.log(status);
  process.exit(0);
};

const deleteStatus = async () => {
  await Status.deleteMany({});
  console.log("Deleted....");
  process.exit(0);
};
if (process.argv[2] === "-allusers") {
  getUsers();
} else if (process.argv[2] === "-delete-users") {
  deleteUsers();
} else if (process.argv[2] === "-add-users") {
  createUsers();
} else if (process.argv[2] === "-add-branches") {
  createBranch();
} else if (process.argv[2] === "-allbranches") {
  getBranches();
} else if (process.argv[2] === "-delete-branches") {
  deleteBranche();
} else if (process.argv[2] === "-cretae-status") {
  createStatus();
} else if (process.argv[2] === "-delete-status") {
  deleteStatus();
} else if (process.argv[2] === "-get-status") {
  getStatus();
}
