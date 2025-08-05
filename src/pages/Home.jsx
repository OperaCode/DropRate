import React, { useState, useEffect } from "react";
import SongForm from "../components/SongForm";
import SongList from "../components/SongList";

const Home = ()=> {
  const [songs, setSongs] = useState(() => {
    const saved = localStorage.getItem("songs");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("songs", JSON.stringify(songs));
  }, [songs]);

  const addSong = (song) => {
    setSongs([...songs, { ...song, votes: 0 }]);
  };

  const vote = (index) => {
    const updated = [...songs];
    updated[index].votes++;
    setSongs(updated);
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">🎵 DropRate</h1>
        <SongForm onAdd={addSong} />
        <SongList songs={songs} onVote={vote} />
      </div>
    </main>
  );
}




export default Home;