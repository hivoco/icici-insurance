import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";

export default function FloatingBackButton({ onClick }) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      {isVisible && (
        <button
          onClick={onClick}
          className="fixed top-6 left-6 z-50 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 border border-gray-200 flex items-center justify-center"
          aria-label="Go back"
        >
          <ChevronLeft size={24} className="text-gray-700" />
        </button>
      )}
    </>
  );
}
