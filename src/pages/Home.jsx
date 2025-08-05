import React, { useState, useEffect } from "react";
import SongForm from "../components/SongForm";
import SongList from "../components/SongList";
import Leaderboard from "../components/LeaderBoard";
import { FaFilter, FaSearch } from "react-icons/fa";

const Home = () => {
  const [songs, setSongs] = useState(() => {
    const saved = localStorage.getItem("songs");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleDownvote = (index) => {
    const updated = [...songs];
    updated[index].downvotes = (updated[index].downvotes || 0) + 1;
    setSongs(updated);
  };

  const genres = ["All", ...new Set(songs.map((s) => s.genre))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white font-sans">
      {/* Header with Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 bg-black bg-opacity-90 border-b border-purple-800 shadow-md z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-400">🎵 DropRate</h1>
          <nav className="flex space-x-6">
            <a
              href="/"
              className="text-white hover:text-purple-400 transition-colors"
            >
              Home
            </a>
            <a
              href="#leaderboard"
              className="text-white hover:text-purple-400 transition-colors"
            >
              Leaderboard
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-4 pb-10">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Leaderboard & Song Form */}
          <section className="flex flex-col md:flex-row justify-between gap-6">
            {/* Leaderboard */}
            <section className="bg-gray-950 border border-purple-800 p-6 rounded-xl shadow-md md:w-1/2">
              <h2
                className="text-2xl font-semibold text-purple-400 mb-4"
                id="leaderboard"
              >
                🏆 Leaderboard
              </h2>
              <Leaderboard songs={songs} />
            </section>

            {/* Song Submission Form */}
            <section className="bg-gray-950 border border-gray-800 p-6 rounded-xl shadow-md md:w-1/2">
              <h2
                className="text-2xl font-semibold text-purple-400 mb-4"
                id="submit"
              >
                🎤 Submit a Song
              </h2>
              <SongForm onAdd={addSong} />
            </section>
          </section>

          {/* Genre Filter & Search */}
          <section className="bg-gray-950 border border-gray-800 p-4 rounded-xl shadow-md space-y-4">
            <div className="md:flex justify-between items-center gap-6 space-y-4 md:space-y-0">
              {/* Genre Filter */}
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-semibold text-purple-400 mb-2 flex items-center gap-2">
                  <FaFilter /> Filter by Genre
                </label>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="bg-black text-white border border-purple-600 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  {genres.map((genre, idx) => (
                    <option key={idx} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search */}
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-semibold text-purple-400 mb-2 flex items-center gap-2">
                  <FaSearch /> Search by Title or Artist
                </label>
                <input
                  type="text"
                  placeholder="Type to search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-black text-white border border-purple-600 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder-gray-400"
                />
              </div>
            </div>
          </section>

          {/* Song List */}
          <section>
            <h2 className="text-2xl font-semibold text-purple-400 mb-4">
              🎧 Songs
            </h2>
            <SongList
              songs={songs}
              onVote={vote}
              onDiscredit={handleDownvote}
              selectedGenre={selectedGenre}
              searchQuery={searchQuery}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
