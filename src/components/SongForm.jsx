import React, { useState } from "react";

export default function SongForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !artist) return;
    onAdd({ title, artist, link });
    setTitle("");
    setArtist("");
    setLink("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-6 space-y-4"
    >
      <h2 className="text-xl font-semibold">🎤 Drop a Track</h2>
      <input
        type="text"
        placeholder="Song Title"
        className="w-full p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Artist Name"
        className="w-full p-2 border rounded"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Demo Link (YouTube/SoundCloud)"
        className="w-full p-2 border rounded"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Submit
      </button>
    </form>
  );
}
