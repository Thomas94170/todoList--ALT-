const express = require("express");
const {
  setWorks,
  getWorks,
  getWorkById,
  editWork,
} = require("../controllers/work.controller");
const router = express.Router();

router.get("/", getWorks);

router.get("/:id", getWorkById);

router.post("/setWorks", setWorks);

router.patch("/:id", editWork);

module.exports = router;
