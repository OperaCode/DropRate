import React from "react";

export default function SongList({ songs, onVote }) {
  const sorted = [...songs].sort((a, b) => b.votes - a.votes);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">🔥 Top Submissions</h2>
      {sorted.map((song, idx) => (
        <div
          key={idx}
          className="bg-white p-4 rounded shadow space-y-2 border-l-4 border-black"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{song.title}</h3>
              <p className="text-sm text-gray-500">{song.artist}</p>
            </div>
            <button
              className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
              onClick={() => onVote(songs.indexOf(song))}
            >
              👍 {song.votes}
            </button>
          </div>
          {song.link && (
            <iframe
              className="w-full h-28 mt-2"
              src={song.link}
              title={song.title}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          )}
        </div>
      ))}
    </section>
  );
}
