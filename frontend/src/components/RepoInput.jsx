import React from "react";
import { useState } from "react";

export default function RepoInput({ onAnalyze, loading }) {
  const [url, setUrl] = useState("");

  return (
    <div className="w-full max-w-xl flex gap-3">
      <input
        type="text"
        placeholder="Paste GitHub repo URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1 p-4 rounded-xl bg-white/5 backdrop-blur-lg text-white outline-none border border-white/10 focus:border-blue-500 transition"
      />

      <button
        onClick={() => onAnalyze(url)}
        disabled={loading}
        className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-xl hover:opacity-90 hover:scale-105 active:scale-95 transition duration-200"
      >
        {loading ? "..." : "Analyze"}
      </button>
    </div>
  );
}