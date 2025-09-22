const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ChatOpenAI } = require("@langchain/openai");
const { SystemMessage } = require("@langchain/core/messages");
const { RunnableSequence } = require("@langchain/core/runnables");

require("dotenv").config();

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://tj2noyhdmenib-frontend--80.prod1b.defang.dev"
  ],
  credentials: true
}));

app.use(bodyParser.json());

// OpenAI model
const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4o-mini",
  temperature: 0.5,
});

// Helper function
const runChain = async (chain, input) => {
  const result = await chain.invoke(input);
  if (typeof result === "string") return result;
  if (result?.content) return result.content;
  return String(result);
};

// ===================== CHATBOX ENDPOINT =====================
const explanationChain = RunnableSequence.from([
  (input) => new SystemMessage(`Explain this topic in simple terms: ${input.topic}`),
  (input) => model.invoke([input]),
]);

const practiceChain = RunnableSequence.from([
  (input) => new SystemMessage(`Generate 7 practice questions on: ${input.topic}`),
  (input) => model.invoke([input]),
]);

const revisionChain = RunnableSequence.from([
  (input) => new SystemMessage(`Give short revision notes on: ${input.topic}`),
  (input) => model.invoke([input]),
]);

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const [explanationResult, practiceResult, revisionResult] = await Promise.all([
      runChain(explanationChain, { topic: message }),
      runChain(practiceChain, { topic: message }),
      runChain(revisionChain, { topic: message }),
    ]);

    res.json({
      explanation: explanationResult,
      practice: practiceResult,
      revision: revisionResult,
    });
  } catch (error) {
    console.error("Error in /chat:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ===================== SEARCH ENDPOINT =====================
const searchChain = RunnableSequence.from([
  (input) =>
    new SystemMessage(
      `You are an assistant that simulates web search results. 
      User query: "${input.query}".
      Return a JSON array of 5 items with these fields:
      {
        "title": "Title of result",
        "url": "URL link",
        "source": "Google" or "YouTube",
        "snippet": "Short description (2-3 lines)"
      }.
      Only return valid JSON.`
    ),
  (input) => model.invoke([input]),
]);

app.post("/search", async (req, res) => {
  const { query } = req.body;

  if (!query || !query.trim()) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    let resultsStr = await runChain(searchChain, { query });

    // Remove code fences or extra markdown
    resultsStr = resultsStr
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let results = [];
    try {
      results = JSON.parse(resultsStr);
    } catch (err) {
      console.warn("Failed to parse AI search response:", err);
      results = [];
    }

    res.json({ results });
  } catch (error) {
    console.error("Error in /search:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.listen(5000, () => {
  console.log("AI server running on http://localhost:5000");
});