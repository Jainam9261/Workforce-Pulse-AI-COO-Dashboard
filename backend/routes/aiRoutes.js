// backend/routes/aiRoutes.js

const express = require("express");

const router = express.Router();

const axios = require("axios");

const dotenv = require("dotenv");

dotenv.config();

router.post(
  "/ask-ai",
  async (req, res) => {
    try {
      const {
        question,
        metrics,
        automationRanking,
        anomalies,
        chatHistory,
      } = req.body;

      // Conversation History
      const history =
        (chatHistory || [])
          .map((message) => {
            return `
${message.role.toUpperCase()}:
${message.content}
`;
          })
          .join("\n");

      // Final Prompt
      const prompt = `
You are an AI COO assistant.

You MUST answer ONLY using the provided operational analytics data.

Do NOT hallucinate or invent numbers.

Every quantitative statement must come from the dataset.

Conversation History:
${history}

Metrics:
${JSON.stringify(metrics, null, 2)}

Automation Ranking:
${JSON.stringify(
  automationRanking,
  null,
  2
)}

Anomalies:
${JSON.stringify(
  anomalies,
  null,
  2
)}

User Question:
${question}

Provide:
- concise insights
- operational recommendations
- automation suggestions
- workforce analysis
- bullet points where helpful
`;

      // Gemini API
      const response =
        await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }
        );

      // Extract Response
      const text =
        response.data.candidates?.[0]
          ?.content?.parts?.[0]
          ?.text ||
        "No response generated.";

      res.json({
        answer: text,
      });
    } catch (error) {
      console.log(
        error.response?.data || error
      );

      let message =
        "AI assistant failed.";

      // Quota Exceeded
      if (
        error.response?.status ===
        429
      ) {
        message =
          "Gemini free-tier quota exceeded. Please wait and try again later.";
      }

      // Model Not Found
      if (
        error.response?.status ===
        404
      ) {
        message =
          "Gemini model not found.";
      }

      res.status(500).json({
        error: message,
      });
    }
  }
);

module.exports = router;