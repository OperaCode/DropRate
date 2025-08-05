import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // only if routing
import { getPollById, voteOnPoll } from "../utils/helpers";
import AudioPlayer from "./AudioPlayer";

const PollViewer = ({ pollId: propPollId }) => {
  const params = useParams(); // only works with <Route path="/poll/:id" />
  const pollId = propPollId || params.id;

  const [poll, setPoll] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const foundPoll = getPollById(pollId);
    if (foundPoll) setPoll(foundPoll);
  }, [pollId]);

  const handleVote = () => {
    if (!selectedOption) return alert("Select an option to vote.");
    voteOnPoll(poll.id, selectedOption);
    setHasVoted(true);
  };

  if (!poll) {
    return <div className="p-4 text-center">Poll not found.</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold">{poll.title}</h2>
      <p className="text-gray-600">{poll.description}</p>

      <AudioPlayer src={poll.audioUrl} />

      <div className="mt-4 space-y-2">
        {poll.options.map((opt) => (
          <label
            key={opt.id}
            className={`block p-2 border rounded cursor-pointer ${
              selectedOption === opt.id ? "border-blue-600 bg-blue-50" : ""
            }`}
          >
            <input
              type="radio"
              name="vote"
              value={opt.id}
              checked={selectedOption === opt.id}
              onChange={() => setSelectedOption(opt.id)}
              className="mr-2"
              disabled={hasVoted}
            />
            {opt.label}
          </label>
        ))}
      </div>

      {!hasVoted ? (
        <button
          onClick={handleVote}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Vote
        </button>
      ) : (
        <p className="mt-4 text-green-600">✅ Vote submitted! Refresh to see updated results.</p>
      )}
    </div>
  );
};

export default PollViewer;
