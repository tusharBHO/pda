// Theme-Update
"use client";

export default function Contact() {
  return (
    <div className="p-4 space-y-4">
      <div className="text-lg font-semibold text-theme">Contact Us</div>
      <hr className="border-theme/30 mb-4" />

      <div className="flex items-center justify-center">
        <div
          className="w-full max-w-md rounded-2xl p-6 shadow-lg border transition-colors duration-300"
          style={{ backgroundColor: "var(--secondary)", borderColor: "var(--accent)" }}
        >
          <form className="flex flex-col space-y-4">
            <div>
              <label className="block mb-1 text-theme" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-lg border transition-colors duration-300"
                style={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--accent)",
                  color: "var(--text-color)",
                }}
              />
            </div>

            <div>
              <label className="block mb-1 text-theme" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg border transition-colors duration-300"
                style={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--accent)",
                  color: "var(--text-color)",
                }}
              />
            </div>

            <div>
              <label className="block mb-1 text-theme" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Your message..."
                className="w-full px-4 py-2 rounded-lg border resize-none h-32 transition-colors duration-300"
                style={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--accent)",
                  color: "var(--text-color)",
                }}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full font-semibold py-2 rounded-lg shadow-md transition-colors duration-300 hover:brightness-105"
              style={{ backgroundColor: "var(--primary)", color: "var(--background)" }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <p className="text-center text-theme/70 text-sm mt-6 italic">
        For any queries or support related to buffalo and cattle breed detection, feel free to contact us.
      </p>
    </div>
  );
}