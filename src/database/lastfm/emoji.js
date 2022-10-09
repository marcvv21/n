const mongoose = require("mongoose")

const fmemojiSchema = new mongoose.Schema({
  UserID: String,
  Emoji1: String,
  Emoji2: String
});

module.exports = mongoose.model("fmemoji", fmemojiSchema)