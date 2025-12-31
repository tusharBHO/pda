// app/(routes)/BreedDetection/page.jsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { breedsData } from "../../../util/data";

export default function BreedDetection() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  /* =====================
     HANDLE IMAGE UPLOAD
  ====================== */
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

  /* =====================
     HANDLE SUBMIT
  ====================== */
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

      if (data?.quality?.status === "ok") {
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
      } else {
        alert("Image quality is poor. Please upload a clearer image.");
        setPreview(null);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* =====================
     REDIRECT ON RESULT
  ====================== */
  useEffect(() => {
    if (result) {
      const species =
        result.breed === "Murrah" ||
        result.breed === "Toda" ||
        result.breed === "Jaffrabadi" ||
        result.breed === "Pandharpuri"
          ? "Buffalo"
          : "Cow";

      router.push(
        `/breed/${species}/${result.breed}?confidenceScore=${result.confidence}`
      );
    }
  }, [result, router]);

  /* =====================
     UI
  ====================== */
  return (
    <div className="min-h-screen flex flex-col transition-theme">
      <main className="flex-grow px-4 pb-6 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          {/* Heading */}
          <div className="text-center pt-5 pb-4">
            <h2 className="text-3xl font-bold">Upload Image</h2>
            <p className="mt-2 opacity-80">
              For best results, ensure the animal is clearly visible and
              well-lit.
            </p>
          </div>

          {/* Upload Box */}
          <div
            className="
              flex flex-col items-center justify-center
              rounded-xl border-2 border-dashed p-8 text-center
              shadow-theme transition-theme
            "
            style={{
              backgroundColor: "var(--secondary-bg)",
              borderColor: "var(--primary)",
            }}
          >
            {preview ? (
              <img
                src={preview}
                alt="Uploaded Preview"
                className="max-h-64 object-contain rounded-xl shadow-theme"
              />
            ) : (
              <>
                <Upload className="w-12 h-12 mb-4" />
                <p className="font-bold">Drag and drop image here</p>
                <p className="text-sm my-1 opacity-80">or</p>

                {/* Browse Button */}
                <label
                  className="
    mt-2 flex items-center justify-center gap-2
    rounded-lg px-5 py-2 text-sm font-bold cursor-pointer
    border border-theme shadow-theme
    transition-all duration-300 ease-out

    hover:scale-105
    hover:shadow-lg
  "
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

          {!preview && (
            <p className="text-xs mt-3 text-center opacity-70 italic">
              Only <b>PNG</b> and <b>JPG</b> files are allowed.
            </p>
          )}

          {/* Submit Button */}
          {preview && (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="
                w-full mt-6 rounded-lg py-3 font-bold
                transition-theme shadow-theme
                disabled:opacity-50
              "
              style={{
                backgroundColor: "var(--primary)",
              }}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-1 h-6">
                  <span className="loader-bar"></span>
                  <span className="loader-bar"></span>
                  <span className="loader-bar"></span>
                  <span className="loader-bar"></span>
                </div>
              ) : (
                "Recognize Breed"
              )}
            </button>
          )}

          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </div>
      </main>
    </div>
  );
}