const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });

const ConnetDB = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.URL_DB)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log("Connection Error");
      console.log(err);
    });
};

module.exports = ConnetDB;
