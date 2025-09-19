// app/(routes)/breed/[species]/[breed]/page.jsx
"use client";

import { breedsData } from "./components/data";
import { useParams, useRouter } from "next/navigation";

export default function BreedDetailPage() {
    const { species, breed } = useParams();
    const decodedBreed = decodeURIComponent(breed);
    const router = useRouter();

    const breedData = breedsData[species]?.find(b => b.name === decodedBreed);

    if (!breedData) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-6 font-sans">
                <p className="text-center text-gray-700">Breed not found.</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 py-20 px-6 font-sans">
            <button
                className="bg-green-600 text-white px-4 py-2 rounded mb-8 fixed"
                onClick={() => router.back()}
            >
                Back to Database
            </button>

            <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-md">
                <div className="flex items-center space-x-6 mb-6">
                    <img
                        src={breedData.image}
                        alt={breedData.name}
                        className="w-32 h-32 object-cover rounded-full"
                    />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{breedData.name}</h1>
                        <p className="text-gray-600">{species}</p>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">General Information</h2>

                {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700"> */}
                <div className="flex flex-col gap-4 text-gray-700">
                    <div><span className="font-semibold">Species:</span> {species}</div>
                    <div><span className="font-semibold">Breed:</span> {breedData.name}</div>
                    <div><span className="font-semibold">Color:</span> Black and White</div>
                    <div><span className="font-semibold">Distinguishing Marks:</span> Small patch of white fur on forehead</div>
                </div>

                <div className="mt-6 text-gray-700">
                    <p>
                        {breedData.characteristics}. {breedData.description}.
                    </p>
                </div>
            </div>
        </main>
    );
}
