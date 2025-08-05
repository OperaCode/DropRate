import React, { useState, useEffect, useMemo } from "react";
import SongForm from "../components/SongForm";
import SongList from "../components/SongList";
import Leaderboard from "../components/LeaderBoard";
import { FaFilter, FaSearch, FaBars, FaTimes, FaHome, FaTrophy, FaMoon, FaSun } from "react-icons/fa";

const Home = () => {
  const [songs, setSongs] = useState(() => {
    const saved = localStorage.getItem("songs");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("songs", JSON.stringify(songs));
  }, [songs]);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

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

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const genres = ["All", ...new Set(songs.map((s) => s.genre))];

  const filteredSongs = useMemo(() => {
    return songs.filter(
      (song) =>
        (selectedGenre === "All" || song.genre === selectedGenre) &&
        (song.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [songs, selectedGenre, searchQuery]);

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white"
          : "bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-900"
      } flex`}
    >
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-opacity-95 border-r shadow-lg transition-all duration-300 ease-in-out z-20 ${
          isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full"
        } md:w-16 md:hover:w-64 md:translate-x-0 group ${
          theme === "dark" ? "bg-gray-900 border-purple-800" : "bg-white border-blue-200"
        }`}
        aria-expanded={isSidebarOpen ? "true" : "false"}
        role="complementary"
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-8">
            <h1
              className={`text-2xl font-bold ${
                theme === "dark" ? "text-purple-400" : "text-blue-600"
              } hidden md:group-hover:block`}
            >
              🎵 DropRate
            </h1>
            <button
              className="md:hidden hover:text-purple-400"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <FaTimes size={24} />
            </button>
          </div>
          <nav className="space-y-4" role="navigation">
            
            <a
              href="/home"
              className="flex items-center gap-3 hover:text-purple-400 transition-colors"
              aria-label="View leaderboard"
            >
              <FaTrophy size={24} />
              <span className="hidden md:group-hover:block">DashBoard</span>
            </a>
            <a
              href="/"
              className="flex items-center gap-3 hover:text-purple-400 transition-colors"
              aria-label="Go to homepage"
            >
              <FaHome size={24} />
              <span className="hidden md:group-hover:block">Exit App</span>
            </a>
          </nav>
          <div className="mt-6">
            <label
              className={`flex items-center gap-2 text-sm font-semibold ${
                theme === "dark" ? "text-purple-400" : "text-blue-600"
              } hidden md:group-hover:block`}
              aria-label="Filter by genre"
            >
              <FaFilter /> Filter by Genre
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className={`mt-2 border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 hidden md:group-hover:block ${
                theme === "dark" ? "bg-gray-800 border-purple-600 text-white" : "bg-white border-blue-300 text-gray-900"
              }`}
              aria-label="Select genre"
            >
              {genres.map((genre, idx) => (
                <option key={idx} value={genre} className={theme === "dark" ? "bg-gray-800" : "bg-white"}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label
              className={`flex items-center gap-2 text-sm font-semibold ${
                theme === "dark" ? "text-purple-400" : "text-blue-600"
              } hidden md:group-hover:block`}
              aria-label="Search songs"
            >
              <FaSearch /> Search Songs
            </label>
            <input
              type="text"
              placeholder="Type to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`mt-2 border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 hidden md:group-hover:block ${
                theme === "dark" ? "bg-gray-800 border-purple-600 text-white placeholder-gray-400" : "bg-white border-blue-300 text-gray-900 placeholder-gray-500"
              }`}
              aria-label="Search by title or artist"
            />
          </div>
          <button
            onClick={toggleTheme}
            className={`mt-6 flex items-center gap-2 hover:text-purple-400 transition-colors hidden md:group-hover:flex`}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-16 px-4 pb-10 md:ml-16 md:group-hover:ml-64 transition-all duration-300">
        <button
          className="md:hidden fixed top-4 left-4 hover:text-purple-400 z-10"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <FaBars size={24} />
        </button>
        <div className="max-w-5xl mx-auto space-y-8">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Leaderboard Card */}
            <section
              className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 ${
                theme === "dark" ? "bg-gray-800 border-purple-700" : "bg-white border-blue-200"
              }`}
            >
              <h2
                className={`text-2xl font-semibold ${
                  theme === "dark" ? "text-purple-400" : "text-blue-600"
                } mb-4`}
                id="leaderboard"
              >
                🏆 Leaderboard
              </h2>
              <Leaderboard songs={filteredSongs} theme={theme} />
            </section>

            {/* Song Submission Card */}
            <section
              className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 ${
                theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              }`}
            >
              <h2
                className={`text-2xl font-semibold ${
                  theme === "dark" ? "text-purple-400" : "text-blue-600"
                } mb-4`}
                id="submit"
              >
                🎤 Submit a Song
              </h2>
              <SongForm onAdd={addSong} theme={theme} />
            </section>
          </section>

          {/* Mobile Search and Filter (visible only on mobile) */}
          <section
            className={`p-4 rounded-xl shadow-md md:hidden ${
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <div className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-semibold ${
                    theme === "dark" ? "text-purple-400" : "text-blue-600"
                  } mb-2 flex items-center gap-2`}
                >
                  <FaFilter /> Filter by Genre
                </label>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className={`border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                    theme === "dark" ? "bg-gray-800 border-purple-600 text-white" : "bg-white border-blue-300 text-gray-900"
                  }`}
                  aria-label="Select genre"
                >
                  {genres.map((genre, idx) => (
                    <option key={idx} value={genre} className={theme === "dark" ? "bg-gray-800" : "bg-white"}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className={`block text-sm font-semibold ${
                    theme === "dark" ? "text-purple-400" : "text-blue-600"
                  } mb-2 flex items-center gap-2`}
                >
                  <FaSearch /> Search by Title or Artist
                </label>
                <input
                  type="text"
                  placeholder="Type to search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                    theme === "dark" ? "bg-gray-800 border-purple-600 text-white placeholder-gray-400" : "bg-white border-blue-300 text-gray-900 placeholder-gray-500"
                  }`}
                  aria-label="Search by title or artist"
                />
              </div>
            </div>
          </section>

          {/* Song List Card */}
          <section
            className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 ${
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <h2
              className={`text-2xl font-semibold ${
                theme === "dark" ? "text-purple-400" : "text-blue-600"
              } mb-4`}
            >
              🎧 Songs
            </h2>
            <SongList
              songs={filteredSongs}
              onVote={vote}
              onDiscredit={handleDownvote}
              selectedGenre={selectedGenre}
              searchQuery={searchQuery}
              theme={theme}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;