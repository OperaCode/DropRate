import React from "react";
import { FaMusic, FaUserAlt, FaTags, FaThumbsUp } from "react-icons/fa";

export default function SongList({ songs, onVote, selectedGenre }) {
  const filtered =
    selectedGenre === "All"
      ? songs
      : songs.filter((song) => song.genre === selectedGenre);

  const sorted = [...filtered].sort((a, b) => b.votes - a.votes);

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold text-purple-300 flex items-center gap-2">
        <FaMusic /> Submissions
      </h2>

      {sorted.length === 0 ? (
        <p className="text-gray-400 text-center italic">
          No songs in this genre.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {sorted.map((song, idx) => (
            <div
              key={idx}
              className="bg-gray-950 border border-gray-800 rounded-xl p-5 shadow-md hover:shadow-xl transition-all"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-2">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <FaMusic className="text-purple-400" />
                    {song.title}
                  </h3>
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <FaUserAlt className="text-gray-500" />
                    {song.artist}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-2">
                    <FaTags className="text-gray-500" />
                    Genre:{" "}
                    <span className="text-purple-400 font-medium">
                      {song.genre || "Uncategorized"}
                    </span>
                  </p>
                </div>

                {/* Vote button */}
                <button
                  onClick={() => onVote(songs.indexOf(song))}
                  className="flex items-center gap-2 px-3 py-1 bg-purple-700 hover:bg-purple-600 text-white text-sm rounded-full transition"
                >
                  <FaThumbsUp /> {song.votes}
                </button>
              </div>

              {/* Embed Link */}
              {song.link && (
                <div className="mt-4">
                  <iframe
                    className="w-full h-48 rounded-md border border-gray-700"
                    src={getEmbedUrl(song.link)}
                    title={song.title}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// Convert regular links into embeddable URLs
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
