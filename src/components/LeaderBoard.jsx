import React from "react";

const rankIcons = ["🥇", "🥈", "🥉"];

export default function Leaderboard({ songs }) {
  if (!songs.length) return null;

  const topSongs = [...songs]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 3);

  return (
    <div className="space-y-4">
      

      <ul className="space-y-3">
        {topSongs.map((song, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center bg-gray-950 border border-gray-800 p-3 rounded-md shadow-sm hover:shadow-md transition"
          >
            {/* Left: Rank and Song Details */}
            <div className="flex items-center gap-3">
              <span className="text-2xl">{rankIcons[idx] || "🎵"}</span>
              <div className="leading-tight">
                <p className="text-sm font-medium text-white">{song.title}</p>
                <p className="text-xs text-gray-400">
                  {song.artist}{" "}
                  <span className="text-purple-400">
                    ({song.genre || "Uncategorized"})
                  </span>
                </p>
              </div>
            </div>

            {/* Right: Vote Count */}
            <div className="bg-purple-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-inner">
              {song.votes} votes
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
