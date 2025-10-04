// New Version
"use client";
import React from "react";
import Image from "next/image";
import { ArrowBigDownDash } from "lucide-react";

export default function HowItWorks() {
    return (
        <div className="bg-white pt-10 font-display text-gray-800 flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Title Section */}
                <div className="text-center max-w-3xl mx-auto">
                    <h3 className="text-3xl md:text-3xl font-bold text-gray-900">
                        How It Works
                    </h3>
                    <p className="mt-4 text-xl text-gray-600">
                        Identify cattle and buffalo breeds in three simple, intuitive steps.
                    </p>
                </div>

                {/* Steps Section */}
                <div className="mt-12 flex flex-col gap-16 items-center relative">
                    {/* Step 1 */}
                    <div className="relative flex flex-col items-center text-center z-10">
                        <div className="flex flex-col items-center justify-center">
                            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl shadow-lg ">
                                Step 1{/* <ArrowBigDownDash className="w-6 h-6" /> */}
                            </button>
                        </div>
                        <div className="mt-6 w-full max-w-[600px] rounded-xl overflow-hidden shadow-lg border border-gray-300">
                            <Image
                                src="/Steps/step01.png"
                                alt="Step 1"
                                width={800}
                                height={600}
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex flex-col items-center text-center z-10">
                        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl shadow-lg ">
                            Step 2{/* <ArrowBigDownDash className="w-6 h-6" /> */}
                        </button>
                        <div className="mt-6 w-full max-w-[600px] rounded-xl overflow-hidden shadow-lg border border-gray-300">
                            <Image
                                src="/Steps/step02.png"
                                alt="Step 2"
                                width={800}
                                height={600}
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative flex flex-col items-center text-center z-10">
                        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl shadow-lg ">
                            Step 3{/* <ArrowBigDownDash className="w-6 h-6" /> */}
                        </button>
                        <div className="mt-6 w-full max-w-[600px] rounded-xl overflow-hidden shadow-lg border border-gray-300">
                            <Image
                                src="/Steps/step03.png"
                                alt="Step 3"
                                width={800}
                                height={600}
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}