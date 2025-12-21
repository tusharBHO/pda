"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-red-600">
        Something went wrong
      </h1>

      <p className="mt-3 text-sm opacity-80 max-w-md">
        We ran into an unexpected issue. Please try again.
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
        >
          Try Again
        </button>

        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}