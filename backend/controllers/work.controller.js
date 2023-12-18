const WorkModel = require("../models/work.model");
const UserModel = require("../models/user.model");
const mongoose = require("mongoose");

module.exports.getWorks = async (req, res) => {
  const works = await WorkModel.find();
  res.status(200).json(works);
};

module.exports.getWorkById = async (req, res) => {
  const workId = new mongoose.Types.ObjectId(req.params.id);

  try {
    const work = await WorkModel.findOne({ _id: workId });

    if (!work) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    return res.status(200).json(work);
  } catch (error) {
    console.error("Erreur lors de la récupération de la tâche par ID", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports.setWorks = async (req, res) => {
  console.log("setWorks");
  const user = await UserModel.findOne({ nickname: req.body.created_by });

  if (!user) {
    return res.status(404).json({ message: "tâche non trouvé" });
  }
  const work = await WorkModel.create({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    status: req.body.status,
    priority: req.body.priority,
    due_time: req.body.due_time,
    created_on: req.body.created_on,
    updated: req.body.updated,
    created_by: user._id,
  });
  res.status(200).json(work);
  console.log(res.status);
};

module.exports.editWork = async (req, res) => {
  const work = await WorkModel.findById(req.params.id);

  if (!work) {
    res.status(400).json({ message: "Cette tâche n'existe pas" });
  }

  const updateWork = await WorkModel.findByIdAndUpdate(work, req.body, {
    new: true,
  });
  res.status(200).json(updateWork);
};
