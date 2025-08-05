// utils/helpers.js

export const getPolls = () => {
  const data = localStorage.getItem("polls");
  return data ? JSON.parse(data) : [];
};

export const savePoll = (poll) => {
  const existing = getPolls();
  localStorage.setItem("polls", JSON.stringify([...existing, poll]));
};

export const voteOnPoll = (pollId, optionId) => {
  const polls = getPolls().map(poll => {
    if (poll.id === pollId) {
      poll.options = poll.options.map(opt =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      );
    }
    return poll;
  });
  localStorage.setItem("polls", JSON.stringify(polls));
};

export const getPollById = (id) => {
  return getPolls().find(p => p.id === id);
};
