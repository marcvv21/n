const mongoose = require("mongoose")

const fmuserSchema = new mongoose.Schema({
  UserID: String,
  Username: String,
});

module.exports = mongoose.model("fmuser", fmuserSchema)