import React from "react";
import ReactMarkdown from "react-markdown";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import RepoInput from "../components/RepoInput.jsx";

export default function Home() {

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const analyzeRepo = async (url) => {

    if (!url) return;

    setLoading(true);
    setSummary("");
    setMessages([]);

    try {

      const res = await axios.post(
        "https://repomind-backend-ckrk.onrender.com/api/repo-summary",
        { repoUrl: url }
      );

      setSummary(res.data.summary);

    } catch (err) {

      console.error(err);
      alert("Failed to analyze repo");

    }

    setLoading(false);
  };

  const askQuestion = async () => {

    if (!question) return;

    const newMessages = [
      ...messages,
      {
        role: "user",
        text: question,
      },
    ];

    setMessages(newMessages);

    try {

      const res = await axios.post(
        "https://repomind-backend-ckrk.onrender.com/api/chat",
        { question }
      );

      setMessages([
        ...newMessages,
        {
          role: "ai",
          text: res.data.answer,
        },
      ]);

    } catch (err) {

      console.error(err);

    }

    setQuestion("");
  };

  return (

    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-black via-[#050816] to-black text-white flex flex-col items-center px-6 py-10">

      {/* Glow Effects */}
      <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-blue-500/20 blur-[120px] rounded-full animate-pulse"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-purple-500/20 blur-[120px] rounded-full animate-pulse"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full flex flex-col items-center">

        {/* Hero Section */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl px-10 py-14 shadow-2xl w-full max-w-4xl flex flex-col items-center">

          <motion.h1
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent text-center"
          >
            RepoMind AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-lg mb-10 text-center"
          >
            Understand any GitHub repository instantly with AI
          </motion.p>

          {/* Repo Input */}
          <RepoInput
            onAnalyze={analyzeRepo}
            loading={loading}
          />

          {/* Loading */}
          {loading && (

            <div className="flex gap-2 mt-8">

              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>

              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-100"></div>

              <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-200"></div>

            </div>
          )}

        </div>

        {/* Summary */}
        {summary && (

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fade-in mt-10 w-full max-w-5xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl"
          >

            <div className="prose prose-invert prose-li:marker:text-blue-400 max-w-none">

              <ReactMarkdown>
                {summary}
              </ReactMarkdown>

            </div>

          </motion.div>
        )}

        {/* Chat Section */}
        {summary && (

          <div className="mt-10 w-full max-w-5xl">

            {/* Messages */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-5 max-h-[500px] overflow-y-auto space-y-4 shadow-2xl">

              {messages.length === 0 && (

                <p className="text-gray-500 text-sm">
                  Ask anything about the repository...
                </p>
              )}

              {messages.map((msg, i) => (

                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`px-5 py-3 rounded-2xl max-w-[75%] shadow-lg ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        : "bg-gray-900/80 border border-white/10 text-gray-200"
                    }`}
                  >

                    <ReactMarkdown>
                      {msg.text}
                    </ReactMarkdown>

                  </div>

                </div>
              ))}

              <div ref={chatEndRef} />

            </div>

            {/* Chat Input */}
            <div className="flex gap-3 mt-4">

              <input
                value={question}
                onChange={(e) =>
                  setQuestion(e.target.value)
                }
                placeholder="Ask about the repository..."
                className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg outline-none focus:border-blue-500 transition"
              />

              <button
                onClick={askQuestion}
                className="
                  bg-gradient-to-r
                  from-blue-500
                  to-purple-500
                  px-7
                  rounded-2xl
                  font-semibold
                  hover:scale-105
                  hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]
                  transition-all
                  duration-300
                  active:scale-95
                "
              >
                Ask
              </button>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}