import React from "react";

const ActivityFeed = ({ songs }) => {
  const recentActivities = songs
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt) 
    .slice(0, 10); // only show recent 10 activities

  if (!recentActivities.length) {
    return <p className="text-gray-500">No recent activity yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {recentActivities.map((song, index) => (
        <li
          key={index}
          className="border-b pb-2 text-sm text-gray-700 dark:text-gray-300"
        >
          🎵 <strong>{song.title}</strong> by <em>{song.artist}</em> was added.
        </li>
      ))}
    </ul>
  );
};

export default ActivityFeed;
