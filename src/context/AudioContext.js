import { createContext, useState, useContext, useEffect } from "react";

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [shouldPlayAudio, setShouldPlayAudio] = useState(false);

  // Persist state across page navigations
  useEffect(() => {
    const storedState = localStorage.getItem("shouldPlayAudio");
    if (storedState) {
      setShouldPlayAudio(JSON.parse(storedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("shouldPlayAudio", JSON.stringify(shouldPlayAudio));
  }, [shouldPlayAudio]);

  return (
    <AudioContext.Provider value={{ shouldPlayAudio, setShouldPlayAudio }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
