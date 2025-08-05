import React, { useState, useEffect } from "react";
import { FaPlay, FaCheckCircle, FaMoon, FaSun } from "react-icons/fa";

const Landing = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
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
        className={`fixed top-0 left-0 right-0 bg-opacity-95 border-b shadow-md z-10 ${
          theme === "dark" ? "bg-gray-900 border-purple-800" : "bg-white border-blue-200"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1
            className={`text-2xl font-bold ${
              theme === "dark" ? "text-purple-400" : "text-blue-600"
            }`}
          >
            🎵 DropRate
          </h1>
          <nav className="flex items-center space-x-6" role="navigation">
            <a
              href="#home"
              className={`hover:text-purple-400 transition-colors font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
              aria-label="View features"
            >
              Home
            </a>
            <a
              href="#features"
              className={`hover:text-purple-400 transition-colors font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
              aria-label="View features"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className={`hover:text-purple-400 transition-colors font-bold ${
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
      <main className="pt-24 px-4 pb-10">
        {/* Hero Section */}
        <section id="home" className="text-center px-6 py-20">
          <h2 className={`text-4xl md:text-6xl font-extrabold mb-4 leading-tight ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Drop. Rate. Improve.
          </h2>
          <p className={`text-lg mb-6 max-w-2xl mx-auto ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            Upload your drop, collect real-time feedback, and crowdsource your next big hit.
          </p>
          <div className="flex justify-center space-x-4">
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
        <section id="features" className={`px-6 py-16 ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
          <h3 className={`text-3xl font-bold text-center mb-12 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
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
                className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 ${
                  theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                }`}
              >
                <div className={`text-4xl mx-auto mb-4 ${
                  theme === "dark" ? "text-purple-500" : "text-blue-500"
                }`}>
                  {feature.icon}
                </div>
                <h4 className={`text-xl font-semibold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
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
        <section id="how-it-works" className="px-6 py-20 text-center">
          <h3 className={`text-3xl font-bold mb-10 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            How It Works
          </h3>
          <div className={`max-w-2xl mx-auto grid gap-6 text-left p-6 rounded-xl shadow-md ${
            theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
          }`}>
            {[
              ["Sign Up", "Create your artist or listener profile."],
              ["Upload Your Drop", "Add a 15–30 second audio file or beat snippet."],
              ["Launch a Poll", "Let users vote: “Which drop hits harder?”, “Hook A or Hook B?”"],
              ["Review Feedback", "Analyze results and refine your track."],
            ].map(([title, desc], i) => (
              <div key={i}>
                <span className={`font-semibold ${
                  theme === "dark" ? "text-purple-400" : "text-blue-600"
                }`}>
                  {i + 1}. {title}
                </span>{" "}
                – {desc}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="join"
          className={`px-6 py-16 text-center ${
            theme === "dark" ? "bg-purple-800" : "bg-blue-600"
          }`}
        >
          <h3 className="text-3xl font-bold mb-4 text-white">Ready to Test Your Sound?</h3>
          <p className="text-white mb-6">
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
          className={`px-6 py-6 text-center text-sm border-t ${
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
