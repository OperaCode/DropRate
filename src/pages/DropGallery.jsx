import React, { useEffect, useState } from "react";
import { getPolls } from "../utils/helpers";
import AudioPlayer from "./AudioPlayer";

const DropGallery = () => {
  const [drops, setDrops] = useState([]);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const polls = getPolls();
    setDrops(polls);

    // Load existing likes
    const storedLikes = JSON.parse(localStorage.getItem("dropLikes")) || {};
    setLikes(storedLikes);
  }, []);

  const handleLike = (pollId) => {
    const updatedLikes = {
      ...likes,
      [pollId]: likes[pollId] ? likes[pollId] + 1 : 1,
    };
    setLikes(updatedLikes);
    localStorage.setItem("dropLikes", JSON.stringify(updatedLikes));
  };

  if (drops.length === 0) {
    return <div className="p-4 text-center">No drops found yet.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">🎧 Drop Gallery</h2>

      {drops.map((drop) => (
        <div
          key={drop.id}
          className="p-4 border rounded shadow-sm bg-white space-y-2"
        >
          <h3 className="text-xl font-semibold">{drop.title}</h3>
          <p className="text-gray-600 text-sm">{drop.description}</p>

          <AudioPlayer src={drop.audioUrl} />

          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={() => handleLike(drop.id)}
              className="text-red-600 hover:text-red-800"
            >
              ❤️ {likes[drop.id] || 0}
            </button>

            <a
              href={`/poll/${drop.id}`}
              className="text-blue-600 hover:underline text-sm"
            >
              Vote on this drop →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DropGallery;
