// components/ImageDropzone.jsx
"use client";
import { useState } from "react";
import { Upload } from "lucide-react";

export default function ImageDropzone({ preview, onFileSelect, onRemove }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const f = e.dataTransfer.files?.[0];
    if (f) onFileSelect(f);
  };

  const handleImageUpload = (event) => {
    const f = event.target.files?.[0];
    if (f) onFileSelect(f);
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center shadow-theme transition-all duration-300 ${
        isDragging ? "scale-105 bg-green-50 border-green-500" : ""
      }`}
      style={{
        backgroundColor: "var(--secondary-bg)",
        borderColor: "var(--primary)",
      }}
    >
      {preview ? (
        <div className="inline-block">
          <img
            src={preview}
            alt="Uploaded Preview"
            className="max-h-64 object-contain rounded-xl shadow-theme"
          />
          <div className="absolute top-2 right-2 flex gap-2 z-10">
            <label className="bg-white/90 backdrop-blur px-3 py-1 rounded-md text-xs font-semibold cursor-pointer shadow hover:scale-105 transition">
              Replace
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
            <button
              onClick={onRemove}
              className="bg-red-500 text-white px-3 py-1 rounded-md text-xs font-semibold shadow hover:scale-105 transition"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <>
          <Upload className="w-12 h-12 mb-4" />
          <p className="font-bold">
            {isDragging ? "Drop the image here 🚀" : "Drag and drop image here"}
          </p>
          <p className="text-sm my-1 opacity-80">or</p>
          <label
            className="mt-2 flex items-center justify-center gap-2 rounded-lg px-5 py-2 text-sm font-bold cursor-pointer border border-theme shadow-theme transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: "var(--background)",
              color: "var(--text-color)",
            }}
          >
            Browse Files
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </>
      )}
    </div>
  );
}