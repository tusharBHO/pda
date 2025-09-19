// app/(routes)/BreedDetection/components/breed-result.jsx
export default function BreedResult({ image, result }) {
    const confidencePercent = result?.confidence
        ? Math.round(result.confidence * 100)
        : null;

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 pt-12 font-sans">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 md:p-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                        Breed Identification Result
                    </h2>
                    <p className="text-gray-500 mb-6">
                        AI-powered analysis of the uploaded image.
                    </p>

                    <div className="mb-6 rounded-lg overflow-hidden border border-gray-200">
                        <div
                            className="w-full bg-center bg-no-repeat bg-cover aspect-video"
                            style={{ backgroundImage: `url(${image})` }}
                        />
                    </div>

                    <p className="text-sm text-gray-500 mb-1">Predicted Breed</p>
                    <h3 className="text-2xl text-black font-bold text-primary-700 mb-2">
                        {result?.breed ?? "Unknown"}
                    </h3>

                    {confidencePercent !== null ? (
                        <div className="flex items-center justify-center gap-2 text-gray-600">
                            <span className="font-semibold">Confidence:</span>
                            <div className="w-32 bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-green-500 h-2.5 rounded-full"
                                    style={{ width: `${confidencePercent}%` }}
                                />
                            </div>
                            <span className="text-green-600 font-bold">
                                {confidencePercent}%
                            </span>
                        </div>
                    ) : (
                        <p className="text-gray-500">Confidence not available</p>
                    )}
                </div>
            </div>
        </main>
    );
}