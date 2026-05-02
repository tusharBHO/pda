// app/(routes)/Database/components/BreedCard.jsx
"use client";
import { useRouter } from "next/navigation";

// ✅ Helper (handles string/array safely)
const getCharArray = (charactF) => {
  if (!charactF) return [];
  if (Array.isArray(charactF)) return charactF;
  return charactF.split(",").map((c) => c.trim());
};

const BreedCard = ({ breed, species }) => {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(`/breed/${species}/${encodeURIComponent(breed.name)}`)
      }
      className="group cursor-pointer rounded-xl overflow-hidden bg-secondary shadow-sm hover:shadow-md transition"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={breed.image}
          className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
        />

        {/* Region */}
        <span className="absolute top-2 left-2 text-xs bg-black/60 text-white px-2 py-1 rounded">
          {breed.region}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg">{breed.name}</h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {breed.useF && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
              {breed.useF}
            </span>
          )}

          {getCharArray(breed.charactF)
            .slice(0, 2)
            .map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
        </div>

        {/* Milk */}
        {breed.milkYield?.averagePerDay && (
          <p className="text-sm mt-3 font-medium">
            🥛 {breed.milkYield.averagePerDay}
          </p>
        )}
      </div>
    </div>
  );
};

export default BreedCard;