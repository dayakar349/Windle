const axios = require("axios");
const { openAiApiKey } = require("../config/keys");

exports.generateResponse = async (query) => {
  const url = "https://api.openai.com/v1/chat/completions";

  const payload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that provides concise and accurate answers.",
      },
      {
        role: "user",
        content: query,
      },
    ],
    max_tokens: 150,
    temperature: 0.7,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${openAiApiKey}`,
  };

  const response = await axios.post(url, payload, { headers });
  return response.data.choices[0].message.content.trim();
};
