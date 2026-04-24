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
  const [warning, setWarning] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Uploading image...",
    "Processing...",
    "Identifying breed...",
  ];

  const router = useRouter();

  //  HANDLE IMAGE UPLOAD
  const handleImageUpload = (event) => {
    const f = event.target.files?.[0];
    if (!f) return;

    const MAX_SIZE = 5 * 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowedTypes.includes(f.type)) {
      setError("Only JPG and PNG files are allowed.");
      return;
    }

    if (f.size > MAX_SIZE) {
      setError("File size must be less than 5MB.");
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(f);

    img.onload = () => {
      if (img.naturalWidth < 200 || img.naturalHeight < 200) {
        setWarning("Low resolution image. Results may be inaccurate.");
      } else {
        setWarning(null);
      }

      setFile(f);
      setPreview(objectUrl);
      setResult(null);
      setError(null); // ✅ either null or warning
    };

    img.onerror = () => {
      setError("Invalid image file.");
      URL.revokeObjectURL(objectUrl);
    };

    img.src = objectUrl;
  };


  //  HANDLE SUBMIT
  const handleSubmit = async () => {
    if (!file) {
      setError("No file selected");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);


    setCurrentStep(0);
    // small artificial delay (improves perceived UX)
    await new Promise((res) => setTimeout(res, 500));

    // Step progression simulation
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
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
        setError("Image quality is poor. Please upload a clearer image.");
        setPreview(null);
        setFile(null);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  //  REDIRECT ON RESULT
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

  //  UI
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
                <div className="flex flex-col items-center gap-2">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      {index < currentStep && <span>✔</span>}
                      {index === currentStep && (
                        <span className="animate-spin">🔄</span>
                      )}
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
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700 shadow-sm">
              <span>⚠️</span>
              <p className="text-sm font-medium">{warning}</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}