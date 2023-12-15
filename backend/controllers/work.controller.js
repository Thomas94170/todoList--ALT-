const WorkModel = require("../models/work.model");

module.exports.getWorks = async (req, res) => {
  const users = await WorkModel.find();
  res.status(200).json(users);
};

module.exports.setWorks = async (req, res) => {
  console.log("setWorks");
  const work = await WorkModel.create({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    status: req.body.status,
    priority: req.body.priority,
    due_time: req.body.due_time,
    created_on: req.body.created_on,
    updated: req.body.updated,
    created_by: req.body.created_by,
  });
  res.status(200).json(work);
  console.log(res.status);
};
