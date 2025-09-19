// app/(routes)/Database/components/BreedCard.jsx
"use client";
import { useRouter } from "next/navigation";  // Next.js 13 client navigation

export default function BreedCard({ name, origin, characteristics, image, species }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/breed/${species}/${encodeURIComponent(name)}`);
    };

    return (
        <div
            className="rounded-lg shadow-md bg-white p-4 hover:shadow-xl transition cursor-pointer"
            onClick={handleClick}
        >
            <img
                src={image}
                alt={name}
                className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="mt-3 text-lg font-bold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500"><span className="font-semibold">Origin:</span> {origin}</p>
            <p className="mt-2 text-gray-600 text-sm">{characteristics}</p>
        </div>
    );
}