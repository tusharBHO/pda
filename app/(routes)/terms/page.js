// app/(routes)/terms/page.jsx
"use client";
import React from "react";

const termsData = [
  {
    title: "Image Upload & Usage",
    content: "Images uploaded to this platform are used solely for breed detection purposes. We do not claim ownership of your images. By uploading, you grant us a temporary license to process the image through our model."
  },
  {
    title: "Machine Learning Disclaimer",
    content: "Breed predictions are generated using an artificial intelligence and machine learning model. While we strive for accuracy, predictions may not always be 100% correct. Results should be considered informational only and not professional veterinary advice."
  },
  {
    title: "Rate Limiting",
    content: "To ensure fair usage and maintain system stability for all users, prediction requests may be rate-limited. Excessive, automated, or malicious requests can result in a temporary or permanent block from the service."
  },
  {
    title: "Service Availability",
    content: "We do not guarantee uninterrupted access to the platform. The service may be updated, modified, or temporarily unavailable due to maintenance or circumstances beyond our control."
  },
  {
    title: "Liability Limitation",
    content: "We are not legally or financially responsible for any decisions, actions, or losses made based on the information provided by this application. Use the tool at your own discretion."
  }
];

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16 md:py-24 font-display transition-theme">
      <main className="container mx-auto px-4 sm:px-6 max-w-3xl">

        {/* Header Section */}
        <div className="mb-12 border-b pb-8 border-theme transition-theme">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-theme">
            Terms & Conditions
          </h1>
          <p className="text-lg opacity-70 text-theme">
            Last updated: April 25, 2026
          </p>
          <p className="mt-6 text-md leading-relaxed opacity-90 text-theme">
            By accessing or using the Pashugyan application, you agree to be bound by these terms and conditions. Please read them carefully before using our services.
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-8">
          {termsData.map((term, index) => (
            <section
              key={index}
              className="relative pl-6 md:pl-8"
            >
              {/* Subtle Left Accent Border */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-full transition-theme"
                style={{ backgroundColor: "var(--accent)" }}
              ></div>

              <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-3 text-theme">
                {/* Replaced inline styles with global theme classes */}
                <span className="text-sm font-bold px-2 py-1 rounded-md bg-secondary border border-theme text-theme transition-theme">
                  0{index + 1}
                </span>
                {term.title}
              </h2>

              <p className="text-base md:text-lg opacity-80 leading-relaxed text-theme">
                {term.content}
              </p>
            </section>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 pt-8 border-t border-theme text-center opacity-60 text-sm text-theme transition-theme">
          <p>If you have any questions about these terms, please contact our support team.</p>
        </div>

      </main>
    </div>
  );
}