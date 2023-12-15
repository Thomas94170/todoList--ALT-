const UserModel = require("../models/user.model");

module.exports.getUsers = async (req, res) => {
  console.log("function user appelée");
  const users = await UserModel.find();
  res.status(200).json(users);
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
