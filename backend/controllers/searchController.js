const { searchWeb } = require("../services/webSearchService");

exports.performSearch = async (req, res, next) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Search query is required." });
  }

  try {
    const results = await searchWeb(query);
    res.status(200).json({ results });
  } catch (error) {
    next(error);
  }
};
