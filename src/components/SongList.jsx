import React, { useState, useMemo } from "react";
import { FaMusic, FaUserAlt, FaTags, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const SongList = ({ songs, onVote, onDiscredit, selectedGenre, searchQuery, theme }) => {
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [buttonStates, setButtonStates] = useState({}); // Track button loading/disabled states

  const filteredSongs = useMemo(() => {
    const filtered = selectedGenre === "All"
      ? songs
      : songs.filter((song) => song.genre === selectedGenre);
    return filtered.filter((song) =>
      `${song.title} ${song.artist}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [songs, selectedGenre, searchQuery]);

  const sortedSongs = useMemo(() => {
    return [...filteredSongs].sort((a, b) => b.votes - a.votes);
  }, [filteredSongs]);

  const handleToggleExpand = (songId) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(songId)) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      return newSet;
    });
  };

  const handleVote = async (index, songId) => {
    setButtonStates((prev) => ({ ...prev, [`vote-${songId}`]: true }));
    try {
      await onVote(index); // Assume onVote is async if API-backed
    } finally {
      setButtonStates((prev) => ({ ...prev, [`vote-${songId}`]: false }));
    }
  };

  const handleDiscredit = async (index, songId) => {
    setButtonStates((prev) => ({ ...prev, [`discredit-${songId}`]: true }));
    try {
      await onDiscredit(index); // Assume onDiscredit is async if API-backed
    } finally {
      setButtonStates((prev) => ({ ...prev, [`discredit-${songId}`]: false }));
    }
  };

  return (
    <div
      className={`space-y-6 p-4 rounded-xl shadow-md ${
        theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
      role="region"
      aria-label="List of songs"
    >
      {sortedSongs.length === 0 ? (
        <p
          className={`text-center italic ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          No songs match your filters.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sortedSongs.map((song, idx) => {
            const songId = song.id || `${song.title}-${song.artist}-${idx}`;
            const originalIndex = songs.findIndex(
              (s) => s.title === song.title && s.artist === song.artist
            );

            return (
              <div
                key={songId}
                className={`bg-opacity-50 p-4 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] ${
                  theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-200"
                }`}
                role="listitem"
                aria-label={`Song: ${song.title} by ${song.artist}`}
              >
                {/* Header Info */}
                <div className="mb-3">
                  <h3
                    className={`text-lg font-semibold flex items-center gap-2 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    <FaMusic className={theme === "dark" ? "text-purple-400" : "text-blue-600"} />
                    {song.title}
                  </h3>
                  <p
                    className={`text-sm flex items-center gap-2 mt-1 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <FaUserAlt className={theme === "dark" ? "text-gray-500" : "text-gray-600"} />
                    {song.artist}
                  </p>
                  <p
                    className={`text-xs flex items-center gap-2 mt-1 ${
                      theme === "dark" ? "text-gray-500" : "text-gray-600"
                    }`}
                  >
                    <FaTags className={theme === "dark" ? "text-gray-500" : "text-gray-600"} />
                    <span className={theme === "dark" ? "text-purple-400 font-medium" : "text-blue-600 font-medium"}>
                      {song.genre || "Uncategorized"}
                    </span>
                  </p>
                </div>

                {/* Expandable Player */}
                {song.link && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedIds.has(songId) ? "max-h-48 mt-3" : "max-h-0"
                    }`}
                  >
                    {getEmbedUrl(song.link) ? (
                      <iframe
                        className={`w-full h-40 rounded-md border ${
                          theme === "dark" ? "border-gray-700" : "border-gray-200"
                        }`}
                        src={getEmbedUrl(song.link)}
                        title={`${song.title} by ${song.artist}`}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    ) : (
                      <p
                        className={`text-sm ${
                          theme === "dark" ? "text-red-400" : "text-red-500"
                        }`}
                      >
                        Invalid or unsupported link
                      </p>
                    )}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={() => handleVote(originalIndex, songId)}
                    disabled={buttonStates[`vote-${songId}`]}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                      theme === "dark"
                        ? "bg-purple-600 hover:bg-purple-500 text-white disabled:bg-purple-800"
                        : "bg-blue-600 hover:bg-blue-500 text-white disabled:bg-blue-800"
                    }`}
                    aria-label={`Upvote ${song.title}`}
                    data-tooltip="Upvote this song"
                  >
                    <FaThumbsUp /> {song.votes}
                    {buttonStates[`vote-${songId}`] && (
                      <span className="ml-1 animate-pulse">...</span>
                    )}
                  </button>
                  <button
                    onClick={() => handleDiscredit(originalIndex, songId)}
                    disabled={buttonStates[`discredit-${songId}`]}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                      theme === "dark"
                        ? "bg-red-600 hover:bg-red-500 text-white disabled:bg-red-800"
                        : "bg-red-600 hover:bg-red-500 text-white disabled:bg-red-800"
                    }`}
                    aria-label={`Downvote ${song.title}`}
                    data-tooltip="Downvote this song"
                  >
                    <FaThumbsDown /> {song.downvotes || 0}
                    {buttonStates[`discredit-${songId}`] && (
                      <span className="ml-1 animate-pulse">...</span>
                    )}
                  </button>
                </div>

                {/* Expand/Collapse Button */}
                {song.link && (
                  <button
                    onClick={() => handleToggleExpand(songId)}
                    className={`text-xs mt-2 ${
                      theme === "dark"
                        ? "text-purple-400 hover:text-purple-300"
                        : "text-blue-600 hover:text-blue-500"
                    }`}
                    aria-expanded={expandedIds.has(songId) ? "true" : "false"}
                    aria-label={expandedIds.has(songId) ? `Collapse ${song.title} player` : `Expand ${song.title} player`}
                  >
                    {expandedIds.has(songId) ? "Hide Player" : "Show Player"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SongList;

// Convert song links to embeddable format
function getEmbedUrl(link) {
  try {
    if (!link) return "";
    const url = new URL(link);
    if (url.hostname.includes("youtube.com") || url.hostname.includes("youtu.be")) {
      const videoId = url.searchParams.get("v") || url.pathname.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
    }
    if (url.hostname.includes("soundcloud.com")) {
      return `https://w.soundcloud.com/player/?url=${encodeURIComponent(link)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`;
    }
    return "";
  } catch (error) {
    console.warn("Invalid URL:", link);
    return "";
  }
}