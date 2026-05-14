const express = require("express");
const router = express.Router();

const {
  getRepoSummary,
  chatWithRepo
} = require("../controllers/repoController");


router.post("/repo-summary", getRepoSummary);
router.post("/chat", chatWithRepo);

module.exports = router;