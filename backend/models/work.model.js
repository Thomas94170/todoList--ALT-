const mongoose = require("mongoose");

const workSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  priority: {
    type: String,
    require: true,
  },
  due_time: {
    type: Date,
    require: true,
  },
  created_on: {
    type: Date,
    require: true,
  },
  updated: {
    type: Date,
    require: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("work", workSchema);
