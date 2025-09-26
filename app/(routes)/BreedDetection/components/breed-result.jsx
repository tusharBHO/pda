export default function BreedResult({ image, result }) {
    const { breed, confidence, details } = result;

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 pt-12 font-sans">
            <div className="w-full max-w-3xl rounded-lg bg-white p-8 shadow-lg border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-900 text-center">Prediction Result</h2>

                <div className="mt-6 flex flex-col items-center">
                    <img src={image} alt="Uploaded" className="max-h-72 rounded-md" />
                    <p className="mt-4 text-lg text-gray-800">
                        <span className="font-semibold">Predicted Breed:</span> {breed}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Confidence:</span> {(confidence * 100).toFixed(2)}%
                    </p>
                </div>

                {details ? (
                    <div className="mt-8 text-gray-700">
                        <h3 className="text-2xl font-semibold mb-4">Breed Information</h3>
                        <p><span className="font-semibold">Species:</span> {details.species}</p>
                        <p><span className="font-semibold">Origin:</span> {details.origin}</p>
                        <p><span className="font-semibold">Characteristics:</span> {details.characteristics}</p>
                        <p className="mt-4">{details.description}</p>
                    </div>
                ) : (
                    <p className="mt-6 text-center text-red-500">No additional information found in database.</p>
                )}
            </div>
        </main>
    );
}