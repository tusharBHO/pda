// app/page.js
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 py-16 px-6 font-sans">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-md p-10 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Welcome to <span className="text-indigo-600">Bharat Pashudhan</span>
        </h1>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          This platform helps you identify the breed of your cattle using{" "}
          <span className="font-medium text-gray-900">image upload</span> or{" "}
          <span className="font-medium text-gray-900">camera capture</span>. 
          Explore our database of indigenous and global breeds to learn more 
          about their characteristics and importance.
        </p>

        <div className="flex justify-center">
          <Link
            href="/BreedDetection"
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
          >
            Start Breed Detection
          </Link>
        </div>
      </div>
    </main>
  );
}