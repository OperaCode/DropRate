import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
// import { savePoll } from "../utils/helpers";
import DropUploader from "./DropUploader";

const PollCreator = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [options, setOptions] = useState([{ id: uuidv4(), label: "" }]);
  const [error, setError] = useState("");

  const handleOptionChange = (id, value) => {
    setOptions(prev =>
      prev.map(option => (option.id === id ? { ...option, label: value } : option))
    );
  };

  const addOption = () => {
    setOptions([...options, { id: uuidv4(), label: "" }]);
  };

  const removeOption = (id) => {
    setOptions(options.filter(option => option.id !== id));
  };

  const handleDropUpload = (url) => {
    setAudioUrl(url);
  };

  const handleSubmit = () => {
    if (!title || !audioUrl || options.some(opt => !opt.label.trim())) {
      return setError("Please fill all fields and upload an audio.");
    }

    const newPoll = {
      id: uuidv4(),
      title,
      description,
      audioUrl,
      options: options.map(opt => ({ ...opt, votes: 0 })),
      createdAt: new Date().toISOString(),
    };

    savePoll(newPoll);
    setTitle("");
    setDescription("");
    setAudioUrl("");
    setOptions([{ id: uuidv4(), label: "" }]);
    setError("");
    alert("Poll created!");
  };

  return (
    <div className="max-w-xl mx-auto p-6  shadow rounded-md space-y-4">
      <h2 className="text-2xl font-bold">Create a New Poll</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        placeholder="Poll title"
        className="w-full p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Describe your poll"
        className="w-full p-2 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <DropUploader onUpload={handleDropUpload} />
      {audioUrl && (
        <p className="text-sm text-green-600 break-words">Audio added ✅</p>
      )}

      <div>
        <h3 className="font-semibold">Voting Options</h3>
        {options.map((option, idx) => (
          <div key={option.id} className="flex items-center gap-2 mt-2">
            <input
              type="text"
              placeholder={`Option ${idx + 1}`}
              value={option.label}
              onChange={(e) => handleOptionChange(option.id, e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            {options.length > 1 && (
              <button
                onClick={() => removeOption(option.id)}
                className="text-red-500"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addOption}
          className="mt-2 text-blue-600 hover:underline"
        >
          + Add Option
        </button>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Poll
      </button>
    </div>
  );
};

export default PollCreator;
