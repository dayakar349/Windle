const axios = require("axios");
const { searchApiKey } = require("../config/keys");

exports.searchWeb = async (query) => {
  // Using Google Custom Search API as an example
  const url = `https://www.googleapis.com/customsearch/v1?key=${searchApiKey}&q=${encodeURIComponent(
    query
  )}`;

  const response = await axios.get(url);

  return response.data.items.map((item) => ({
    title: item.title,
    link: item.link,
    snippet: item.snippet,
  }));
};
