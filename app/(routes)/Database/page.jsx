// app/(routes)/DataBase/page.jsx
"use client";

import { breedsData } from "./components/data";
import SpeciesSection from "./components/SpeciesSection";

export default function DataBasePage() {
    return (
        <main className="min-h-screen bg-gray-50 py-20 px-6 font-sans">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
                    Cattle & Buffalo Breeds Database
                </h1>

                {Object.keys(breedsData).map((species, idx) => (
                    <SpeciesSection key={idx} title={species} breeds={breedsData[species]} />
                ))}
            </div>
        </main>
    );
}
