import React, { useState } from "react";
import { FaMusic, FaUserAlt, FaLink, FaTags } from "react-icons/fa";

const GENRE_OPTIONS = ["Afrobeats", "Hip-Hop", "Amapiano"];

export default function SongForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [link, setLink] = useState("");
  const [genres, setGenres] = useState([]);

  const handleGenreToggle = (genre) => {
    if (genres.includes(genre)) {
      setGenres(genres.filter((g) => g !== genre));
    } else {
      setGenres([...genres, genre]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !artist) return;
    onAdd({ title, artist, link, genre: genres[0] || "Uncategorized" }); // Choose first selected
    setTitle("");
    setArtist("");
    setLink("");
    setGenres([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-purple-300 flex items-center gap-2">
        🎤 Submit a Track
      </h2>

      <div className="space-y-1">
        <label className="text-sm font-semibold flex items-center gap-2 text-gray-300">
          <FaMusic /> Song Title
        </label>
        <input
          type="text"
          placeholder="e.g., Calm Down"
          className="w-full bg-black border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold flex items-center gap-2 text-gray-300">
          <FaUserAlt /> Artist
        </label>
        <input
          type="text"
          placeholder="e.g., Rema"
          className="w-full bg-black border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold flex items-center gap-2 text-gray-300">
          <FaLink /> Demo Link (Optional)
        </label>
        <input
          type="url"
          placeholder="YouTube/SoundCloud Link"
          className="w-full bg-black border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
          <FaTags /> Choose a Genre
        </label>
        <div className="flex flex-wrap gap-3">
          {GENRE_OPTIONS.map((genre) => (
            <button
              type="button"
              key={genre}
              onClick={() => handleGenreToggle(genre)}
              className={`px-4 py-1 rounded-full border text-sm transition-all ${
                genres.includes(genre)
                  ? "bg-purple-600 text-white border-purple-500"
                  : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-purple-700 hover:bg-purple-600 rounded text-white font-bold transition-all"
      >
        ➕ Submit Track
      </button>
    </form>
  );
}
