// Debug log at module level
console.log("Loading config/keys.js with env vars:", {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ? "Present" : "Missing",
  SEARCH_API_KEY: process.env.SEARCH_API_KEY ? "Present" : "Missing",
  SEARCH_ENGINE_ID: process.env.SEARCH_ENGINE_ID ? "Present" : "Missing",
});

const keys = {
  openAiApiKey: process.env.OPENAI_API_KEY,
  searchApiKey: process.env.SEARCH_API_KEY,
  searchEngineId: process.env.SEARCH_ENGINE_ID,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
};

// Validate required keys
Object.entries(keys).forEach(([key, value]) => {
  if (!value) {
    console.error(`Missing required key in config/keys.js: ${key}`);
  }
});

module.exports = keys;
