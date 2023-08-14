const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    rank: {
      type: String,
      required: true,
    },
    sub_rank: {
      type: String,
      required: true,
    },
    // tadreeb: {
    //   type: Boolean,
    //   default: false,
    // },

    branchId: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    mulutary_number: {
      type: Number,
      unique: true,
      trim: true,
      required: true,
      default: 0,
    },
    shift_type: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Shift",
      type: String,
      required: true,
      trim: true,
    },
    status:{
      type: Schema.Types.ObjectId,
      ref: "status",
      required:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Person", personSchema);
