// app/(routes)/Database/components/SpeciesSection.jsx
import { useEffect } from "react";
import { toast } from "sonner";
import BreedCard from "./BreedCard";

export default function SpeciesSection({ title, breeds }) {
  useEffect(() => {
    if (!breeds || breeds.length === 0) {
      toast.error(`No breeds available for ${title}`);
    }
  }, [breeds, title]);

  return (
    <section className="mb-5 rounded-xl p-3 bg-white/5">
      <h2 className="text-2xl font-bold  mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {breeds?.length > 0 ? (
          breeds.map((breed, idx) => (
            <BreedCard key={idx} breed={breed} species={title} />
          ))
        ) : (
          <p>No breeds found.</p>
        )}
      </div>
    </section>
  );
}