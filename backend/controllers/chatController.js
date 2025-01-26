const { generateResponse, optimizeQuery } = require("../services/aiService");
const { searchAndAnalyze } = require("../services/webSearchService");
const SearchResult = require("../models/SearchResult");

exports.getChatResponse = async (req, res, next) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required." });
  }

  try {
    // Step 1: Optimize the query using GPT
    console.log("Original query:", query);
    const optimizedQuery = await optimizeQuery(query);
    console.log("Optimized query:", optimizedQuery);

    // Step 2: Search with optimized query
    const webResults = await searchAndAnalyze(optimizedQuery);

    // Step 3: Format results for GPT analysis
    const formattedResults = webResults.map((result) => ({
      title: result.title,
      url: result.url,
      content: result.content,
      timestamp: result.timestamp,
    }));

    // Step 4: Generate AI response based on search results
    const aiResponse = await generateResponse(query, formattedResults);

    // Step 5: Save results to database with both queries
    const searchResult = new SearchResult({
      query,
      optimizedQuery,
      webResults: formattedResults,
      aiAnalysis: {
        summary: aiResponse,
        timestamp: new Date(),
      },
    });
    await searchResult.save();

    // Step 6: Send response to client
    res.status(200).json({
      response: aiResponse,
      debug: {
        originalQuery: query,
        optimizedQuery,
        resultCount: webResults.length,
      },
    });
  } catch (error) {
    console.error("Chat Response Error:", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      error:
        error.message || "An error occurred while processing your request.",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
