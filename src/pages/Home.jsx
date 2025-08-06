import React, { useState, useEffect, useMemo } from "react";
import SongForm from "../components/SongForm";
import SongList from "../components/SongList";
import Leaderboard from "../components/LeaderBoard";
import {
  FaFilter,
  FaSearch,
  FaBars,
  FaTimes,
  FaHome,
  FaTrophy,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import ActivityFeed from "./ActivityFeed";

const Home = () => {
  const [songs, setSongs] = useState(() => {
    const saved = localStorage.getItem("songs");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("songs", JSON.stringify(songs));
  }, [songs]);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const addSong = (song) => {
    setSongs([
      ...songs,
      {
        ...song,
        votes: 0,
        createdAt: Date.now(),
      },
    ]);
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
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white"
          : "bg-gradient-to-br from-blue-100 via-purple-50 to-white text-gray-900"
      } flex flex-col lg:flex-row`}
    >
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-opacity-95 border-r shadow-lg transition-all duration-300 ease-in-out z-30 ${
          isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full"
        } lg:w-16 lg:hover:w-64 lg:translate-x-0 group ${
          theme === "dark"
            ? "bg-gray-900 border-purple-700"
            : "bg-white border-blue-200"
        }`}
        
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h1
              className={`text-xl sm:text-2xl font-bold ${
                theme === "dark" ? "text-purple-300" : "text-blue-600"
              } hidden lg:group-hover:block`}
            >
              🎵 DropRate
            </h1>
            <button
              className="lg:hidden hover:text-purple-400"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <FaTimes size={20} />
            </button>
          </div>
          <nav className="space-y-4" role="navigation">
            <a
              href="/home"
              className="flex items-center gap-3 hover:text-purple-400 transition-colors"
              aria-label="View dashboard"
            >
              <FaTrophy size={20} />
              <span className="hidden lg:group-hover:block text-sm sm:text-base">
                Dashboard
              </span>
            </a>
            <a
              href="/#feeds"
              className="flex items-center gap-3 hover:text-purple-400 transition-colors"
              aria-label="View recent feeds"
            >
              <FaTrophy size={20} />
              <span className="hidden lg:group-hover:block text-sm sm:text-base">
                Recent Feeds
              </span>
            </a>
            <a
              href="/"
              className="flex items-center gap-3 hover:text-purple-400 transition-colors"
              aria-label="Exit app"
            >
              <FaHome size={20} />
              <span className="hidden lg:group-hover:block text-sm sm:text-base">
                Exit App
              </span>
            </a>
          </nav>
          <div className="mt-4 sm:mt-6">
            <label
              className={`flex items-center gap-2 text-xs sm:text-sm font-semibold ${
                theme === "dark" ? "text-purple-300" : "text-blue-600"
              } hidden lg:group-hover:block`}
              aria-label="Filter by genre"
            >
              <FaFilter size={16} /> Filter by Genre
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className={`mt-2 border rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 hidden lg:group-hover:block ${
                theme === "dark"
                  ? "bg-gray-800 border-purple-600 text-white"
                  : "bg-white border-blue-300 text-gray-900"
              }`}
              aria-label="Select genre"
            >
              {genres.map((genre, idx) => (
                <option
                  key={idx}
                  value={genre}
                  className={theme === "dark" ? "bg-gray-800" : "bg-white"}
                >
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-3 sm:mt-4">
            <label
              className={`flex items-center gap-2 text-xs sm:text-sm font-semibold ${
                theme === "dark" ? "text-purple-300" : "text-blue-600"
              } hidden lg:group-hover:block`}
              aria-label="Search songs"
            >
              <FaSearch size={16} /> Search Songs
            </label>
            <input
              type="text"
              placeholder="Type to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`mt-2 border rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 hidden lg:group-hover:block ${
                theme === "dark"
                  ? "bg-gray-800 border-purple-600 text-white placeholder-gray-400"
                  : "bg-white border-blue-300 text-gray-900 placeholder-gray-500"
              }`}
              aria-label="Search by title or artist"
            />
          </div>
          <button
            onClick={toggleTheme}
            className={`mt-4 sm:mt-6 flex items-center gap-2 hover:text-purple-400 transition-colors text-sm sm:text-base hidden lg:group-hover:flex`}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <FaSun size={16} /> : <FaMoon size={16} />}
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-16 px-4 sm:px-6 pb-8 sm:pb-10 lg:ml-16 lg:group-hover:ml-64 transition-all duration-300">
        <button
          className="lg:hidden fixed top-4 left-4 hover:text-purple-400 z-40"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <FaBars size={20} />
        </button>
        <header
          className={`relative bg-gradient-to-r ${
            theme === "dark"
              ? "from-purple-900 to-blue-900"
              : "from-purple-600 to-blue-600"
          } text-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 rounded-b-2xl`}
        >
          <div className="max-w-6xl mx-auto text-center">
            <h1
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 animate-fade-in ${
                theme === "dark" ? "text-white" : "text-white"
              }`}
            >
              🎵 DropRate: Amplify Your Music
            </h1>
            <p
              className={`text-sm sm:text-base md:text-lg opacity-90 mb-4 sm:mb-6 max-w-xl sm:max-w-2xl mx-auto ${
                theme === "dark" ? "text-gray-200" : "text-gray-100"
              }`}
            >
              Discover, share, and vote for the hottest tracks in our community!
            </p>
            
          </div>
        </header>
        <div className="max-w-6xl mx-auto mt-6 sm:mt-8 grid gap-4 sm:gap-6 lg:grid-cols-3">
          {/* LEFT COLUMN: Song Form & Song List */}
          <div className="space-y-4 sm:space-y-6 lg:col-span-2">
            {/* Song Submission */}
            <section
              className={`p-4 sm:p-6 rounded-xl shadow-md transform transition-all duration-300 hover:scale-[1.01] ${
                theme === "dark"
                  ? "bg-gray-800 border-purple-700"
                  : "bg-white border-blue-200"
              }`}
            >
              <h2
                className={`text-xl sm:text-2xl font-semibold mb-4 ${
                  theme === "dark" ? "text-purple-300" : "text-blue-600"
                }`}
                id="submit"
              >
                🎤 Submit a Song
              </h2>
              <SongForm onAdd={addSong} theme={theme} />
            </section>

            {/* Mobile Filters */}
            <section
              className={`p-4 sm:p-5 rounded-xl shadow-md lg:hidden transform transition-all duration-300 hover:scale-[1.01] ${
                theme === "dark"
                  ? "bg-gray-800 border-purple-700"
                  : "bg-white border-blue-200"
              }`}
            >
              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-xs sm:text-sm font-semibold mb-2 flex items-center gap-2 ${
                      theme === "dark" ? "text-purple-300" : "text-blue-600"
                    }`}
                  >
                    <FaFilter size={14} /> Filter by Genre
                  </label>
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className={`border rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      theme === "dark"
                        ? "bg-gray-800 border-purple-600 text-white"
                        : "bg-white border-blue-300 text-gray-900"
                    }`}
                    aria-label="Select genre"
                  >
                    {genres.map((genre, idx) => (
                      <option
                        key={idx}
                        value={genre}
                        className={
                          theme === "dark" ? "bg-gray-800" : "bg-white"
                        }
                      >
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className={`block text-xs sm:text-sm font-semibold mb-2 flex items-center gap-2 ${
                      theme === "dark" ? "text-purple-300" : "text-blue-600"
                    }`}
                  >
                    <FaSearch size={14} /> Search by Title or Artist
                  </label>
                  <input
                    type="text"
                    placeholder="Type to search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`border rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      theme === "dark"
                        ? "bg-gray-800 border-purple-600 text-white placeholder-gray-400"
                        : "bg-white border-blue-300 text-gray-900 placeholder-gray-500"
                    }`}
                    aria-label="Search by title or artist"
                  />
                </div>
              </div>
            </section>

            {/* Song List */}
            <section
              className={`p-4 sm:p-6 rounded-xl shadow-md transform transition-all duration-300 hover:scale-[1.01] ${
                theme === "dark"
                  ? "bg-gray-800 border-purple-700"
                  : "bg-white border-blue-200"
              }`}
            >
              <h2
                className={`text-xl sm:text-2xl font-semibold mb-4 ${
                  theme === "dark" ? "text-purple-300" : "text-blue-600"
                }`}
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

          {/* RIGHT COLUMN: Leaderboard & Activity Feed */}
          <div className="space-y-4 sm:space-y-6 lg:sticky lg:top-4 lg:self-start">
            {/* Leaderboard */}
            <section
              className={`p-4 sm:p-6 rounded-xl shadow-md transform transition-all duration-300 hover:scale-[1.01] ${
                theme === "dark"
                  ? "bg-gray-800 border-purple-700"
                  : "bg-white border-blue-200"
              }`}
            >
              <h2
                className={`text-xl sm:text-2xl font-semibold mb-4 ${
                  theme === "dark" ? "text-purple-300" : "text-blue-600"
                }`}
                id="leaderboard"
              >
                🏆 Leaderboard
              </h2>
              <Leaderboard songs={filteredSongs} theme={theme} />
            </section>

            {/* Activity Feed */}
            <section
              className={`p-4 sm:p-6 rounded-xl shadow-md transform transition-all duration-300 hover:scale-[1.01] ${
                theme === "dark"
                  ? "bg-gray-800 border-purple-700"
                  : "bg-white border-blue-200"
              }`}
            >
              <h2
                className={`text-xl sm:text-2xl font-semibold mb-4 ${
                  theme === "dark" ? "text-purple-300" : "text-blue-600"
                }`}
              >
                📢 Recent Activity
              </h2>
              <ActivityFeed songs={songs} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
