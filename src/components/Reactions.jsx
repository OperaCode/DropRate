import React from 'react'


const emojiList = ['🔥', '👏', '🤯'];


function getUserReaction(songId) {
  const data = JSON.parse(localStorage.getItem('song-reactions') || '{}');
  return data[songId];
}

function setUserReaction(songId, emoji) {
  const data = JSON.parse(localStorage.getItem('song-reactions') || '{}');
  data[songId] = emoji;
  localStorage.setItem('song-reactions', JSON.stringify(data));
}



const Reactions = () => {
 const userReaction = getUserReaction(song.title);

  const handleReact = (emoji) => {
    if (userReaction) return;

    const updatedReactions = {
      ...song.reactions,
      [emoji]: (song.reactions?.[emoji] || 0) + 1,
    };

    setUserReaction(song.title, emoji);
    onReact(song.title, updatedReactions);
  };

  return (
    <div className="flex gap-2 mt-4">
      {emojiList.map((emoji) => (
        <button
          key={emoji}
          onClick={() => handleReact(emoji)}
          disabled={!!userReaction}
          className={`px-3 py-1 text-sm rounded-full border transition ${
            userReaction === emoji
              ? 'bg-yellow-400 text-black border-yellow-500'
              : 'bg-gray-800 text-white hover:bg-purple-700 border-gray-600'
          }`}
        >
          {emoji} {song.reactions?.[emoji] || 0}
        </button>
      ))}
    </div>
  );
}

export default Reactions
