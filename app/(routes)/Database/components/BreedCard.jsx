import React from 'react'
import { useRouter } from "next/navigation";  // Next.js 13 client navigation

const BreedCard = ({ breed, species }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/breed/${species}/${breed.name}`);
    };
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            onClick={handleClick}
        >
            <div
                className="w-full h-38 bg-cover bg-center"
                style={{
                    backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAonuIYXLDmgjAqn1Wb2XspSNCz45Nd0qF4AjR6OskKdQdW0J3k3jDorqyAuLhaTGuEzRxcnCZt6UhZswZkIbq26uUBYnXfXSnuEXnqqQ7gVV0uDP0t6gDn10--miKyoxiY6GPYEiSqZUK7vk7uqsd0qOMzEdFykYJaYhE2_qymWUugvxyDnlRWlw4trV8cBikZVKiOpPq9-AQkXNoAnWNmJIcHRdVt3kn-ZETjW5sA8zWqrWmpY97LU1gnMRvoHn6PvcwpL4GKsZNO")',
                }}
            />
            <div className="p-4 text-black">
                <h3 className="text-lg font-bold">{breed?.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{breed?.originInIndia}</p>
                <p className="text-sm">{breed?.characteristics}</p>
            </div>
        </div>
    )
}

export default BreedCard