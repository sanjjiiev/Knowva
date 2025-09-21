const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ChatOpenAI } = require("@langchain/openai");
const { SystemMessage } = require("@langchain/core/messages");
const { RunnableSequence } = require("@langchain/core/runnables");

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());


// ⚠️ Make sure you set your OpenAI API key in environment variables
const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4o-mini",
  temperature: 0.5,
});

// Helper function to wrap RunnableSequence to return plain string
const runChain = async (chain, topic) => {
  const result = await chain.invoke({ topic });
  // RunnableSequence might return SystemMessage object, so extract content if exists
  if (typeof result === "string") return result;
  if (result?.content) return result.content;
  return String(result);
};

// Define the chains for each task
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

// Main API endpoint
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Run all three chains in parallel
    const [explanationResult, practiceResult, revisionResult] = await Promise.all([
      runChain(explanationChain, message),
      runChain(practiceChain, message),
      runChain(revisionChain, message),
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

app.listen(5000, () => {
  console.log("AI server running on http://localhost:5000");
});
