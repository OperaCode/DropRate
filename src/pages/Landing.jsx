import React, { useState, useEffect } from "react";
import { FaPlay, FaCheckCircle, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";

const Landing = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white"
          : "bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-900"
      }`}
    >
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 bg-opacity-95 border-b shadow-md z-20 ${
          theme === "dark" ? "bg-gray-900 border-purple-800" : "bg-white border-blue-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1
            className={`text-xl sm:text-2xl font-bold ${
              theme === "dark" ? "text-purple-400" : "text-blue-600"
            }`}
          >
            🎵 DropRate
          </h1>
          <button
            className="lg:hidden text-2xl"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <nav
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } lg:flex flex-col lg:flex-row absolute lg:static top-16 left-0 right-0 lg:items-center space-y-4 lg:space-y-0 lg:space-x-6 p-4 lg:p-0 ${
              theme === "dark" ? "bg-gray-900" : "bg-white"
            }`}
            role="navigation"
          >
            <a
              href="#home"
              className={`hover:text-purple-400 transition-colors font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
              aria-label="View home"
            >
              Home
            </a>
            <a
              href="#features"
              className={`hover:text-purple-400 transition-colors font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
              aria-label="View features"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className={`hover:text-purple-400 transition-colors font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
              aria-label="Learn how it works"
            >
              How It Works
            </a>
            <a
              href="/home"
              className={`px-4 py-2 rounded-full font-semibold transition-all hover:scale-105 ${
                theme === "dark"
                  ? "bg-purple-600 hover:bg-purple-500 text-white"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
              aria-label="Join the DropRate beta"
            >
              Join Now
            </a>
            <button
              onClick={toggleTheme}
              className={`hover:text-purple-400 transition-colors ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 sm:pt-24 px-4 sm:px-6 pb-10">
        {/* Hero Section */}
        <section id="home" className="text-center py-12 sm:py-16 md:py-20">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Drop. Rate. Improve.
          </h2>
          <p
            className={`text-base sm:text-lg md:text-xl mb-6 max-w-xl sm:max-w-2xl mx-auto ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Upload your drop, collect real-time feedback, and crowdsource your next big hit.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/home"
              className={`px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 ${
                theme === "dark"
                  ? "bg-purple-600 hover:bg-purple-500 text-white"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              Get Started
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className={`py-12 sm:py-16 ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}
        >
          <h3
            className={`text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <FaPlay />,
                title: "Drop Music Clips",
                desc: "Upload short audio previews to let your listeners decide.",
              },
              {
                icon: <FaCheckCircle />,
                title: "Poll Your Audience",
                desc: "Create polls for verses, beats, or hooks. Let fans vote what slaps.",
              },
              {
                icon: <FaPlay />,
                title: "Instant Ratings",
                desc: "See how people feel in real-time—5-star ratings, emojis, or reactions.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                  theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                }`}
              >
                <div
                  className={`text-3xl sm:text-4xl mx-auto mb-4 ${
                    theme === "dark" ? "text-purple-500" : "text-blue-500"
                  }`}
                >
                  {feature.icon}
                </div>
                <h4
                  className={`text-lg sm:text-xl font-semibold mb-2 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {feature.title}
                </h4>
                <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-12 sm:py-16 md:py-20 text-center">
          <h3
            className={`text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            How It Works
          </h3>
          <div
            className={`max-w-xl sm:max-w-2xl mx-auto grid gap-4 sm:gap-6 text-left p-6 rounded-xl shadow-md ${
              theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
            }`}
          >
            {[
              ["Sign Up", "Create your artist or listener profile."],
              ["Upload Your Drop", "Add a 15–30 second audio file or beat snippet."],
              ["Launch a Poll", "Let users vote: “Which drop hits harder?”, “Hook A or Hook B?”"],
              ["Review Feedback", "Analyze results and refine your track."],
            ].map(([title, desc], i) => (
              <div key={i} className="flex items-start space-x-2">
                <span
                  className={`font-semibold text-base sm:text-lg ${
                    theme === "dark" ? "text-purple-400" : "text-blue-600"
                  }`}
                >
                  {i + 1}.
                </span>
                <div>
                  <span
                    className={`font-semibold text-base sm:text-lg ${
                      theme === "dark" ? "text-purple-400" : "text-blue-600"
                    }`}
                  >
                    {title}
                  </span>{" "}
                  – <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="join"
          className={`py-12 sm:py-16 text-center ${
            theme === "dark" ? "bg-purple-800" : "bg-blue-600"
          }`}
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
            Ready to Test Your Sound?
          </h3>
          <p className="text-base sm:text-lg text-white mb-6 max-w-xl mx-auto">
            Sign up and start getting real feedback from real fans.
          </p>
          <a
            href="/home"
            className={`px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 ${
              theme === "dark"
                ? "bg-black hover:bg-gray-900 text-white"
                : "bg-white hover:bg-gray-100 text-blue-600"
            }`}
          >
            Join Now
          </a>
        </section>

        {/* Footer */}
        <footer
          className={`px-4 sm:px-6 py-6 text-center text-sm border-t ${
            theme === "dark" ? "text-gray-400 border-gray-700" : "text-gray-600 border-gray-200"
          }`}
        >
          © {new Date().getFullYear()} DropRate — Made for creators.
        </footer>
      </main>
    </div>
  );
};

export default Landing;