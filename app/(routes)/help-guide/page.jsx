"use client";

import { MessageCircleQuestion, Lightbulb, CheckCircle2, Camera } from "lucide-react";

export default function HelpPage() {
  const steps = [
    {
      title: "Snap or Upload",
      text: "Upload a clear photo of your animal",
    },
    {
      title: "AI Analysis",
      text: "Wait a few seconds for identification",
    },
    {
      title: "Get Insights",
      text: "View breed details and useful insights",
    },
  ];

  const tips = [
    "Use a clear and well-lit image",
    "Ensure the full animal is visible",
    "Avoid blurry or dark photos",
    "Side view gives better results",
  ];

  const faqs = [
    {
      q: "What animals are supported?",
      a: "Currently supports cow and buffalo breeds.",
    },
    {
      q: "Do I need to sign up?",
      a: "No, you can use Pashugyan without signing up.",
    },
    {
      q: "How accurate are the results?",
      a: "Results depend on image quality and may vary.",
    },
    {
      q: "Is it free to use?",
      a: "Yes, Pashugyan is free to use.",
    },
  ];

  return (
    <main className="min-h-screen px-6 py-20 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="text-center max-w-2xl mb-16 space-y-4">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-[var(--secondary)] rounded-2xl border border-[var(--accent)] shadow-sm">
            <MessageCircleQuestion className="w-8 h-8 text-[var(--primary)]" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-theme tracking-tight">
          Help & Guide
        </h1>
        <p className="text-lg text-theme/70 leading-relaxed">
          Learn how to use Pashugyan effectively and get the best results for your livestock.
        </p>
      </div>

      <div className="w-full max-w-4xl space-y-16">

        {/* ================= STEPS SECTION ================= */}
        <section>
          <h2 className="text-2xl font-bold text-theme mb-6 px-2">How to Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative p-6 rounded-2xl bg-[var(--secondary)] border border-[var(--accent)] shadow-sm hover:shadow-md hover:border-[var(--primary)] transition-all duration-300"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-4 -left-4 w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--primary)] text-white font-bold shadow-md">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-lg text-theme mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-theme/70">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= PHOTO TIPS SECTION ================= */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[var(--secondary)] border border-[var(--accent)] shadow-sm relative overflow-hidden">
          {/* Decorative background icon */}
          <Camera className="absolute -bottom-10 -right-10 w-48 h-48 text-[var(--background)] opacity-50" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-theme">Photo Tips</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 bg-[var(--background)] p-4 rounded-xl border border-transparent hover:border-[var(--accent)] transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-theme text-sm font-medium leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section>
          <h2 className="text-2xl font-bold text-theme mb-6 px-2">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {faqs.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[var(--secondary)] border border-[var(--accent)] hover:border-[var(--primary)] shadow-sm transition-all duration-300 group"
              >
                <p className="font-semibold text-theme group-hover:text-[var(--primary)] transition-colors">
                  {item.q}
                </p>
                <p className="text-sm text-theme/70 mt-2 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}