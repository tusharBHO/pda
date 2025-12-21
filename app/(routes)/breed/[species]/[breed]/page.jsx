// app/(routes)/breed/[species]/[breed]/page.js
"use client";
import React, { useEffect } from "react";
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
import { toast } from "sonner"; // ✅ import toast

export default function BreedProfilePage() {
  const { species, breed } = useParams();
  const decodedBreed = decodeURIComponent(breed);
  const router = useRouter();
  const searchParams = useSearchParams();
  const confidenceScore = searchParams.get("confidenceScore");

  const breedData = breedsData[species]?.find(
    (b) => b.name === decodedBreed
  );

  // ✅ Toast on page load for testing
  useEffect(() => {
    if (breedData) {
      toast.success(`Loaded breed: ${breedData.name}`, { duration: 3000 });
      if (confidenceScore) {
        toast(`Confidence Score: ${confidenceScore}`, { variant: "info", duration: 3000 });
      }
    } else {
      toast.error("Breed not found", { duration: 3000 });
    }
  }, [breedData, confidenceScore]);

  if (!breedData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-lg font-medium">Breed not found.</p>
      </div>
    );
  }

  return (
    <div className="pt-20 font-sans">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="fixed top-20 left-4 px-3 py-1 rounded-lg text-xs font-medium
                   bg-green-600 text-white shadow-md hover:shadow-lg
                   hover:scale-105 transition-all"
      >
        Back
      </button>

      <div className="container mx-auto px-4">
        {/* ================= TOP SECTION ================= */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="md:w-1/2">
            <img
              src={breedData.image}
              alt={breedData.name}
              className="w-full max-h-[450px] object-cover rounded-2xl
                         shadow-lg hover:scale-[1.03]
                         transition-transform duration-300"
            />
          </div>

          {/* Info Card */}
          <div
            className="md:w-1/2 p-6 rounded-2xl
                       bg-[var(--secondary-bg)]
                       shadow-lg hover:shadow-xl
                       transition-all"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center
                            border-b-4 border-green-500 pb-4 mb-6">
              <h1 className="text-3xl font-bold">{breedData.name}</h1>

              {confidenceScore && (
                <p className="font-medium">
                  Confidence:
                  <span className="ml-1 font-semibold text-green-600">
                    {confidenceScore}
                  </span>
                </p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="flex items-center gap-2 font-semibold">
                  <MdPlace className="text-green-600 text-xl" />
                  Origin in India
                </h3>
                <p className="mt-1">{breedData.originInIndia}</p>
              </div>

              <div>
                <h3 className="flex items-center gap-2 font-semibold">
                  <MdShoppingBag className="text-blue-600 text-xl" />
                  Current Usage
                </h3>
                <p className="mt-1">{breedData.Use}</p>
              </div>

              <div>
                <h3 className="flex items-center gap-2 font-semibold">
                  <MdFavoriteBorder className="text-pink-500 text-xl" />
                  Temperament
                </h3>
                <p className="mt-1">{breedData.temperament}</p>
              </div>

              <div>
                <h3 className="flex items-center gap-2 font-semibold">
                  <MdShoppingBag className="text-purple-600 text-xl" />
                  Average Weight
                </h3>
                <p>Male: {breedData.weight.male}</p>
                <p>Female: {breedData.weight.female}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= PRIMARY USES ================= */}
        <div
          className="mt-6 p-6 rounded-2xl
                     bg-[var(--secondary-bg)]
                     shadow-lg hover:shadow-xl transition-all"
        >
          <h2 className="text-2xl font-semibold mb-4">Primary Uses</h2>
          <div className="flex gap-3 flex-wrap">
            {["Dairy", "Dual Purpose"].map((use, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full text-sm font-medium
                           bg-green-100 text-green-800
                           shadow-md hover:shadow-lg
                           hover:scale-105 transition-all"
              >
                {use}
              </span>
            ))}
          </div>
        </div>

        {/* ================= DETAILS GRID ================= */}
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          {/* Left */}
          <div className="space-y-4">
            {[
              ["Key Characteristics", breedData.characteristics],
              ["Key Features", breedData.Features],
              ["Adaptability", breedData.adaptability],
              ["Importance", breedData.Importance],
            ].map(([title, content], i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[var(--secondary-bg)]
                           shadow-lg hover:shadow-xl
                           hover:scale-[1.02] transition-all"
              >
                <h3 className="text-xl font-semibold flex items-center mb-2">
                  <IoIosCheckmarkCircleOutline className="text-green-600 mr-2 text-2xl" />
                  {title}
                </h3>
                <p>{content}</p>
              </div>
            ))}
          </div>

          {/* Right */}
          <div className="space-y-4">
            {/* Milk Yield */}
            <div className="p-6 rounded-2xl bg-[var(--secondary-bg)]
                            shadow-lg hover:shadow-xl transition-all">
              <h2 className="flex items-center text-xl font-semibold mb-4">
                <MdLocalDrink className="mr-2 text-blue-600 text-2xl" />
                Milk Yield
              </h2>
              <div className="grid sm:grid-cols-2 gap-2 text-sm">
                <p><b>Avg/Day:</b> {breedData.milkYield.averagePerDay}</p>
                <p><b>Fat %:</b> {breedData.milkYield.fatPercent}</p>
                <p><b>Protein %:</b> {breedData.milkYield.proteinPercent}</p>
                <p><b>SNF %:</b> {breedData.milkYield.snfPercent}</p>
                <p><b>Lactation:</b> {breedData.milkYield.lactationYield}</p>
                <p><b>Length:</b> {breedData.milkYield.lactationLength}</p>
                <p><b>A2 Milk:</b> {breedData.milkYield.a2Milk ? "Yes" : "No"}</p>
              </div>
            </div>

            {/* Diet */}
            <div className="p-6 rounded-2xl bg-[var(--secondary-bg)]
                            shadow-lg hover:shadow-xl transition-all">
              <h2 className="flex items-center text-xl font-semibold mb-4">
                <MdRestaurant className="mr-2 text-green-600 text-2xl" />
                Diet & Feeding
              </h2>

              <ul className="list-disc pl-5 text-sm space-y-1">
                {breedData.diet.mainFeeds.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>

              <p className="mt-3 text-sm">{breedData.diet.specialNotes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}