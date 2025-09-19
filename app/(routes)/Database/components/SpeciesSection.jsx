// app/(routes)/DataBase/components/SpeciesSection.jsx
"use client";

import BreedCard from "./BreedCard";

export default function SpeciesSection({ title, breeds }) {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {breeds.map((breed, idx) => (
                    <BreedCard key={idx} {...breed} species={title} />
                ))}
            </div>
        </section>
    );
}
