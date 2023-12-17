const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  nickname: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
