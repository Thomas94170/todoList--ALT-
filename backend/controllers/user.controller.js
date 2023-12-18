const UserModel = require("../models/user.model");
const mongoose = require("mongoose");

module.exports.getUsers = async (req, res) => {
  console.log("function user appelée");
  const users = await UserModel.find();
  res.status(200).json(users);
};

module.exports.getUserById = async (req, res) => {
  console.log("fonction appelée");
  const userId = new mongoose.Types.ObjectId(req.params.id);

  console.log("Recherche du userId:", userId);
  const user = await UserModel.findOne({ _id: userId });

  console.log("Recherche du user :", user);
  if (!user) {
    return res.status(404).json({ message: "cet utilisateur n'existe pas" });
  }
  return res.status(200).json(user);
};

module.exports.setUsers = async (req, res) => {
  console.log("setUser");
  const user = await UserModel.create({
    nickname: req.body.nickname,
    email: req.body.email,
  });
  res.status(200).json(user);
  console.log(res.status);
};
