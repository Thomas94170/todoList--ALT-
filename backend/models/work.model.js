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
    enum: ["Waiting", "In progress", "To be tested", "Finished"],
    default: "Waiting",
    require: true,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
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
  assigned_for: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

module.exports = mongoose.model("work", workSchema);

// corriger les tables, les champs categories, status et priorité doivent etre des enum
