"use client"; // Important for client-side components in Next.js 13+

import { useEffect, useRef, useState } from "react";

const AudioPlayer = ({ userDetails }) => {


  return (
    <div className="hidden">
      <audio ref={audioRef} onEnded={handleFirstAudioEnd} controls>
        Your browser does not support the audio tag.
      </audio>

      <audio
        ref={secondAudioRef}
        src={secondAudioLink}
        onEnded={() => setIsPlaying(false)}
        controls
        className={isPlayingFirst ? "hidden" : "block"}
      >
        Your browser does not support the audio tag.
      </audio>
    </div>
  );
};

export default AudioPlayer;
