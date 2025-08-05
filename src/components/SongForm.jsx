import React, { useState } from "react";
import { FaMusic, FaUserAlt, FaLink, FaTags } from "react-icons/fa";

const GENRE_OPTIONS = ["Afrobeats", "Hip-Hop", "Amapiano", "Jazz", "R&B"];

export default function SongForm({ onAdd, theme }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [link, setLink] = useState("");
  const [genre, setGenre] = useState("");
  const [errors, setErrors] = useState({ title: false, artist: false });

  const handleGenreToggle = (selectedGenre) => {
    setGenre(genre === selectedGenre ? "" : selectedGenre);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !artist) {
      setErrors({
        title: !title,
        artist: !artist,
      });
      return;
    }
    onAdd({ title, artist, link, genre: genre || "Uncategorized" });
    setTitle("");
    setArtist("");
    setLink("");
    setGenre("");
    setErrors({ title: false, artist: false });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-4"
      aria-label="Submit a new song"
    >
      <div className="space-y-2">
        <label
          className={`flex items-center gap-2 text-sm font-semibold ${
            theme === "dark" ? "text-purple-400" : "text-blue-600"
          }`}
          htmlFor="song-title"
        >
          <FaMusic /> Song Title
        </label>
        <input
          id="song-title"
          type="text"
          placeholder="e.g., Calm Down"
          className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all ${
            theme === "dark"
              ? "bg-gray-800 border-purple-600 text-white placeholder-gray-400"
              : "bg-white border-blue-300 text-gray-900 placeholder-gray-500"
          } ${errors.title ? "border-red-500" : ""}`}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErrors((prev) => ({ ...prev, title: false }));
          }}
          required
          aria-required="true"
          aria-invalid={errors.title ? "true" : "false"}
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">Song title is required</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          className={`flex items-center gap-2 text-sm font-semibold ${
            theme === "dark" ? "text-purple-400" : "text-blue-600"
          }`}
          htmlFor="artist"
        >
          <FaUserAlt /> Artist
        </label>
        <input
          id="artist"
          type="text"
          placeholder="e.g., Rema"
          className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all ${
            theme === "dark"
              ? "bg-gray-800 border-purple-600 text-white placeholder-gray-400"
              : "bg-white border-blue-300 text-gray-900 placeholder-gray-500"
          } ${errors.artist ? "border-red-500" : ""}`}
          value={artist}
          onChange={(e) => {
            setArtist(e.target.value);
            setErrors((prev) => ({ ...prev, artist: false }));
          }}
          required
          aria-required="true"
          aria-invalid={errors.artist ? "true" : "false"}
        />
        {errors.artist && (
          <p className="text-red-500 text-xs mt-1">Artist name is required</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          className={`flex items-center gap-2 text-sm font-semibold ${
            theme === "dark" ? "text-purple-400" : "text-blue-600"
          }`}
          htmlFor="demo-link"
        >
          <FaLink /> Demo Link (Optional)
        </label>
        <input
          id="demo-link"
          type="url"
          placeholder="YouTube/SoundCloud Link"
          className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all ${
            theme === "dark"
              ? "bg-gray-800 border-purple-600 text-white placeholder-gray-400"
              : "bg-white border-blue-300 text-gray-900 placeholder-gray-500"
          }`}
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label
          className={`block text-sm font-semibold ${
            theme === "dark" ? "text-purple-400" : "text-blue-600"
          } flex items-center gap-2`}
        >
          <FaTags /> Choose a Genre
        </label>
        <div className="flex flex-wrap gap-3">
          {GENRE_OPTIONS.map((g) => (
            <button
              type="button"
              key={g}
              onClick={() => handleGenreToggle(g)}
              className={`px-4 py-1 rounded-full border text-sm transition-all duration-200 ${
                genre === g
                  ? theme === "dark"
                    ? "bg-purple-600 text-white border-purple-500"
                    : "bg-blue-500 text-white border-blue-400"
                  : theme === "dark"
                  ? "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
              }`}
              aria-pressed={genre === g ? "true" : "false"}
              aria-label={`Select ${g} genre`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className={`w-full py-3 px-4 rounded font-bold transition-all duration-200 hover:scale-105 ${
          theme === "dark"
            ? "bg-purple-700 hover:bg-purple-600 text-white"
            : "bg-blue-600 hover:bg-blue-500 text-white"
        }`}
        aria-label="Submit song"
      >
        ➕ Submit Track
      </button>
    </form>
  );
}