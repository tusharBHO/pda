// Theme-Update
export default function BreedResult({ image, result }) {
  const { breed, confidence, details } = result;

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 transition-theme"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Card */}
      <div
        className="
          w-full max-w-3xl rounded-2xl p-8
          border shadow-theme transition-theme
        "
        style={{
          backgroundColor: "var(--secondary-bg)",
          borderColor: "var(--border-color)",
          color: "var(--text-color)",
        }}
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6">
          Prediction Result
        </h2>

        {/* Image & Basic Info */}
        <div className="flex flex-col items-center">
          <img
            src={image}
            alt="Uploaded"
            className="max-h-72 rounded-xl shadow-theme mb-5"
          />

          <p className="text-lg">
            <span className="font-semibold">Predicted Breed:</span>{" "}
            <span style={{ color: "var(--primary)" }}>{breed}</span>
          </p>

          <p className="mt-1 opacity-80">
            <span className="font-semibold">Confidence:</span>{" "}
            {(confidence * 100).toFixed(2)}%
          </p>
        </div>

        {/* Breed Details */}
        {details ? (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-4">
              Breed Information
            </h3>

            <div className="space-y-2 opacity-90">
              <p>
                <span className="font-semibold">Species:</span>{" "}
                {details.species}
              </p>

              <p>
                <span className="font-semibold">Origin:</span>{" "}
                {details.origin}
              </p>

              <p>
                <span className="font-semibold">Characteristics:</span>{" "}
                {details.characteristics}
              </p>
            </div>

            <p className="mt-4 opacity-85 leading-relaxed">
              {details.description}
            </p>
          </div>
        ) : (
          <p className="mt-8 text-center text-red-500">
            No additional information found in database.
          </p>
        )}
      </div>
    </main>
  );
}