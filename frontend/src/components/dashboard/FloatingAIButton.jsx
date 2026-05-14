import { useState } from "react";

import {
  Bot,
  Send,
  Loader2,
  X,
  Sparkles,
} from "lucide-react";

import API from "../../services/api";

const FloatingAIButton = ({
  metrics,
  automationRanking,
  anomalies,
  darkMode,
}) => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  // Ask AI
  const handleAskAI = async () => {
    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const response = await API.post("/ai/ask-ai", {
        question,
        metrics,
        automationRanking,
        anomalies,
        chatHistory: [...messages, userMessage],
      });

      const aiMessage = {
        role: "assistant",
        content: response.data.answer,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        role: "assistant",
        content:
          error.response?.data?.error || "AI assistant failed.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const examples = [
    "Who has the highest repetitive workload?",
    "Which department should we automate first?",
    "Show week-over-week trends.",
  ];

  return (
    <>
      {/* Chat Panel */}
      <div
        className={`fixed bottom-28 right-8 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[600px] max-h-[calc(100vh-10rem)] rounded-3xl border shadow-2xl backdrop-blur-2xl overflow-hidden origin-bottom-right transition-all duration-300 ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        } ${
          darkMode
            ? "bg-[#0F172A]/95 border-white/10"
            : "bg-white/95 border-gray-200"
        }`}
      >
        {/* Header */}
        <div
          className={`p-5 border-b flex items-center justify-between ${
            darkMode ? "border-white/10" : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Bot size={24} />
            </div>

            <div>
              <h2 className="text-lg font-bold leading-tight">
                AI COO Assistant
              </h2>

              <p
                className={`text-xs mt-1 flex items-center ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-1.5 animate-pulse" />
                Online · Workforce Intelligence
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all ${
              darkMode
                ? "bg-white/5 hover:bg-white/10 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[calc(100%-9rem)] overflow-y-auto p-5 space-y-4">
          {messages.length === 0 && (
            <div className="space-y-3">
              <div
                className={`flex items-center gap-2 text-sm mb-2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <Sparkles size={14} className="text-blue-400" />
                Try one of these examples
              </div>

              {examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setQuestion(example)}
                  className={`w-full text-left rounded-2xl px-4 py-3 text-sm transition-all ${
                    darkMode
                      ? "bg-white/5 hover:bg-white/10 text-gray-200 border border-white/5"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200"
                  }`}
                >
                  {example}
                </button>
              ))}
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-md"
                    : darkMode
                    ? "bg-white/10 text-white rounded-bl-md"
                    : "bg-gray-100 text-gray-900 rounded-bl-md"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div
                className={`px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-2 text-sm ${
                  darkMode ? "bg-white/10" : "bg-gray-100"
                }`}
              >
                <Loader2 size={16} className="animate-spin text-blue-400" />
                <span>AI is thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 border-t ${
            darkMode
              ? "border-white/10 bg-[#0F172A]/95"
              : "border-gray-200 bg-white/95"
          }`}
        >
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask AI anything..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAskAI();
              }}
              className={`flex-1 px-4 py-3 rounded-xl outline-none border text-sm transition-all focus:border-blue-500/50 ${
                darkMode
                  ? "bg-[#111827] border-white/10 text-white placeholder:text-gray-500"
                  : "bg-gray-100 border-gray-200 text-gray-900"
              }`}
            />

            <button
              onClick={handleAskAI}
              disabled={loading || !question.trim()}
              className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-8 right-8 z-50 group"
        aria-label={open ? "Close AI Assistant" : "Open AI Assistant"}
      >
        {/* Pulse ring (only when closed) */}
        {!open && (
          <>
            <span className="absolute inset-0 rounded-full bg-blue-500/40 animate-ping" />
            <span className="absolute inset-0 rounded-full bg-purple-500/30 animate-pulse" />
          </>
        )}

        {/* Button */}
        <span className="relative h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center shadow-2xl shadow-blue-500/50 group-hover:scale-110 transition-transform duration-300">
          <span
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              open ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
            }`}
          >
            <Bot size={28} />
          </span>

          <span
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
            }`}
          >
            <X size={26} />
          </span>
        </span>
      </button>
    </>
  );
};

export default FloatingAIButton;
