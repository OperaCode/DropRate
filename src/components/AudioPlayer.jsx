// src/components/AudioPlayer.jsx
import React from 'react';

const AudioPlayer = ({ src, title }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <audio
        controls
        src={src}
        className="w-full rounded-lg border border-gray-700 bg-gray-800"
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
