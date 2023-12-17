const express = require("express");
const {
  setUsers,
  getUsers,
  getUserById,
} = require("../controllers/user.controller");
const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/setUsers", setUsers);

module.exports = router;
