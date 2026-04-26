// // app/(routes)/how-it-works/page.jsx
// app/(routes)/how-it-works/page.jsx
"use client";
import React from "react";
import Image from "next/image";

const steps = [
  {
    title: "Capture Image",
    description: "Upload or click a clear image of your cattle or buffalo for analysis.",
    img: "/Steps/step01.png",
  },
  {
    title: "AI & ML Detection",
    description: "Our AI and ML model processes the image and identifies the breed accurately.",
    img: "/Steps/step02.png",
  },
  {
    title: "Get Results",
    description: "Receive breed information instantly to help in management and decision-making.",
    img: "/Steps/step03.png",
  },
];

export default function HowItWorks() {
  return (
    <div
      className="min-h-screen py-16 md:py-24 font-display"
      style={{ backgroundColor: "var(--background)", color: "var(--text-color)" }}
    >
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-lg md:text-xl opacity-80">
            Identify cattle and buffalo breeds in three simple, intuitive steps.
          </p>
        </div>

        {/* Steps Section */}
        <div className="space-y-24 md:space-y-32">
          {steps.map((step, index) => {
            // Determine if the current row should be reversed (zig-zag effect)
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 ${!isEven ? "md:flex-row-reverse" : ""
                  }`}
              >

                {/* Text Content */}
                <div className="flex-1 space-y-6 text-center md:text-left">
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl shadow-md font-bold text-2xl"
                    style={{ backgroundColor: "var(--accent, #e5e7eb)", color: "var(--text-color)" }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-3">{step.title}</h3>
                    <p className="text-lg opacity-80 leading-relaxed max-w-md mx-auto md:mx-0">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Image Content */}
                <div className="flex-1 w-full max-w-[500px] md:max-w-none relative group">
                  {/* Optional: Subtle glow effect behind the image */}
                  <div className="absolute inset-0 bg-green-500/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-500 blur-xl"></div>

                  {/* Image Card */}
                  <div
                    className="relative rounded-2xl overflow-hidden shadow-xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                    style={{
                      backgroundColor: "var(--secondary, #ffffff)",
                      borderColor: "var(--accent, #e5e7eb)",
                    }}
                  >
                    <Image
                      src={step.img}
                      alt={step.title}
                      width={800}
                      height={600}
                      className="w-full h-auto object-contain p-4"
                    />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </main>
    </div>
  );
}