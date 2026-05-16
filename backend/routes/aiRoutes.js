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

      // NVIDIA Nemotron API
      const response =
        await axios.post(
          "https://integrate.api.nvidia.com/v1/chat/completions",
          {
            model:
              "nvidia/nemotron-3-nano-30b-a3b",

            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],

            temperature: 0.4,

            top_p: 0.9,

            max_tokens: 700,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,

              "Content-Type":
                "application/json",
            },
          }
        );

      // Extract Response
      const text =
        response.data.choices?.[0]
          ?.message?.content ||
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

      // NVIDIA Rate Limit
      if (
        error.response?.status ===
        429
      ) {
        message =
          "NVIDIA API rate limit exceeded. Please try again later.";
      }

      // Invalid Model
      if (
        error.response?.status ===
        404
      ) {
        message =
          "NVIDIA model not found.";
      }

      // Unauthorized
      if (
        error.response?.status ===
        401
      ) {
        message =
          "Invalid NVIDIA API key.";
      }

      res.status(500).json({
        error: message,
      });
    }
  }
);

module.exports = router;