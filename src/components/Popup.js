// components/Popup.jsx
import React, { useEffect, useRef } from "react";

export default function Popup({ isOpen, onClose, title, children }) {
  const popupRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }

    // Add event listener when popup is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close popup with ESC key
  useEffect(() => {
    function handleEscKey(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    // Add event listener when popup is open
    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90  bg-opacity-50">
      <div
        ref={popupRef}
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden transform transition-all"
      >
        <div className="px-6 py-4  border-b flex justify-end items-center">
          {/* <h3 className="text-lg font-medium text-gray-900">{title}</h3> */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="px-6">{children}</div>
       
      </div>
    </div>
  );
}
