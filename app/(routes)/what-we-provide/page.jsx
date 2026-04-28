"use client";

import { Info, Leaf, Milk, HeartPulse, PawPrint, CheckCircle2 } from "lucide-react";

export default function WhatWeProvide() {
  const features = [
    {
      icon: <PawPrint className="w-6 h-6" />,
      title: "Breed Identification",
      text: "Identify cow and buffalo breeds quickly and accurately.",
    },
    {
      icon: <HeartPulse className="w-6 h-6" />,
      title: "Care & Health Tips",
      text: "Get basic care guidance to maintain animal health.",
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Feeding Guidance",
      text: "Understand suitable feeding practices for better growth.",
    },
    {
      icon: <Milk className="w-6 h-6" />,
      title: "Milk Yield Info",
      text: "View general milk production details for breeds.",
    },
    {
      icon: <Info className="w-6 h-6" />,
      title: "Breed Characteristics",
      text: "Learn about behavior, traits, and key features.",
    },
  ];

  const trustPoints = [
    "Supports multiple Indian breeds",
    "Fast and easy to use",
    "Works on mobile devices",
    "Designed for real-world livestock use",
  ];

  return (
    <main className="min-h-screen px-6 py-20 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header Section */}
      <div className="text-center max-w-2xl mb-16 space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-theme tracking-tight">
          What You Get with Pashugyan
        </h1>
        <p className="text-lg text-theme/70 leading-relaxed">
          Pashugyan helps you identify livestock breeds and provides useful
          insights to support better animal care and management.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {features.map((item, i) => (
          <div
            key={i}
            className="group p-8 rounded-2xl shadow-sm bg-[var(--secondary)] border border-[var(--accent)] hover:border-[var(--primary)] hover:shadow-md transition-all duration-300 flex flex-col items-center text-center gap-4"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[var(--background)] border border-[var(--accent)] text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white group-hover:scale-110 transition-all duration-300">
              {item.icon}
            </div>
            <h2 className="font-semibold text-xl text-theme">{item.title}</h2>
            <p className="text-theme/70 text-sm leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Trust Section Wrapper */}
      <div className="mt-24 w-full max-w-4xl p-8 sm:p-12 rounded-3xl bg-[var(--secondary)] border border-[var(--accent)] shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-theme">
            Why Use Pashugyan?
          </h2>
        </div>

        {/* Trust Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {trustPoints.map((point, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl bg-[var(--background)] border border-transparent hover:border-[var(--accent)] transition-colors"
            >
              <CheckCircle2 className="w-5 h-5 text-[var(--primary)] flex-shrink-0" />
              <span className="text-theme font-medium">{point}</span>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}