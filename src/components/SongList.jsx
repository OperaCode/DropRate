import React, { useState } from "react";
import {
  FaMusic,
  FaUserAlt,
  FaTags,
  FaThumbsUp,
  FaThumbsDown,
  FaSearch,
} from "react-icons/fa";

const SongList = ({ songs, onVote, onDiscredit, selectedGenre, searchQuery }) => {
  const [localSearch, setLocalSearch] = useState(searchQuery || "");

  const genres = ["All", ...new Set(songs.map((song) => song.genre || "Uncategorized"))];

  const filtered =
    selectedGenre === "All"
      ? songs
      : songs.filter((song) => song.genre === selectedGenre);

  const searched = filtered.filter((song) =>
    `${song.title} ${song.artist}`.toLowerCase().includes(localSearch.toLowerCase())
  );

  const sorted = [...searched].sort((a, b) => b.votes - a.votes);

  return (
    <div className="space-y-6">
      {/* Search */}
      {/* <div className="flex items-center gap-2 mb-4">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search songs..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div> */}

      {sorted.length === 0 ? (
        <p className="text-gray-400 text-center italic">
          No songs match your filters.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {sorted.map((song, idx) => (
            <div
              key={idx}
              className="bg-gray-950 border border-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
            >
              {/* Header Info */}
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <FaMusic className="text-purple-400" />
                  {song.title}
                </h3>
                <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                  <FaUserAlt className="text-gray-500" />
                  {song.artist}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                  <FaTags className="text-gray-500" />
                  <span className="text-purple-400 font-medium">
                    {song.genre || "Uncategorized"}
                  </span>
                </p>
              </div>

              {/* Player */}
              {song.link && (
                <div className="mb-3">
                  <iframe
                    className="w-full h-40 rounded border border-gray-700"
                    src={getEmbedUrl(song.link)}
                    title={song.title}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => onVote(songs.indexOf(song))}
                  className="flex items-center gap-1 px-3 py-1 bg-purple-700 hover:bg-purple-600 text-white text-xs rounded-full transition"
                >
                  <FaThumbsUp /> {song.votes}
                </button>
                <button
                  onClick={() => onDiscredit(songs.indexOf(song))}
                  className="flex items-center gap-1 px-3 py-1 bg-red-700 hover:bg-red-600 text-white text-xs rounded-full transition"
                >
                  <FaThumbsDown /> {song.downvotes || 0}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SongList;

// Convert song links to embeddable format
function getEmbedUrl(link) {
  if (link.includes("youtube.com/watch?v=")) {
    const videoId = new URL(link).searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (link.includes("soundcloud.com")) {
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(link)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`;
  }
  return link;
}
