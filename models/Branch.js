const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      reqiured: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Branch", BranchSchema);
