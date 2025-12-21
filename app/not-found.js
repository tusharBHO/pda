// app/not-found.js
"use client";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-green-600">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>

      <p className="mt-2 text-sm opacity-80 max-w-md">
        The page you are looking for doesn’t exist or may have been moved.
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => router.back()}
          className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
        >
          Go Back
        </button>

        <button
          onClick={() => router.push("/")}
          className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
