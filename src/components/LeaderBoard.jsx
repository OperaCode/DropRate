import React from "react";

const rankIcons = ["🥇", "🥈", "🥉"];

export default function Leaderboard({ songs }) {
  if (!songs.length) return null;

  const topSongs = [...songs]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 3);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-purple-300 text-center flex items-center justify-center gap-2">
        🏆 Leaderboard
      </h2>

      <ul className="space-y-3">
        {topSongs.map((song, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center bg-gray-900 border border-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-800 transition"
          >
            {/* Rank + Song Details */}
            <div className="flex items-center gap-3">
              <span className="text-2xl">{rankIcons[idx] || "🎵"}</span>
              <div>
                <p className="text-white font-semibold text-lg">{song.title}</p>
                <p className="text-sm text-gray-400">
                  {song.artist} <span className="text-purple-400">({song.genre || "N/A"})</span>
                </p>
              </div>
            </div>

            {/* Votes */}
            <span className="text-purple-400 font-bold text-lg">
              {song.votes} 👍
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
