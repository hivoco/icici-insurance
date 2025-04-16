import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";

export default function FloatingBackButton({ onClick }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
