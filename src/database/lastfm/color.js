const mongoose = require("mongoose")

const fmcolorSchema = new mongoose.Schema({
  UserID: String,
  Color: String,
});

module.exports = mongoose.model("fmcolor", fmcolorSchema)