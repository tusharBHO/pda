// app/(routes)/BreedDetection/page.jsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { breedsData } from "../../../util/data";
import { analyzeImage } from "../../components/imageAnalysis";
import SampleImageModal from "../../components/SampleImageModal";
import ImageDropzone from "../../components/ImageDropzone";

export default function BreedDetection() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSamples, setShowSamples] = useState(false);

  const steps = ["Uploading image...", "Processing...", "Identifying breed..."];
  const router = useRouter();

  const processFile = (f) => {
    if (!f) return;

    const img = new Image();
    const objectUrl = URL.createObjectURL(f);

    img.onload = () => {
      const { errors, warnings } = analyzeImage(img, f);

      if (errors.length > 0) {
        setError(errors.join(", "));
        setWarning(null);
        URL.revokeObjectURL(objectUrl);
        return;
      }

      setWarning(warnings.length ? warnings : null);
      setError(null);
      setFile(f);
      setPreview(objectUrl);
      setResult(null);
    };

    img.onerror = () => {
      setError("Invalid image file.");
      URL.revokeObjectURL(objectUrl);
    };

    img.src = objectUrl;
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("No file selected");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setCurrentStep(0);

    await new Promise((res) => setTimeout(res, 500));

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1200);

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
        setPreview(null);
        setFile(null);
        setResult(null);
        setError("Image quality is poor. Please upload a clearer image.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setWarning(null);
  };

  useEffect(() => {
    if (result) {
      const isBuffalo = ["Murrah", "Toda", "Jaffrabadi", "Pandharpuri"].includes(result.breed);
      const species = isBuffalo ? "Buffalo" : "Cow";
      router.push(`/breed/${species}/${result.breed}?confidenceScore=${result.confidence}`);
    }
  }, [result, router]);

  return (
    <div className="min-h-screen flex flex-col transition-theme">
      <main className="flex-grow px-4 pb-6 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="text-center pt-5 pb-4">
            <h2 className="text-3xl font-bold">Upload Image</h2>
            <p className="mt-2 opacity-80">
              For best results, ensure the animal is clearly visible and well-lit.
            </p>
          </div>

          <ImageDropzone
            preview={preview}
            onFileSelect={processFile}
            onRemove={handleRemoveImage}
          />

          <button
            onClick={() => setShowSamples(true)}
            className="mt-4 text-sm underline opacity-80 hover:opacity-100"
          >
            View sample images
          </button>

          <SampleImageModal
            isOpen={showSamples}
            onClose={() => setShowSamples(false)}
            onSelect={(imgSrc) => {
              setShowSamples(false);
              fetch(imgSrc)
                .then((res) => res.blob())
                .then((blob) => {
                  const sampleFile = new File([blob], "sample.jpg", { type: blob.type });
                  processFile(sampleFile);
                });
            }}
          />

          {!preview && (
            <p className="text-xs mt-3 text-center opacity-70 italic">
              Only <b>PNG</b> and <b>JPG</b> files are allowed.
            </p>
          )}

          {preview && (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-6 rounded-lg py-3 font-bold transition-theme shadow-theme disabled:opacity-50"
              style={{ backgroundColor: "var(--primary)" }}
            >
              {loading ? (
                <div className="flex flex-col items-center gap-2">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {index < currentStep && <span>✔</span>}
                      {index === currentStep && <span className="animate-spin">🔄</span>}
                      {index > currentStep && <span className="opacity-30">•</span>}
                      <span
                        className={
                          index === currentStep
                            ? "font-semibold"
                            : index < currentStep
                              ? "opacity-80"
                              : "opacity-40"
                        }
                      >
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                "Recognize Breed"
              )}
            </button>
          )}

          {error && (
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-red-400 bg-red-100 px-4 py-3 text-red-700 shadow-sm">
              <span className="text-lg">❌</span>
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {warning && (
            <div className="mt-4 rounded-lg border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700 shadow-sm">
              <ul className="text-sm list-disc ml-4">
                {warning.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}