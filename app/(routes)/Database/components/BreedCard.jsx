// Theme-Update
"use client";
import React from "react";
import { useRouter } from "next/navigation";

const BreedCard = ({ breed, species }) => {
  const router = useRouter();

  const handleClick = () => router.push(`/breed/${species}/${breed.name}`);

  return (
    <div
      className="bg-secondary rounded-lg overflow-hidden shadow-theme hover:shadow-lg transition-theme cursor-pointer"
      onClick={handleClick}
    >
      <div
        className="w-full h-38 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAonuIYXLDmgjAqn1Wb2XspSNCz45Nd0qF4AjR6OskKdQdW0J3k3jDorqyAuLhaTGuEzRxcnCZt6UhZswZkIbq26uUBYnXfXSnuEXnqqQ7gVV0uDP0t6gDn10--miKyoxiY6GPYEiSqZUK7vk7uqsd0qOMzEdFykYJaYhE2_qymWUugvxyDnlRWlw4trV8cBikZVKiOpPq9-AQkXNoAnWNmJIcHRdVt3kn-ZETjW5sA8zWqrWmpY97LU1gnMRvoHn6PvcwpL4GKsZNO")',
        }}
      />
      <div className="p-4 text-theme">
        <h3 className="text-lg font-bold">{breed?.name}</h3>
        <p className="text-sm text-theme/70 mb-2">{breed?.originInIndia}</p>
        <p className="text-sm">{breed?.characteristics}</p>
      </div>
    </div>
  );
};

export default BreedCard;