"use client";
import { useState } from "react";

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    function handleFile(e) {
        setError(null);
        const f = e.target.files?.[0];
        if (!f) return;
        if (!f.type.startsWith("image/")) {
            setError("Please upload an image file.");
            return;
        }
        setFile(f);
        setPreview(URL.createObjectURL(f));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!file) {
            setError("No file selected");
            return;
        }

        setLoading(true);
        setResult(null);
        setError(null);

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
            setResult(data);
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Cow Breed Predictor</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="file" accept="image/*" onChange={handleFile} />

                {preview && (
                    <div>
                        <img
                            src={preview}
                            alt="preview"
                            className="w-64 h-64 object-cover rounded-md shadow"
                        />
                    </div>
                )}

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                    >
                        {loading ? "Predicting..." : "Predict Breed"}
                    </button>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                {result && (
                    <div className="mt-4 p-4 border rounded bg-white shadow-sm">
                        <p>
                            <strong>Breed:</strong> {result.breed ?? "Unknown"}
                        </p>
                        <p>
                            <strong>Confidence:</strong>{" "}
                            {result.confidence != null ? result.confidence : "N/A"}
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
}
