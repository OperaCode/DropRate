// src/components/DropUploader.jsx
import React from 'react';
import { FaUpload, FaLink } from 'react-icons/fa';

const DropUploader = ({ onUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const title = file.name;
    onUpload(url, title);
  };

  const handlePasteLink = () => {
    const url = prompt('Paste audio URL (MP3, SoundCloud, etc.):');
    if (url) {
      onUpload(url, 'External Drop');
    }
  };

  return (
    <div className="flex justify-center gap-4">
      {/* Upload from device */}
      <label className="flex items-center bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg cursor-pointer transition">
        <FaUpload className="mr-2" />
        Upload MP3
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Paste link */}
      <button
        onClick={handlePasteLink}
        className="flex items-center bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
      >
        <FaLink className="mr-2" />
        Paste Link
      </button>
    </div>
  );
};

export default DropUploader;
