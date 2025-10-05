// New Version
// // app/(routes)/breed\[species]\[breed]/page.jsx
"use client";
import React from "react";
import { breedsData } from "../../../../../util/data";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
    MdPlace,
    MdShoppingBag,
    MdFavoriteBorder,
    MdLocalDrink,
    MdRestaurant,
} from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function Cow_Profile_Page() {
    const { species, breed } = useParams();
    const decodedBreed = decodeURIComponent(breed);
    const router = useRouter();
    const searchParams = useSearchParams();
    const confidenceScore = searchParams.get("confidenceScore");

    const breedData = breedsData[species]?.find((b) => b.name === decodedBreed);

    if (!breedData) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 px-6 font-sans flex items-center justify-center">
                <p className="text-center text-gray-700 text-lg font-medium">
                    Breed not found.
                </p>
            </div>
        );
    }

    return (
        <div className="pt-19  font-sans antialiased">
            <button
                className="bg-green-600 text-xs text-white px-2 py-1 rounded mb-8 fixed top-18 left-2"
                onClick={() => router.back()}
            >
                Back
            </button>

            <div className="container mx-auto px-3 lg:px-4">
                {/* Top Section: Image + Info */}
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-stretch">
                    {/* Image */}
                    <div className="md:w-1/2 w-full">
                        <img
                            src={breedData?.image}
                            alt={breedData?.name}
                            className="rounded-2xl shadow-lg w-full h-auto object-cover max-h-[450px] hover:scale-[1.02] transition-transform duration-300"
                        />
                    </div>

                    {/* Info Card */}
                    <div className="md:w-1/2 w-full bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-8">
                        {/* Name & Confidence */}
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pb-4 border-b-4 border-green-500">
                            <h1 className="text-3xl font-bold mb-2 md:mb-0">
                                {breedData?.name}
                            </h1>
                            {confidenceScore && (
                                <p className="text-lg font-medium text-gray-700">
                                    Confidence:{" "}
                                    <span className="font-semibold text-green-600">
                                        {confidenceScore}
                                    </span>
                                </p>
                            )}
                        </div>

                        {/* Info Sections */}
                        <div className="flex flex-col sm:flex-row sm:gap-8">
                            {/* Left Column */}

                            <div className="flex-1 space-y-6 mt-6 sm:mt-0">
                                <div>
                                    <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
                                        <MdPlace className="text-2xl text-green-500" /> Origin in
                                        India
                                    </h2>

                                    <p className="text-gray-700">{breedData?.originInIndia}</p>
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
                                        <MdShoppingBag className="text-2xl text-blue-500" /> Current
                                        Usage
                                    </h2>
                                    <p className="text-gray-700">{breedData?.Use}</p>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="flex-1 space-y-6 mt-6 sm:mt-0">
                                <div>
                                    <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
                                        <MdShoppingBag className="text-2xl text-purple-500" />{" "}
                                        Average Weight
                                    </h2>
                                    <p className="text-gray-700">
                                        Male:{" "}
                                        <span className="font-medium">
                                            {breedData?.weight?.male}
                                        </span>
                                    </p>
                                    <p className="text-gray-700">
                                        Female:{" "}
                                        <span className="font-medium">
                                            {breedData?.weight?.female}
                                        </span>
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
                                        <MdFavoriteBorder className="text-2xl text-pink-500" />{" "}
                                        Temperament
                                    </h2>
                                    <p className="text-gray-700">{breedData?.temperament}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Primary Uses */}
                <div className="mt-3 p-6 rounded-2xl bg-white shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 ">Primary Uses</h2>
                    <div className="flex flex-wrap gap-3">
                        <span className="text-sm font-medium px-4 py-2 rounded-full shadow-lg">
                            Dairy
                        </span>
                        <span className="text-sm font-medium px-4 py-2 rounded-full shadow-lg">
                            Dual Purpose
                        </span>
                    </div>
                </div>

                {/* Key Info Section */}
                <div className="mt-3 grid grid-cols-1  lg:grid-cols-2 gap-3">
                    {/* Left: Characteristics, Features, Importance */}
                    <div className="space-y-3 ">
                        {[
                            ["Key Characteristics", breedData?.characteristics],
                            ["Key Features", breedData?.Features],
                            ["Adaptability", breedData?.adaptability],
                            ["Importance", breedData?.Importance],
                        ].map(([title, content], i) => (
                            <div
                                key={i}
                                className="p-6 bg-white rounded-2xl shadow-xl transition-all"
                            >
                                <h3 className="text-xl font-semibold mb-3 flex items-center">
                                    <IoIosCheckmarkCircleOutline className="text-2xl text-green-500 mr-2" />
                                    {title}
                                </h3>
                                <p>{content}</p>
                            </div>
                        ))}
                    </div>

                    {/* Right: Milk Yield & Diet */}
                    <div className="space-y-3">
                        {/* Milk Yield */}
                        <div className="p-6 bg-white rounded-2xl shadow-xl transition-all">
                            <h2 className="text-xl font-semibold mb-4 flex items-center ">
                                <MdLocalDrink className="text-2xl mr-2 text-blue-700" /> Milk
                                Yield
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                <p>
                                    <strong>Avg/Day:</strong>{" "}
                                    {breedData?.milkYield?.averagePerDay}
                                </p>
                                <p>
                                    <strong>Fat %:</strong> {breedData?.milkYield?.fatPercent}
                                </p>
                                <p>
                                    <strong>Protein %:</strong>{" "}
                                    {breedData?.milkYield?.proteinPercent}
                                </p>
                                <p>
                                    <strong>SNF %:</strong> {breedData?.milkYield?.snfPercent}
                                </p>
                                <p>
                                    <strong>Lactation Yield:</strong>{" "}
                                    {breedData?.milkYield?.lactationYield}
                                </p>
                                <p>
                                    <strong>Length:</strong>{" "}
                                    {breedData?.milkYield?.lactationLength}
                                </p>
                                <p>
                                    <strong>A2 Milk:</strong>{" "}
                                    {breedData?.milkYield?.a2Milk ? "Yes" : "No"}
                                </p>
                            </div>
                        </div>

                        {/* Diet */}
                        <div className="p-6 mb-3 bg-white rounded-2xl shadow-xl transition-all">
                            <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <MdRestaurant className="text-2xl mr-2 text-green-600" /> Diet &
                                Feeding
                            </h2>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <h3 className="font-medium text-lg mb-1">Main Feeds</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {breedData?.diet?.mainFeeds?.map((feed, idx) => (
                                            <li key={idx}>{feed}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium text-lg mb-1">Feeding Habits</h3>
                                    <p>{breedData?.diet?.feedingHabits}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-lg mb-1">
                                        Nutritional Needs
                                    </h3>
                                    <p>
                                        <strong>Crude Protein:</strong>{" "}
                                        {breedData?.diet?.nutritionalNeeds?.crudeProtein}
                                    </p>
                                    <p>
                                        <strong>Energy Content:</strong>{" "}
                                        {breedData?.diet?.nutritionalNeeds?.energyContent}
                                    </p>
                                    <p>
                                        <strong>Fiber:</strong>{" "}
                                        {breedData?.diet?.nutritionalNeeds?.fiberContent}
                                    </p>
                                    <p>
                                        <strong>Minerals:</strong>{" "}
                                        {breedData?.diet?.nutritionalNeeds?.mineralNeeds?.join(
                                            ", "
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-lg mb-1">Special Notes</h3>
                                    <p>{breedData?.diet?.specialNotes}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}
