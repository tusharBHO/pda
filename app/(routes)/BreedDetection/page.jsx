"use client";

import { useState } from "react";
import BreedResult from "./components/breed-result";
// import { breedsData } from "../DataBase/components/data"; // import your static data
import { breedsData } from "../../../util/data";

export default function BreedDetection() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleImageUpload = (event) => {
        const f = event.target.files?.[0];
        if (!f) return;

        if (!f.type.startsWith("image/")) {
            setError("Please upload an image file.");
            return;
        }

        setFile(f);
        setPreview(URL.createObjectURL(f));
        setError(null);
        setResult(null);
    };

    const handleSubmit = async () => {
        if (!file) {
            setError("No file selected");
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const fd = new FormData();
            fd.append("file", file);

            const res = await fetch("/api/predict", {
                method: "POST",
                body: fd,
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Prediction failed");
            }

            const data = await res.json();

            // 🔍 match predicted breed with breedsData
            let matchedData = null;
            for (const species in breedsData) {
                matchedData = breedsData[species].find(
                    b => b.name.toLowerCase() === data.breed.toLowerCase()
                );
                if (matchedData) {
                    matchedData = { ...matchedData, species };
                    break;
                }
            }

            setResult({ ...data, details: matchedData });
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (result) {
        return <BreedResult image={preview} result={result} />;
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 pt-12 font-sans">
            <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg border border-gray-200">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                        Identify Animal Breed
                    </h2>
                    <p className="mt-2 text-base text-gray-600">
                        Upload an image of the animal to identify its breed.
                    </p>
                </div>

                <div className="mt-8">
                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Uploaded Preview"
                                className="max-h-64 object-contain rounded-md"
                            />
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-6xl text-gray-400">
                                    image
                                </span>
                                <p className="mt-4 text-lg font-semibold text-gray-800">
                                    No Image Selected
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    Get started by uploading an image
                                </p>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex mt-8">
                    {!preview ? (
                        <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            <span>Upload Existing Image</span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                        </label>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            {loading ? "Predicting..." : "Submit Image"}
                        </button>
                    )}
                </div>

                {error && <p className="mt-4 text-center text-red-500">{error}</p>}
            </div>
        </main>
    );
}