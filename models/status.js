const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatusSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Status", StatusSchema);
// enum: [
//   "حضور",
//   "تخلف/غياب",
//   "سنوية",
//   "عارضة",
//   "مأمورية",
//   "مست",
//   "مرضية",
//   "فرقة",
//   "أجازة",
//   "راحة",
//   "سجن",
//   "لجنة",
//   "اذن",
//   "تأخير",
// ],
