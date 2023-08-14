const mongoose = require("mongoose");
const ShiftsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

module.exports = mongoose.model("Shift", ShiftsSchema);
//  [
//       "قائد منوب",
//       "ضابط منوب",
//       "ضابط نوبتجي",
//       "مساعد ضابط نوبتجي",
//       "البوابه الرئيسيه",
//       "البوابه الخلفيه",
//       "السجن",
//       "السلاح والذخيره",
//       "برج 1",
//       "برج 2",
//     ],
