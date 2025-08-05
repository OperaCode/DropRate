import React from "react";
import { FaPlay, FaCheckCircle } from "react-icons/fa";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-purple-400">DropRate</h1>
        <nav className="space-x-4">
          <a href="#features" className="hover:text-purple-400">Features</a>
          <a href="#how-it-works" className="hover:text-purple-400">How It Works</a>
          <a href="/home" className="bg-purple-600 px-4 py-2 rounded-full text-white hover:bg-purple-500 transition">Join Beta</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center px-6 py-20">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Drop. Rate. Improve.
        </h2>
        <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
          Upload your drop, collect real-time feedback, and crowdsource your next big hit. The fastest way to test your music.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-500 transition">
            Get Started
          </button>
          <button className="border border-purple-500 px-6 py-3 rounded-full font-semibold hover:bg-purple-600 transition">
            Watch Demo
          </button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-16 bg-gray-900">
        <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <FaPlay className="text-4xl mx-auto text-purple-500 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Drop Music Clips</h4>
            <p className="text-gray-400">Upload short audio previews to let your listeners decide.</p>
          </div>
          <div>
            <FaCheckCircle className="text-4xl mx-auto text-purple-500 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Poll Your Audience</h4>
            <p className="text-gray-400">Create polls for verses, beats, or hooks. Let fans vote what slaps.</p>
          </div>
          <div>
            <FaPlay className="text-4xl mx-auto text-purple-500 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Instant Ratings</h4>
            <p className="text-gray-400">See how people feel in real-time—5-star ratings, emojis, or reactions.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="px-6 py-20 text-center">
        <h3 className="text-3xl font-bold mb-10">How It Works</h3>
        <ol className="space-y-6 max-w-2xl mx-auto text-left">
          <li>
            <span className="font-semibold text-purple-400">1. Sign Up</span> – Create your artist or listener profile.
          </li>
          <li>
            <span className="font-semibold text-purple-400">2. Upload Your Drop</span> – Add a 15-30 second audio file or beat snippet.
          </li>
          <li>
            <span className="font-semibold text-purple-400">3. Launch a Poll</span> – Let users vote: “Which drop hits harder?”, “Hook A or Hook B?”
          </li>
          <li>
            <span className="font-semibold text-purple-400">4. Review Feedback</span> – Analyze results and refine your track.
          </li>
        </ol>
      </section>

      {/* Join CTA */}
      <section id="join" className="px-6 py-16 bg-purple-800 text-center">
        <h3 className="text-3xl font-bold mb-4">Ready to Test Your Sound?</h3>
        <p className="text-white mb-6">Sign up and start getting real feedback from real fans.</p>
        <button className="bg-black px-6 py-3 rounded-full font-semibold hover:bg-gray-900 transition">
          Join the Beta
        </button>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 text-center text-gray-400 text-sm border-t border-gray-700">
        © {new Date().getFullYear()} DropRate — Made for creators.
      </footer>
    </div>
  );
};

export default Landing;
