// app/(routes)/BreedDetection/page.jsx
"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { breedsData } from "../../../util/data";
import { toast } from "sonner";

export default function BreedDetectionPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.replace("/sign-in?redirect_url=/BreedDetection");
    }
  }, [isLoaded, isSignedIn, router]);

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

  if (!isLoaded || !isSignedIn) {
    return null; // or a loader
  }

  const handleImageUpload = (event) => {
    const f = event.target.files?.[0];
    if (!f) return;

    if (!f.type.startsWith("image/")) {
      toast.error("Please upload a valid image file (PNG, JPG, JPEG)");
      return;
    }

    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("No file selected");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/predict", {
        method: "POST",
        body: fd,
        credentials: "include",
      });

      // ❌ no 429 check anymore
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

        toast.success(`Prediction successful: ${data.breed}`);
        setResult({ ...data, details: matchedData });
      } else {
        toast.warning(
          "Image quality is poor. Please upload a clearer image."
        );
        setPreview(null);
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong during prediction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-theme">
      <main className="flex-grow px-4 pb-6 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="text-center pt-5 pb-4">
            <h2 className="text-3xl font-bold">Upload Image</h2>
            <p className="mt-2 opacity-80">
              For best results, request will timeout after 30 seconds if model is slow.
            </p>
          </div>

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

                <label
                  className="
                    mt-2 flex items-center justify-center gap-2
                    rounded-lg px-5 py-2 text-sm font-bold cursor-pointer
                    border border-theme shadow-theme transition-theme
                    hover:scale-105
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

          {preview && (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="
                w-full mt-6 rounded-lg py-3 font-bold text-white
                transition-theme shadow-theme
                disabled:opacity-50
              "
              style={{
                backgroundColor: "var(--primary)",
              }}
            >
              {loading ? "Predicting..." : "Recognize Breed"}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}