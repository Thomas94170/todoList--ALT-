const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  nickname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("user", userSchema);
