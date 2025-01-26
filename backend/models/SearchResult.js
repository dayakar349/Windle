const mongoose = require("mongoose");

const searchResultSchema = new mongoose.Schema(
  {
    query: {
      type: String,
      required: true,
      index: true,
    },
    optimizedQuery: {
      type: String,
      required: true,
    },
    webResults: [
      {
        title: String,
        url: String,
        content: String,
        timestamp: Date,
      },
    ],
    aiAnalysis: {
      summary: String,
      keywords: [String],
      timestamp: Date,
    },
  },
  { timestamps: true }
);

// Index for efficient querying
searchResultSchema.index({ query: 1, createdAt: -1 });
searchResultSchema.index({ optimizedQuery: 1, createdAt: -1 });

module.exports = mongoose.model("SearchResult", searchResultSchema);
