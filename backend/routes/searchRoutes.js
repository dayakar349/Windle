const express = require("express");
const { performSearch } = require("../controllers/searchController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, performSearch);

module.exports = router;
