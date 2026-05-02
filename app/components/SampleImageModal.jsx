"use client";
import { useEffect } from "react";

export default function SampleImageModal({ isOpen, onClose, onSelect }) {
  if (!isOpen) return null;

  const goodSamples = [
    { src: "/samples/good1.jpg", label: "Clear side profile" },
    { src: "/samples/good2.jpg", label: "Good lighting" },
    { src: "/samples/good3.jpg", label: "Full body visible" },
  ];

  const badSamples = [
    { src: "/samples/bad1.jpg", label: "Blurred image" },
    { src: "/samples/bad2.jpg", label: "Too dark" },
    { src: "/samples/bad3.jpg", label: "Animal not visible clearly" },
  ];

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
      
      {/* Modal Box */}
      <div className="w-[95%] max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Sample Images Guide</h2>
          <button onClick={onClose} className="text-xl">✖</button>
        </div>

        {/* GOOD SECTION */}
        <div className="mb-6">
          <h3 className="text-green-600 font-semibold mb-2">
            ✅ Good Examples (Use these types)
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {goodSamples.map((img, i) => (
              <div
                key={i}
                onClick={() => onSelect(img.src)}
                className="cursor-pointer group"
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="rounded-lg h-32 w-full object-cover border-2 border-transparent group-hover:border-green-500 transition"
                />
                <p className="text-xs mt-1 text-center">{img.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BAD SECTION */}
        <div>
          <h3 className="text-red-600 font-semibold mb-2">
            ❌ Avoid These (Low accuracy)
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {badSamples.map((img, i) => (
              <div key={i}>
                <img
                  src={img.src}
                  alt={img.label}
                  className="rounded-lg h-32 w-full object-cover opacity-70 border border-red-400"
                />
                <p className="text-xs mt-1 text-center">{img.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}