// app/(routes)/BreedDetection/page.jsx
// New Version
"use client";
import { useState, useEffect } from "react";
import BreedResult from "./components/breed-result";
import { breedsData } from "../../../util/data";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";

export default function BreedDetection() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();

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
                    (b) => b.name.toLowerCase() === data.breed.toLowerCase()
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

    // COMMENT THE BELOW BLOCK
    // useEffect(() => {
    //     if (result) {
    //         let species;
    //         if (
    //             result.breed === "Murrah" ||
    //             result.breed === "Toda" ||
    //             result.breed === "Jaffrabadi" ||
    //             result.breed === "Pandharpuri"
    //         ) {
    //             species = "Buffalo";
    //         } else {
    //             species = "Cow";
    //         }

    //         router.push(
    //             `/breed/${species}/${result.breed}?confidenceScore=${result.confidence}`
    //         );
    //     }
    // }, [result, router]);

    // ADD THIS ONE, SO IT WILL ALWAYS DIRECT WITH DUMMY DATA
    router.push(
        `/breed/Buffalo/Jaffrabadi?confidenceScore=0.95`
    );

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-stone-700  min-h-screen flex flex-col">
            {/* Header */}
            <header className="flex items-center p-4 shadow-sm">
                <button onClick={() => router.back()} className="text-stone-900 ">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="flex-1 text-center text-lg font-bold">
                    Breed Recognition
                </h1>
                <div className="w-8"></div>
            </header>

            {/* Main */}
            <main className="flex-grow px-4 pb-4 flex items-center justify-center">
                <div className="w-full max-w-2xl">
                    {/* Heading */}
                    <div className="text-center pt-5 pb-3">
                        <h2 className="text-3xl text-gray-800 font-bold">Upload Image</h2>
                        <p className=" mt-2">
                            For best results, ensure the animal is clearly visible and
                            well-lit.
                        </p>
                    </div>

                    {/* Upload Box */}
                    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-600 dark:border-primary/40 bg-[#E4F4DF] p-8 text-center">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Uploaded Preview"
                                className="max-h-64 object-contain rounded-xl"
                            />
                        ) : (
                            <>
                                <Upload className="w-12 h-12 text-primary mb-4 text-green-600" />
                                <p className="font-bold text-gray-800">
                                    Drag and drop image here
                                </p>
                                <p className="text-sm text-gray-800 my-1">or</p>
                                <label className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-stone-900 shadow-sm cursor-pointer">
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
                    {/* ✅ Professional Note about file types (show only when no file is selected) */}
                    {!preview && (
                        <p className="text-xs text-gray-600 mt-3 text-center italic">
                            Only <span className="font-semibold">PNG</span> and{" "}
                            <span className="font-semibold">JPG</span> files are allowed.
                        </p>
                    )}

                    {/* Submit Button */}
                    <div className="mt-6">
                        {preview && (
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full rounded-lg bg-gradient-to-r from-green-600 to-green-700  py-3 text-center font-bold text-white  shadow-lg shadow-primary/30 disabled:opacity-50 cursor-pointer hover:shadow-xl hover:scale-102 transition-all duration-300 ease-in-out flex items-center justify-center gap-2"
                            >
                                {loading ? "Predicting..." : "Recognize Breed"}
                            </button>
                        )}
                    </div>

                    {/* Error Message */}
                    {error && <p className="mt-4 text-center text-red-500">{error}</p>}
                </div>
            </main>
        </div>
    );
}