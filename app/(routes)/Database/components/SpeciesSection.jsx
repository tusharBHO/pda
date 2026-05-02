// app/(routes)/Database/components/SpeciesSection.jsx
import BreedCard from "./BreedCard";

export default function SpeciesSection({ title, breeds }) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {breeds.map((breed) => (
          <BreedCard
            key={breed.name}
            breed={breed}
            species={title}
          />
        ))}
      </div>
    </section>
  );
}