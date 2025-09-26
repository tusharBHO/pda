// app/(routes)/breed\[species]\[breed]/page.jsx
"use client";
import React from "react";
import { breedsData } from "./components/data";
import { useParams, useRouter } from "next/navigation";
import { MdPlace, MdShoppingBag, MdFavoriteBorder, MdLens, MdLocalDrink, MdRestaurant } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function Cow_Profile_Page() {
    const { species, breed } = useParams();
    const decodedBreed = decodeURIComponent(breed);
    const router = useRouter();

    const breedData = breedsData[species]?.find(b => b.name === decodedBreed);
    console.log('species', species)
    console.log('breedData', breedData)

    if (!breedData) {
        return (
            <div className="min-h-screen bg-gray-50 pt-22 px-6 font-sans">
                <p className="text-center text-gray-700">Breed not found.</p>
            </div>
        );
    }

    return (
        <div className="pt-20 bg-white text-black text-text-light font-sans antialiased">
            <button
                className="bg-green-600 text-xs text-white px-2 py-1 rounded mb-8 fixed top-18 left-2"
                onClick={() => router.back()}
            >
                Back
            </button>

            <div className="container mx-auto px-8">
                {/* Cow Name */}
                <div className="text-3xl font-bold pb-5">
                    {breedData?.name}
                </div>

                {/* Cow Image */}
                <div className="mb-8">
                    <img
                        alt="A Sahiwal cow standing in a grassy field under a clear blue sky."
                        className="rounded-lg shadow-lg w-full h-auto object-cover max-h-96"
                        src={breedData?.image}
                    />
                </div>

                {/* Two Column Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        {/* Origin */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2 flex items-center">
                                <MdPlace className="text-2xl text-green-500 mr-3" />
                                Origin
                            </h2>
                            <p className="text-subtext-light ">
                                {breedData?.origin}
                            </p>
                        </div>

                        {/* OriginInIndia */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2 flex items-center">
                                <MdPlace className="text-2xl text-green-500 mr-3" />
                                Origin In India
                            </h2>
                            <p className="text-subtext-light ">
                                {breedData?.originInIndia}
                            </p>
                        </div>

                        {/* Current Usage */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2 flex items-center">
                                <MdShoppingBag className="text-2xl text-blue-500 mr-3" />
                                Current Usage in India
                            </h2>
                            <p className="text-subtext-light ">
                                {breedData?.Use}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Average Weight */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2 flex items-center">
                                <MdShoppingBag className="text-2xl text-purple-500 mr-3" />
                                Average Weight
                            </h2>
                            <p className="text-subtext-light ">
                                {/* Male: 450-500 kg */}
                                Male: {breedData?.weight?.male}
                            </p>
                            <p className="text-subtext-light ">
                                {/* Female: 300-400 kg */}
                                Female: {breedData?.weight?.female}
                            </p>
                        </div>

                        {/* Temperament */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2 flex items-center">
                                <MdFavoriteBorder className="text-2xl text-pink-500 mr-3" />
                                Temperament
                            </h2>
                            <p className="text-subtext-light ">
                                {breedData?.temperament}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border-light my-8"></div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-3">
                        {/* Primary Uses */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Primary Uses</h2>
                            <div className="flex space-x-4">
                                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full">
                                    Dairy
                                </span>
                                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-4 py-2 rounded-full">
                                    Dual Purpose
                                </span>
                            </div>
                        </div>

                        {/* Key Characteristics */}
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <IoIosCheckmarkCircleOutline className="text-2xl text-green-500 mr-3" />
                                Key Characteristics
                            </h2>
                            <div>
                                {breedData?.characteristics}
                            </div>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <IoIosCheckmarkCircleOutline className="text-2xl text-green-500 mr-3" />
                                Key Features
                            </h2>
                            <div>
                                {breedData?.Features}
                            </div>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <IoIosCheckmarkCircleOutline className="text-2xl text-green-500 mr-3" />
                                Key adaptability
                            </h2>
                            <div>
                                {breedData?.adaptability}
                            </div>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <IoIosCheckmarkCircleOutline className="text-2xl text-green-500 mr-3" />
                                Key Importance
                            </h2>
                            <div>
                                {breedData?.Importance}
                            </div>
                        </div>



                        {/* Milk Yield Section */}
                        <div className="mt-12">
                            <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <MdLocalDrink className="text-2xl text-blue-600 mr-3" />
                                Milk Yield
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-subtext-light ">
                                <p><strong>Average Per Day:</strong> {breedData?.milkYield?.averagePerDay}</p>
                                <p><strong>Fat %:</strong> {breedData?.milkYield?.fatPercent}</p>
                                <p><strong>Protein %:</strong> {breedData?.milkYield?.proteinPercent}</p>
                                <p><strong>SNF %:</strong> {breedData?.milkYield?.snfPercent}</p>
                                <p><strong>Lactation Yield:</strong> {breedData?.milkYield?.lactationYield}</p>
                                <p><strong>Lactation Length:</strong> {breedData?.milkYield?.lactationLength}</p>
                                <p><strong>A2 Milk:</strong> {breedData?.milkYield?.a2Milk ? "Yes" : "No"}</p>
                            </div>
                        </div>

                        {/* Diet Section */}
                        <div className="mt-12">
                            <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <MdRestaurant className="text-2xl text-green-600 mr-3" />
                                Diet & Feeding
                            </h2>

                            {/* Main Feeds */}
                            <div className="mb-4">
                                <h3 className="font-medium text-lg mb-2">Main Feeds</h3>
                                <ul className="list-disc pl-6 space-y-1">
                                    {breedData?.diet?.mainFeeds?.map((feed, idx) => (
                                        <li key={idx}>{feed}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Feeding Habits */}
                            <div className="mb-4">
                                <h3 className="font-medium text-lg mb-2">Feeding Habits</h3>
                                <p>{breedData?.diet?.feedingHabits}</p>
                            </div>

                            {/* Nutritional Needs */}
                            <div className="mb-4">
                                <h3 className="font-medium text-lg mb-2">Nutritional Needs</h3>
                                <p><strong>Crude Protein:</strong> {breedData?.diet?.nutritionalNeeds?.crudeProtein}</p>
                                <p><strong>Energy Content:</strong> {breedData?.diet?.nutritionalNeeds?.energyContent}</p>
                                <p><strong>Fiber Content:</strong> {breedData?.diet?.nutritionalNeeds?.fiberContent}</p>
                                <p><strong>Minerals:</strong> {breedData?.diet?.nutritionalNeeds?.mineralNeeds?.join(", ")}</p>
                            </div>

                            {/* Special Notes */}
                            <div>
                                <h3 className="font-medium text-lg mb-2">Special Notes</h3>
                                <p>{breedData?.diet?.specialNotes}</p>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
}