const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables first
const envPath = path.resolve(__dirname, ".env");
console.log("Loading .env file from:", envPath);
const result = dotenv.config({ path: envPath });
if (result.error) {
  console.error("Error loading .env file:", result.error);
  process.exit(1);
}

// Verify environment variables are loaded
console.log("Environment variables loaded:", {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ? "Present" : "Missing",
  SEARCH_API_KEY: process.env.SEARCH_API_KEY ? "Present" : "Missing",
  SEARCH_ENGINE_ID: process.env.SEARCH_ENGINE_ID ? "Present" : "Missing",
  MONGODB_URI: process.env.MONGODB_URI ? "Present" : "Missing",
  JWT_SECRET: process.env.JWT_SECRET ? "Present" : "Missing",
});

// Only continue if all required variables are present
const requiredEnvVars = [
  "OPENAI_API_KEY",
  "SEARCH_API_KEY",
  "SEARCH_ENGINE_ID",
  "MONGODB_URI",
  "JWT_SECRET",
];

const missingEnvVars = requiredEnvVars.filter(
  (varName) => !process.env[varName]
);

if (missingEnvVars.length > 0) {
  console.error("Missing required environment variables:", missingEnvVars);
  process.exit(1);
}

// Now require other modules
const cors = require("cors");
const mongoose = require("mongoose");
const chatRoutes = require("./routes/chatRoutes");
const searchRoutes = require("./routes/searchRoutes");
const authRoutes = require("./routes/authRoutes");
const { errorHandler } = require("./middlewares/errorHandler");

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/search", searchRoutes);

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
