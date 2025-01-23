const { generateResponse } = require("../services/aiService");

exports.getChatResponse = async (req, res, next) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required." });
  }

  try {
    const response = await generateResponse(query);
    res.status(200).json({ response });
  } catch (error) {
    next(error);
  }
};
