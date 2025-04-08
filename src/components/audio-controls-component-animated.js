import React, { useState } from "react";
import { Pause, Play, X } from "lucide-react";

export default function AudioControls({
  togglePlayPause,
  isPlaying
}) {
  return (
    <div className="fixed bottom-4 right-4 flex items-center space-x-2 bg-gray-800 bg-opacity-75 p-3 rounded-lg shadow-lg">
      <button
        className="text-white hover:text-blue-300 transition-colors"
        aria-label="Speaker"
      >
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Speaker body */}
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />

          {/* Sound waves with animation */}
          <g className={isPlaying ? "animate-pulse" : ""}>
            <path
              d="M15.54 8.46a5 5 0 0 1 0 7.07"
              opacity={isPlaying ? "1" : "0.5"}
            />
            <path
              d="M19.07 4.93a10 10 0 0 1 0 14.14"
              opacity={isPlaying ? "1" : "0.3"}
            />
          </g>
        </svg>
      </button>

      <button
        className="text-white hover:text-blue-300 transition-colors"
        onClick={togglePlayPause}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>

      {/* <button
        className="text-white hover:text-red-300 transition-colors"
        aria-label="Cancel"
      >
        <X size={24} />
      </button> */}
    </div>
  );
}
