// app/page.js
"use client";

// app/page.js
import Link from "next/link";
import { Search, BarChart3, Users } from "lucide-react";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center pt-16 px-6 font-sans">
      {/* REMOVED text-gray-* → now inherits from global theme */}
      <div className="min-h-screen flex flex-col">
        {/* ================= HERO SECTION ================= */}
        <div
          className="relative flex flex-col items-center rounded-3xl justify-center min-h-[50vh] sm:min-h-[60vh] p-6 mt-2 sm:p-8 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(21, 33, 17, 0.6), rgba(21, 33, 17, 0.8)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBKz1u9tJrAZlohL9Y6tfFH8wAK88yRRTfUwVXbDKyRDbB2F5duSoFXcn7WEGP0fTQ-FbedoKFggFxB1cReCSKMvhxwyHlSNsLBHyOX7Me43rg_Fl9SYdJ-vt7ZPUdsKJIBLQD9yX_De-eDCYJ5aBnImVC0djGgmIx_IVnsG6-63M9BH_K22EF7eckO_6oCYWKNt3Q9XHsc_PcpA7r3Dpuucad4KUv8FU5Pxpz1XeBwTEJdRty51hclyc3aSDHz5YmFrnC_T9WI6vsg")`,
          }}
        >
          <div className="flex flex-col gap-4 text-center max-w-2xl">
            {/* White text is OK here because background is dark */}
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              Identify Cow & Buffalo Breeds Instantly
            </h1>
            <h2 className="text-base sm:text-lg text-white/90">
              Upload a photo and get accurate breed details in seconds.
              Make better decisions for your livestock.
            </h2>
          </div>

          <Link
            href="/BreedDetection"
            className="mt-8 flex items-center justify-center h-12 px-8 
               text-base font-semibold rounded-xl shadow-lg border
              btn-theme
              hover:shadow-xl hover:scale-105 
              transition-all duration-300 ease-in-out"
          >
            <span>Try It Now</span>
          </Link>
        </div>

        {/* ================= WHY CHOOSE SECTION ================= */}
        <div className="flex flex-col gap-10 px-4 pt-22 pb-10">
          <div className="flex flex-col gap-4 text-center">
            {/* REMOVED text-gray-800 */}
            <h1 className="text-3xl sm:text-4xl font-bold max-w-3xl mx-auto">
              Why Choose PashuGyan?
            </h1>
            <p className="text-base max-w-3xl mx-auto">
              Quickly identify breeds and get useful insights to manage your livestock better.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: <Search className="w-6 h-6" />,
                title: "Accurate Identification",
                text: "Upload an image and get accurate breed identification within seconds.",
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Data-Driven Insights",
                text: "Get detailed information about each breed, including characteristics and key traits.",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Simple & Easy",
                text: "Just upload a photo — no technical knowledge required.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-4 items-center text-center p-6 
                 bg-[var(--secondary-bg)] rounded-xl 
                 shadow-md hover:shadow-xl 
                 transform transition-all duration-500 hover:scale-105"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-200 text-green-700">
                  {item.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-bold">{item.title}</h2>
                  <p className="text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= CTA SECTION ================= */}
        <div className="flex flex-col items-center gap-6 px-4 py-16 text-center sm:pt-34">
          <div className="flex flex-col gap-2">
            {/* REMOVED text-gray-800 */}
            <h1 className="text-3xl sm:text-4xl font-bold max-w-2xl">
              Start Identifying Breeds Today
            </h1>
            <p className="text-base max-w-2xl mx-auto">
              Instantly identify the breed and access complete care, feeding, and milk yield information.
            </p>
          </div>
        </div>

        <ContactUs />
        <Footer className="sticky bottom-0 w-full" />
      </div>
    </main>
  );
}