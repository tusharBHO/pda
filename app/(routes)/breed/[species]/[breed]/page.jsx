"use client";
import React from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { breedsData } from "../../../../../util/data";
import {
  MdArrowBack,
  MdPlace,
  MdShoppingBag,
  MdFavoriteBorder,
  MdLocalDrink,
  MdRestaurant,
} from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function BreedProfilePage() {
  const { species, breed } = useParams();
  const decodedBreed = decodeURIComponent(breed);
  const router = useRouter();
  const searchParams = useSearchParams();
  const confidenceScore = searchParams.get("confidenceScore");

  const breedData = breedsData[species]?.find(
    (b) => b.name === decodedBreed
  );

  if (!breedData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Breed not found
      </div>
    );
  }

  return (
    <div className="pt-20 px-4 max-w-6xl mx-auto space-y-8">
      {/* BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="fixed top-18 left-2 z-50 px-3 py-2 rounded-lg shadow-md hover:scale-105 transition bg-white"
      >
        <MdArrowBack />
      </button>

      {/* ================= HERO ================= */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl">
        <img
          src={breedData.image}
          className="w-full h-[380px] object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-4xl font-bold">{breedData.name}</h1>

          <p className="opacity-90 mt-1">
            {breedData.temperament} • {breedData.Use}
          </p>

          {confidenceScore && (
            <p className="mt-1 text-sm text-green-300">
              Confidence: {confidenceScore}
            </p>
          )}

          <div className="flex gap-3 mt-4 flex-wrap">
            <Stat label="Milk/Day" value={breedData.milkYield.averagePerDay} />
            <Stat label="Fat %" value={breedData.milkYield.fatPercent} />
            <Stat label="Protein %" value={breedData.milkYield.proteinPercent} />
          </div>
        </div>
      </div>

      {/* ================= QUICK INFO ================= */}
      <div className="grid md:grid-cols-4 gap-4">
        <InfoItem
          icon={<MdPlace />}
          title="Origin"
          value={breedData.originInIndia}
        />
        <InfoItem
          icon={<MdFavoriteBorder />}
          title="Temperament"
          value={breedData.temperament}
        />
        <InfoItem
          icon={<MdShoppingBag />}
          title="Usage"
          value={breedData.Use}
        />
        <InfoItem
          icon={<MdShoppingBag />}
          title="Weight"
          value={`M: ${breedData.weight.male}, F: ${breedData.weight.female}`}
        />
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT */}
        <div className="space-y-6">
          <Section title="Key Characteristics" content={breedData.characteristics} />
          <Section title="Key Features" content={breedData.Features} />
          <Section title="Adaptability" content={breedData.adaptability} />
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* MILK */}
          <div className="p-6 rounded-xl bg-[var(--secondary-bg)] shadow-sm">
            <h2 className="flex items-center text-lg font-semibold mb-4">
              <MdLocalDrink className="mr-2" /> Milk Yield
            </h2>

            <div className="space-y-3">
              <Progress label="Fat %" value={parseFloat(breedData.milkYield.fatPercent)} max={10} />
              <Progress label="Protein %" value={parseFloat(breedData.milkYield.proteinPercent)} max={10} />
              <Progress label="SNF %" value={parseFloat(breedData.milkYield.snfPercent)} max={15} />
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
              <p><b>Daily:</b> {breedData.milkYield.averagePerDay}</p>
              <p><b>Lactation:</b> {breedData.milkYield.lactationYield}</p>
              <p><b>Length:</b> {breedData.milkYield.lactationLength}</p>
              <p><b>A2 Milk:</b> {breedData.milkYield.a2Milk ? "Yes" : "No"}</p>
            </div>
          </div>

          {/* DIET */}
          <div className="p-6 rounded-xl bg-[var(--secondary-bg)] shadow-sm">
            <h2 className="flex items-center text-lg font-semibold mb-4">
              <MdRestaurant className="mr-2" /> Diet & Feeding
            </h2>

            <ul className="space-y-2">
              {breedData.diet.mainFeeds.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <IoIosCheckmarkCircleOutline className="text-green-500" />
                  {f}
                </li>
              ))}
            </ul>

            <p className="mt-3 text-sm opacity-80">
              {breedData.diet.specialNotes}
            </p>
          </div>
        </div>
      </div>

      {/* ================= AI INSIGHT ================= */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-green-100 to-blue-100">
        <h3 className="font-semibold mb-2">AI Insight</h3>
        <p className="text-sm">
          This breed is ideal for high-yield dairy production and performs well
          in moderate climates with proper nutrition.
        </p>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const Stat = ({ label, value }) => (
  <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-sm">
    <p className="opacity-80">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

const InfoItem = ({ icon, title, value }) => (
  <div className="p-4 bg-[var(--secondary-bg)] rounded-xl shadow-sm hover:shadow-md transition">
    <div className="flex items-center gap-2 font-medium text-sm">
      {icon}
      {title}
    </div>
    <p className="text-sm opacity-80 mt-1">{value}</p>
  </div>
);

const Section = ({ title, content }) => (
  <div className="p-6 rounded-xl bg-[var(--secondary-bg)] shadow-sm">
    <h3 className="flex items-center font-semibold mb-3">
      <IoIosCheckmarkCircleOutline className="text-green-500 mr-2" />
      {title}
    </h3>

    <ul className="space-y-2 text-sm">
      {content.split(",").map((item, i) => (
        <li key={i} className="flex items-center gap-2">
          <IoIosCheckmarkCircleOutline className="text-green-500" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const Progress = ({ label, value, max }) => {
  const percent = (value / max) * 100;

  return (
    <div>
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded">
        <div
          className="h-2 bg-green-500 rounded"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};