const express = require("express");
const {
  setUsers,
  getUsers,
  editUser,
} = require("../controllers/user.controller");
const router = express.Router();

router.get("/", getUsers);

router.post("/setUsers", setUsers);

// router.patch("/:id", editUser);

module.exports = router;
