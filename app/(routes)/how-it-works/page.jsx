"use client";
import React from "react";

export default function HowItWorks() {
    return (
        <div className="bg-white pt-10 font-display text-gray-800 flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Title Section */}
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 ">
                        How It Works
                    </h2>
                    <p className="mt-4 text-xl text-gray-600 ">
                        Identify cattle and buffalo breeds in three simple, intuitive steps.
                    </p>
                </div>

                {/* Steps Section */}
                <div className="mt-10 flex flex-col gap-12 items-center relative">
                    {/* Step 1 */}
                    <div className="relative flex flex-col items-center text-center z-10">
                        <div className="flex items-center justify-center w-16 h-16 bg-background-light rounded-full border-2 border-primary ring-4 ring-background-light ">
                            <span className="text-2xl font-bold text-primary">1</span>
                        </div>
                        <div className="mt-6 w-[800px] h-[600px] rounded-xl overflow-hidden shadow-lg border border-gray-400 ">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url("Steps/step01.png")` }}
                            ></div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex flex-col items-center text-center z-10">
                        <div className="flex items-center justify-center w-16 h-16 bg-background-light rounded-full border-2 border-primary ring-4 ring-background-light">
                            <span className="text-2xl font-bold text-primary">2</span>
                        </div>
                        <div className="mt-6 w-[800px] h-[600px] rounded-xl overflow-hidden shadow-lg border border-gray-400 ">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url("Steps/step02.png")` }}
                            ></div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative flex flex-col items-center text-center z-10">
                        <div className="flex items-center justify-center w-16 h-16 bg-background-light-dark rounded-full border-2 border-primary ring-4 ring-background-light">
                            <span className="text-2xl font-bold text-primary">3</span>
                        </div>
                        <div className="mt-6 w-[1000px] h-[600px] rounded-xl overflow-hidden shadow-lg border border-gray-400 ">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url("Steps/step03.png")` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
