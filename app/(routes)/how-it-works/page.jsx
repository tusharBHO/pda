// Theme-Update
"use client";
import React from "react";
import Image from "next/image";

export default function HowItWorks() {
  return (
    <div
      className="pt-10 font-display min-h-screen"
      style={{ backgroundColor: "var(--background)", color: "var(--text-color)" }}
    >
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-3xl md:text-3xl font-bold">{/* text-color from parent */}How It Works</h3>
          <p className="mt-4 text-md ">{/* Slightly muted text */}
            Identify cattle and buffalo breeds in three simple, intuitive steps.
          </p>
        </div>

        {/* Steps Section */}
        <div className="mt-12 flex flex-col gap-16 items-center relative">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="relative flex flex-col items-center text-center z-10"
            >
              {/* Step Button */}
              <button
                className="flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-lg bg-gradient-to-r from-green-600 to-green-700 dark:from-green-500 dark:to-green-600"
              >
                Step {step}
              </button>

              {/* Step Image Card */}
              <div
                className="mt-6 w-full max-w-[600px] rounded-xl overflow-hidden shadow-lg border"
                style={{
                  backgroundColor: "var(--secondary)",
                  borderColor: "var(--accent)",
                }}
              >
                <Image
                  src={`/Steps/step0${step}.png`}
                  alt={`Step ${step}`}
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}