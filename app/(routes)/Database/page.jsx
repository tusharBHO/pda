// app/(routes)/Database/page.jsx
"use client";
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

        Object.keys(breedsData).forEach(species => {
            const filtered = breedsData[species].filter(breed => {
                const matchesName = breed.name.toLowerCase().includes(searchText.toLowerCase());
                const matchesRegion =
                selectedRegions.length === 0 || selectedRegions.includes(breed.region);
                const matchesUse =
                    selectedUses.length === 0 || selectedUses.includes(breed.useF);
                const matchesCharacteristics =
                    selectedCharacteristics.length === 0 ||
                    selectedCharacteristics.every(trait =>
                        breed.charactF?.includes(trait)
                    );

                return matchesName && matchesRegion && matchesUse && matchesCharacteristics;
            });

            if (filtered.length > 0) result[species] = filtered;
        });

        return result;
    }, [searchText, selectedRegions, selectedUses, selectedCharacteristics]);


    return (
        <div className="bg-gray-100 font-display text-content-light h-[100vh] pt-10">
            <div className="flex flex-col">
                <div className="">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row gap-8 pt-7">
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
                            <main className="flex-grow rounded-sm h-[90vh] overflow-y-auto">
                                {Object.keys(filteredBreedsData).map((species, idx) => {
                                    console.log("Filtered breeds for", species, ":", filteredBreedsData[species]);
                                    return (
                                        <SpeciesSection
                                            key={idx}
                                            title={species}
                                            breeds={filteredBreedsData[species]}
                                        />
                                    );
                                })}
                            </main>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}