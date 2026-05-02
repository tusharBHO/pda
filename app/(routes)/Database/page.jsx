// app/(routes)/Database/page.jsx
'use client'
import React, { useState, useMemo } from "react";
import Sidebar from "./components/Sidebar";
import SpeciesSection from "./components/SpeciesSection";
import SidebarDrawer from "./components/SidebarDrawer";
import { breedsData } from "../../../util/data";

export default function BreedsPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedUses, setSelectedUses] = useState([]);
  const [selectedCharacteristics, setSelectedCharacteristics] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredBreedsData = useMemo(() => {
    const result = {};

    Object.keys(breedsData).forEach((species) => {
      const filtered = breedsData[species].filter((breed) => {

        // ✅ Normalize characteristics
        const charArray = Array.isArray(breed.charactF)
          ? breed.charactF
          : breed.charactF?.split(",").map((c) => c.trim());

        const matchesName = breed.name
          .toLowerCase()
          .includes(searchText.toLowerCase());

        const matchesRegion =
          selectedRegions.length === 0 ||
          selectedRegions.includes(breed.region);

        const matchesUse =
          selectedUses.length === 0 ||
          selectedUses.includes(breed.useF);

        const matchesCharacteristics =
          selectedCharacteristics.length === 0 ||
          selectedCharacteristics.every((trait) =>
            charArray?.includes(trait)
          );

        return (
          matchesName &&
          matchesRegion &&
          matchesUse &&
          matchesCharacteristics
        );
      });

      if (filtered.length > 0) result[species] = filtered;
    });

    return result;
  }, [searchText, selectedRegions, selectedUses, selectedCharacteristics]);

  const totalBreeds = Object.values(filteredBreedsData).flat().length;

  return (
    <div className="font-display h-[100vh] pt-12 bg-background text-theme">
      <div className="container px-4 mx-auto">

        {/* HEADER + FILTER BUTTON */}
        <div className="flex justify-between items-center pt-7 mb-3">
          <p className="text-sm opacity-70">
            {totalBreeds} breeds found
          </p>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="md:hidden px-3 py-1.5 text-sm rounded-lg bg-primary text-theme"
          >
            Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-2">

          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <Sidebar
              searchText={searchText}
              setSearchText={setSearchText}
              selectedRegions={selectedRegions}
              setSelectedRegions={setSelectedRegions}
              selectedUses={selectedUses}
              setSelectedUses={setSelectedUses}
              selectedCharacteristics={selectedCharacteristics}
              setSelectedCharacteristics={setSelectedCharacteristics}
            />
          </div>

          {/* Mobile Drawer */}
          <SidebarDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            searchText={searchText}
            setSearchText={setSearchText}
            selectedRegions={selectedRegions}
            setSelectedRegions={setSelectedRegions}
            selectedUses={selectedUses}
            setSelectedUses={setSelectedUses}
            selectedCharacteristics={selectedCharacteristics}
            setSelectedCharacteristics={setSelectedCharacteristics}
          />

          {/* Main Content */}
          <main className="flex-grow rounded-xl h-[88vh] overflow-y-auto bg-secondary border border-theme shadow-theme p-4">

            <div className="mb-4">
              <h1 className="text-2xl font-bold">Breed Database</h1>
              <p className="text-sm opacity-70">
                Find the right breed based on region, milk production, and characteristics
              </p>
            </div>

            <p className="text-sm mb-3 opacity-70">
              {totalBreeds} breeds found
            </p>

            {Object.keys(filteredBreedsData).length > 0 ? (
              Object.keys(filteredBreedsData).map((species) => (
                <SpeciesSection
                  key={species}
                  title={species}
                  breeds={filteredBreedsData[species]}
                />
              ))
            ) : (
              <div className="text-center py-20 opacity-70">
                <p className="text-lg font-medium">No breeds found</p>
                <p className="text-sm mt-2">
                  Try adjusting your filters or search
                </p>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}