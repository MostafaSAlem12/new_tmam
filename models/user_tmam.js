const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TmamSchema = new Schema(
  {
    date: { type: Date, default: new Date(), unique: true },

    person: [{
      type: Schema.Types.ObjectId,
      ref: "Person",
    }],

    status: [{
      type: Schema.Types.ObjectId,
      ref: "Status",
    }],

    details: [{
      type: String,
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tmam", TmamSchema);
