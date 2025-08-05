import React, { useState, useEffect } from "react";
import SongForm from "../components/SongForm";
import SongList from "../components/SongList";
import Leaderboard from "../components/LeaderBoard";
import { FaFilter, FaMusic } from "react-icons/fa";

const Home = () => {
  const [songs, setSongs] = useState(() => {
    const saved = localStorage.getItem("songs");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedGenre, setSelectedGenre] = useState("All");

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

  const genres = ["All", ...new Set(songs.map((s) => s.genre))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-black bg-opacity-80 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
          <FaMusic /> DropRate
        </h1>
        <nav className="space-x-6 text-sm text-gray-300">
          <a href="#" className="hover:text-purple-400">Home</a>
          <a href="#" className="hover:text-purple-400">Leaderboard</a>
          <a href="#" className="hover:text-purple-400">Submit</a>
        </nav>
      </header>

      <main className="px-6 py-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Page Title */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-purple-400">🎵 Drop Your Beat, Vote Your Vibe</h2>
            <p className="text-gray-400 mt-3 text-lg">Submit your favorite tracks and vote for the best!</p>
          </div>

          {/* Top Section */}
          <section className="grid md:grid-cols-2 gap-6">
            {/* Leaderboard */}
            <div className="bg-gray-950 border border-purple-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-purple-300 mb-4">🔥 Top Voted Songs</h3>
              <Leaderboard songs={songs} />
            </div>

            {/* Song Submission Form */}
            <div className="bg-gray-950 border border-gray-700 p-6 rounded-xl shadow-lg">
              {/* <h3 className="text-xl font-semibold text-purple-300 mb-4">🎤 Submit a Song</h3> */}
              <SongForm onAdd={addSong} />
            </div>
          </section>

          {/* Genre Filter */}
          <section className="bg-gray-950 border border-gray-700 p-6 rounded-xl shadow-lg">
            <label className="block text-sm font-semibold text-purple-400 mb-2 flex items-center gap-2">
              <FaFilter /> Filter by Genre
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-black text-white border border-purple-600 rounded px-4 py-2 w-full"
            >
              {genres.map((genre, idx) => (
                <option key={idx} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </section>

          {/* Song List */}
          <div>
            {/* <h3 className="text-2xl font-bold text-purple-300 mb-4">📜 Song List</h3> */}
            <SongList songs={songs} onVote={vote} selectedGenre={selectedGenre} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
