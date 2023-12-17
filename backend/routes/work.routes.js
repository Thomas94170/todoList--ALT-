const express = require("express");
const {
  setWorks,
  getWorks,
  editWork,
} = require("../controllers/work.controller");
const router = express.Router();

router.get("/", getWorks);

router.post("/setWorks", setWorks);

router.patch("/:id", editWork);

module.exports = router;
