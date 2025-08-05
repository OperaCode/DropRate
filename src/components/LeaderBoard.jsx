import React, { useState } from "react";
import { FaTrophy } from "react-icons/fa";

const rankIcons = ["🥇", "🥈", "🥉"];

export default function Leaderboard({ songs, theme }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!songs.length) {
    return (
      <div
        className={`p-4 rounded-xl shadow-md text-center ${
          theme === "dark"
            ? "bg-gray-800 text-gray-400 border-gray-700"
            : "bg-white text-gray-500 border-gray-200"
        }`}
      >
        No songs submitted yet. Add one to get started!
      </div>
    );
  }

  const topSongs = [...songs]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 3);

  const handleToggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div
      className={`space-y-4 p-4 rounded-xl shadow-md ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      }`}
      role="region"
      aria-label="Leaderboard of top songs"
    >
      <ul className="space-y-3">
        {topSongs.map((song, idx) => (
          <li
            key={idx}
            className={`flex flex-col bg-opacity-50 p-4 rounded-md shadow-sm hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] ${
              theme === "dark"
                ? "bg-gray-900 border-gray-800"
                : "bg-gray-50 border-gray-200"
            }`}
            role="listitem"
            aria-label={`Rank ${idx + 1}: ${song.title} by ${song.artist}`}
          >
            {/* Main Row: Rank, Song Details, Votes */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">
                  {rankIcons[idx] || "🎵"}
                </span>
                <div className="leading-tight">
                  <p
                    className={`text-sm font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {song.title}
                  </p>
                  <p
                    className={`text-xs ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {song.artist}{" "}
                    <span
                      className={theme === "dark" ? "text-purple-400" : "text-blue-600"}
                    >
                      ({song.genre || "Uncategorized"})
                    </span>
                  </p>
                </div>
              </div>
              <div
                className={`text-xs font-bold px-3 py-1 rounded-full shadow-inner ${
                  theme === "dark"
                    ? "bg-purple-700 text-white"
                    : "bg-blue-600 text-white"
                }`}
              >
                {song.votes} vote{song.votes !== 1 ? "s" : ""}
                {song.downvotes ? ` / ${song.downvotes} downvote${song.downvotes !== 1 ? "s" : ""}` : ""}
              </div>
            </div>

            {/* Expandable Details */}
            {song.link && (
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedIndex === idx ? "max-h-20 mt-2" : "max-h-0"
                }`}
              >
                <a
                  href={song.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm hover:underline ${
                    theme === "dark" ? "text-purple-400" : "text-blue-600"
                  }`}
                  aria-label={`Listen to ${song.title} by ${song.artist}`}
                >
                  Listen to Track
                </a>
              </div>
            )}
            {song.link && (
              <button
                onClick={() => handleToggleExpand(idx)}
                className={`text-xs mt-2 ${
                  theme === "dark" ? "text-purple-400 hover:text-purple-300" : "text-blue-600 hover:text-blue-500"
                }`}
                aria-expanded={expandedIndex === idx ? "true" : "false"}
                aria-label={expandedIndex === idx ? "Collapse song details" : "Expand song details"}
              >
                {expandedIndex === idx ? "Hide Details" : "Show Details"}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}