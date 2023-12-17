const express = require("express");
const { setUsers, getUsers } = require("../controllers/user.controller");
const router = express.Router();

router.get("/", getUsers);

router.post("/setUsers", setUsers);

module.exports = router;
