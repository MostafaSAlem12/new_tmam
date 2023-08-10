const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const ConnectDB = require("./config/DB");

const PORT = process.env.PORT || 4040;

//Connect to DB
ConnectDB();
require("./config/passport");

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "new_tmaam",
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //     // Session expires after 1 min of inactivity.
    //     expires: 60000
    // }
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/index"));
app.use("/", require("./routes/user"));

app.listen(PORT, () => {
  console.log(`server  connected on port ${PORT}......`);
});
