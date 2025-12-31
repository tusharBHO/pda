// app/(routes)/Database/components/BreedCard.jsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const BreedCard = ({ breed, species }) => {
  const router = useRouter();

  const handleClick = () => {
    // Show loading toast
    const toastId = toast.loading("Details loading...");

    // Delay to simulate loading
    setTimeout(() => {
      try {
        // Navigate to breed page
        router.push(`/breed/${species}/${breed.name}`);
        // Show success toast
        toast.success(`Details for ${breed?.name} loaded successfully`, { id: toastId });
      } catch (error) {
        // Show error toast if navigation fails
        toast.error("Error loading details. Please try again.", { id: toastId });
        console.error("Navigation error:", error);
      }
    }, 1200); // 1.2 second delay to show loading toast
  };

  return (
    <div
      className="bg-secondary rounded-lg overflow-hidden shadow-theme
                 hover:shadow-lg transition-theme cursor-pointer"
      onClick={handleClick}
    >
      {/* Breed image */}
      <div
        className="w-full h-38 bg-cover bg-center"
        style={{
          backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAonuIYXLDmgjAqn1Wb2XspSNCz45Nd0qF4AjR6OskKdQdW0J3k3jDorqyAuLhaTGuEzRxcnCZt6UhZswZkIbq26uUBYnXfXSnuEXnqqQ7gVV0uDP0t6gDn10--miKyoxiY6GPYEiSqZUK7vk7uqsd0qOMzEdFykYJaYhE2_qymWUugvxyDnlRWlw4trV8cBikZVKiOpPq9-AQkXNoAnWNmJIcHRdVt3kn-ZETjW5sA8zWqrWmpY97LU1gnMRvoHn6PvcwpL4GKsZNO")`,
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