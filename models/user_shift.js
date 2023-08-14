const mongoose = require("mongoose");

const ShiftSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      default: new Date(),
    },
    shift: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shift",
      required: true,
    },
    person: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user_shift", ShiftSchema);
