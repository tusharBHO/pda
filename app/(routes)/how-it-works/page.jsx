// app/(routes)/how-it-works/page.jsx
"use client";
import React from "react";
import Image from "next/image";

export default function HowItWorks() {
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

  return (
    <div
      className="pt-2 font-display min-h-screen"
      style={{ backgroundColor: "var(--background)", color: "var(--text-color)" }}
    >
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold">How It Works</h3>
          <p className="mt-2 text-md ">
            Identify cattle and buffalo breeds in three simple, intuitive steps.
          </p>
        </div>

        {/* Steps Section */}
        <div className="mt-6 flex flex-col gap-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-col items-center gap-4 md:gap-4"
            >
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-16 h-16 rounded-full btn-theme font-bold text-xl shadow-lg">
                  {index + 1}
                </div>
              </div>

              {/* Step Description */}
              <div className="flex-1 text-center ">
                <h4 className="text-2xl font-semibold">{step.title}</h4>
                <p className="mt-2 ">{step.description}</p>
              </div>

              {/* Step Image */}
              <div
                className="w-full max-w-[500px] rounded-xl overflow-hidden shadow-lg "
                style={{
                  backgroundColor: "var(--secondary)",
                  borderColor: "var(--accent)",
                }}
              >
                <Image
                  src={step.img}
                  alt={step.title}
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