import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FloatingDownButton({ onClick }) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      {isVisible && (
        <button
          onClick={onClick}
          className=" mx-auto p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 border border-gray-200 flex items-center justify-center"
          aria-label="Go back"
        >
          <ChevronDown size={24} className="text-gray-700" />
        </button>
      )}
    </>
  );
}
