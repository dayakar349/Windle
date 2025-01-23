const express = require("express");
const { getChatResponse } = require("../controllers/chatController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, getChatResponse);

module.exports = router;
