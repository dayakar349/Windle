const axios = require("axios");
const config = require("../config/keys");

// Debug log at module level
console.log("aiService loaded with config:", {
  openAiApiKey: config.openAiApiKey ? "Present" : "Missing",
});

function truncateContext(context, maxLength = 4000) {
  if (!context || context.length <= maxLength) return context;

  const chunks = context.split("\n\n");
  let result = "";

  for (const chunk of chunks) {
    if ((result + chunk).length > maxLength) break;
    result += (result ? "\n\n" : "") + chunk;
  }

  return result;
}

exports.generateResponse = async (query, contextContent) => {
  if (!config.openAiApiKey) {
    throw new Error("OpenAI API key is not configured");
  }

  // Format context content
  const formattedContext = Array.isArray(contextContent)
    ? contextContent
        .map((result) => `Source: ${result.title}\n${result.content}`)
        .join("\n\n")
    : contextContent;

  // Truncate context to avoid token limit
  const truncatedContext = truncateContext(formattedContext);

  const url = "https://api.openai.com/v1/chat/completions";

  const systemMessage = `You are a helpful assistant that provides accurate answers based on the following search results. 
  Use the provided information to answer the question. If the search results don't contain relevant information, 
  you can provide a general response while mentioning that it's not based on the search results.
  
  Search Results:
  ${truncatedContext}`;

  const payload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: `Based on the search results provided, please answer this question: ${query}`,
      },
    ],
    max_tokens: 500,
    temperature: 0.7,
  };

  try {
    console.log("Context length:", truncatedContext.length);

    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${config.openAiApiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.data.choices?.[0]?.message?.content) {
      throw new Error("Invalid response from OpenAI API");
    }

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw new Error(
      error.response?.data?.error?.message || "Failed to generate AI response"
    );
  }
};

exports.optimizeQuery = async (userQuery) => {
  if (!config.openAiApiKey) {
    throw new Error("OpenAI API key is not configured");
  }

  const url = "https://api.openai.com/v1/chat/completions";
  const payload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a search query optimizer. Your task is to:
        1. Understand the user's intent
        2. Identify key concepts and entities
        3. Reformulate the query to be more precise and searchable
        4. Return ONLY the optimized search query without any explanation`,
      },
      {
        role: "user",
        content: userQuery,
      },
    ],
    max_tokens: 100,
    temperature: 0.3, // Lower temperature for more focused results
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${config.openAiApiKey}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Query Optimization Error:", error);
    return userQuery; // Fallback to original query if optimization fails
  }
};
