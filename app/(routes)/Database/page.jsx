// app/(routes)/Database/page.jsx
'use client'
import { toast } from "sonner";
import { useEffect } from "react";
import React, { useState, useMemo } from "react";
import Sidebar from "./components/Sidebar";
import SpeciesSection from "./components/SpeciesSection";
import { breedsData } from "../../../util/data";

export default function BreedsPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedUses, setSelectedUses] = useState([]);
  const [selectedCharacteristics, setSelectedCharacteristics] = useState([]);

  // Filter breeds based on search + filters
  const filteredBreedsData = useMemo(() => {
    const result = {};
    Object.keys(breedsData).forEach((species) => {
      const filtered = breedsData[species].filter((breed) => {
        const matchesName = breed.name.toLowerCase().includes(searchText.toLowerCase());
        const matchesRegion = selectedRegions.length === 0 || selectedRegions.includes(breed.region);
        const matchesUse = selectedUses.length === 0 || selectedUses.includes(breed.useF);
        const matchesCharacteristics =
          selectedCharacteristics.length === 0 ||
          selectedCharacteristics.every((trait) => breed.charactF?.includes(trait));

        return matchesName && matchesRegion && matchesUse && matchesCharacteristics;
      });
      if (filtered.length > 0) result[species] = filtered;
    });
    return result;
  }, [searchText, selectedRegions, selectedUses, selectedCharacteristics]);

  // Toast for empty results
  useEffect(() => {
    const totalBreeds = Object.values(filteredBreedsData).flat().length;
    if (totalBreeds === 0) {
      toast.error("No breeds match your search and filter criteria.");
    }
  }, [filteredBreedsData]);

  return (
    <div className="font-display h-[100vh] pt-12 bg-background text-theme transition-theme">
      <div className="flex flex-col">
        <div className="container px-4 sm:px-4 mx-auto">
          <div className="flex flex-col md:flex-row gap-2 pt-7">
            {/* Sidebar */}
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

            {/* Main Content */}
            <main className="flex-grow rounded-xl h-[88vh] overflow-y-auto bg-secondary border border-theme shadow-theme p-2 transition-theme">
              {Object.keys(filteredBreedsData).map((species, idx) => (
                <SpeciesSection
                  key={idx}
                  title={species}
                  breeds={filteredBreedsData[species]}
                />
              ))}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}