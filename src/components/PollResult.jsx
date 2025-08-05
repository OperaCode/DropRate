import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // if using router
import { getPollById } from "../utils/helpers";

const PollResult = ({ pollId: propPollId }) => {
  const params = useParams(); // only if using router
  const pollId = propPollId || params.id;

  const [poll, setPoll] = useState(null);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const data = getPollById(pollId);
    if (data) {
      setPoll(data);
      const total = data.options.reduce((sum, opt) => sum + opt.votes, 0);
      setTotalVotes(total);
    }
  }, [pollId]);

  if (!poll) return <div className="p-4 text-center">Poll not found.</div>;

  const getPercentage = (votes) =>
    totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : 0;

  const maxVotes = Math.max(...poll.options.map((opt) => opt.votes));
  const winner = poll.options.find((opt) => opt.votes === maxVotes);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{poll.title}</h2>
        <p className="text-gray-600">{poll.description}</p>
        <p className="mt-2 text-sm text-gray-500">Total Votes: {totalVotes}</p>
      </div>

      <div className="space-y-4">
        {poll.options.map((opt) => (
          <div key={opt.id}>
            <div className="flex justify-between">
              <span className="font-medium">
                {opt.label}
                {opt.id === winner?.id && maxVotes > 0 && (
                  <span className="ml-2 text-green-600 text-sm">🏆</span>
                )}
              </span>
              <span className="text-sm text-gray-600">
                {opt.votes} votes ({getPercentage(opt.votes)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 h-4 rounded">
              <div
                className="h-4 bg-blue-500 rounded"
                style={{ width: `${getPercentage(opt.votes)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {winner && maxVotes > 0 && (
        <p className="text-center mt-6 text-green-700 font-semibold">
          🥇 <span className="underline">{winner.label}</span> is leading!
        </p>
      )}
    </div>
  );
};

export default PollResult;
