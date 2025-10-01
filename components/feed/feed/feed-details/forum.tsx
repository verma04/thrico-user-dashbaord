import React from "react";

import { ArrowBigDown, ArrowBigUp } from "lucide-react";

const Forum = ({ forum }) => {
  if (!forum) return null;

  return (
    <div className="p-4   flex flex-col gap-2">
      <h2>{forum.title}</h2>
      <h3>{forum.content}</h3>
      <div className="flex flex-row items-center gap-6 mt-2">
        <button
          type="button"
          className="flex flex-row items-center bg-gray-100 rounded-full py-1.5 px-4 hover:bg-green-50 transition"
        >
          <ArrowBigUp size={22} color="#4caf50" />
          <span className="font-bold text-base ml-2 text-gray-800">
            {forum.upVotes}
          </span>
        </button>
        <button
          type="button"
          className="flex flex-row items-center bg-gray-100 rounded-full py-1.5 px-4 hover:bg-red-50 transition"
        >
          <ArrowBigDown size={22} color="#f44336" />
          <span className="font-bold text-base ml-2 text-gray-800">
            {forum.downVotes}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Forum;
