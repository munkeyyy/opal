import React, { useState } from "react";

const Gallery = ({ isOpen, onClose, selectedImage, files = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(
    selectedImage ? files.findIndex(file => file.url === selectedImage) : 0
  );

  if (!isOpen) return null;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : files.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < files.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999]">
      <div className="h-[90vh] w-[60vw] bg-black rounded-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="w-full bg-black px-4 py-3 flex justify-between items-center border-b border-[rgb(75,75,75)]">
          <h3 className="font-semibold text-white">Gallery</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[rgb(75,75,75)] rounded-full text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
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

        {/* Main content */}
        <div className="flex-1 flex">
          {/* Left arrow */}
          <button
            onClick={handlePrevious}
            className="px-4 text-white hover:bg-[rgb(75,75,75)] transition-colors"
          >
            ❮
          </button>

          {/* Main display area */}
          <div className="flex-1 flex items-center justify-center">
            {files[currentIndex]?.type.startsWith("image/") ? (
              <img
                src={files[currentIndex]?.url}
                alt={files[currentIndex]?.alt || "Gallery image"}
                className="max-h-[calc(90vh-120px)] max-w-[calc(90vw-120px)] object-contain"
              />
            ) : (
              <video
                src={files[currentIndex]?.url}
                controls
                className="max-h-[calc(90vh-120px)] max-w-[calc(90vw-120px)] object-contain"
              />
            )}
          </div>

          {/* Right arrow */}
          <button
            onClick={handleNext}
            className="px-4 text-white hover:bg-[rgb(75,75,75)] transition-colors"
          >
            ❯
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="h-[100px] bg-[rgb(30,30,30)] overflow-x-auto">
          <div className="flex p-2 gap-2">
            {files.map((file, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-[80px] w-[80px] flex-shrink-0 cursor-pointer transition-all ${
                  currentIndex === index
                    ? "border-2 border-blue-500"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                {file.type.startsWith("image/") ? (
                  <img
                    src={file.url}
                    alt={file.alt || "Thumbnail"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <video
                    src={file.url}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="w-full bg-black px-4 py-3 border-t border-[rgb(75,75,75)]">
          <div className="flex justify-between items-center">
            <span className="text-sm text-white">
              {currentIndex + 1} of {files.length}
            </span>
            <div className="space-x-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
