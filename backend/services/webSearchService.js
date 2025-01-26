const axios = require("axios");
const cheerio = require("cheerio");
const SearchResult = require("../models/SearchResult");
const config = require("../config/keys");

// Debug log at module level
console.log("webSearchService loaded with config:", {
  searchApiKey: config.searchApiKey ? "Present" : "Missing",
  searchEngineId: config.searchEngineId ? "Present" : "Missing",
});

async function scrapeWebpage(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Remove scripts, styles, and other non-content elements
    $("script, style, nav, footer, header, iframe, noscript").remove();

    // Extract main content
    let content = $("body")
      .text()
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\n+/g, " ");

    // Limit content to ~1000 characters per webpage
    if (content.length > 1000) {
      content = content.slice(0, 1000) + "...";
    }

    return content;
  } catch (error) {
    console.error(`Failed to scrape ${url}:`, error);
    return "";
  }
}

exports.searchAndAnalyze = async (query) => {
  try {
    // Check for cached results
    const existingResult = await SearchResult.findOne({
      query: query.toLowerCase(),
      createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });

    if (
      existingResult &&
      existingResult.webResults &&
      existingResult.webResults.length > 0
    ) {
      console.log("Returning cached results for query:", query);
      return existingResult.webResults;
    }

    if (!config.searchApiKey || !config.searchEngineId) {
      throw new Error("Search API configuration missing");
    }

    const searchUrl = `https://www.googleapis.com/customsearch/v1`;
    const searchResponse = await axios.get(searchUrl, {
      params: {
        key: config.searchApiKey,
        cx: config.searchEngineId,
        q: query,
        num: 5, // Request 5 results
      },
    });

    if (!searchResponse.data.items || searchResponse.data.items.length === 0) {
      console.log("No search results found for query:", query);
      return [
        {
          title: "No results found",
          url: "",
          content: "Unable to find relevant information.",
          timestamp: new Date(),
        },
      ];
    }

    console.log(
      `Found ${searchResponse.data.items.length} search results for query:`,
      query
    );

    const webResults = await Promise.all(
      searchResponse.data.items.slice(0, 3).map(async (item) => {
        const content = await scrapeWebpage(item.link);
        return {
          title: item.title,
          url: item.link,
          content: content || item.snippet || "No content available",
          timestamp: new Date(),
        };
      })
    );

    return webResults.filter(
      (result) => result.content && result.content !== "No content available"
    );
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
};
