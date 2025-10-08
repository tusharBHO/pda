"use client";

export default function Contact() {
    return (
        <div className="p-4 space-y-2">
            <div className="text-lg font-semibold">Contact Us</div>
            <hr className="border-gray-300 mb-4" />

            <div className="flex items-center justify-center">
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
                    <form className="flex flex-col space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Your Name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                id="message"
                                placeholder="Your message..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none h-32"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-200 hover:bg-blue-300 text-gray-800 font-semibold py-2 rounded-lg transition-colors duration-300"
                        >
                            Submit
                        </button>
                    </form>

                    {/* 👇 Professional contact note */}
                </div>

            </div>
            <p className="text-center text-gray-500 text-sm mt-6 italic">
                For any queries or support related to buffalo and cattle breed detection, feel free to contact us.
            </p>
        </div>
    );
}
