// // app/(routes)/profile/contact/page.jsx
"use client";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) return toast.error("Please fill out all fields.");

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("Failed to send message");

      toast.success("Message sent successfully!");
      setName(""); setEmail(""); setMessage("");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="rounded-2xl shadow-sm p-6 sm:p-8 bg-[var(--secondary)] border border-[var(--accent)]">
        <h2 className="text-xl font-bold text-theme mb-2">Get in touch</h2>
        <p className="text-theme/70 mb-6 text-sm">Have a question or feedback? We'd love to hear from you.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block mb-1.5 text-sm font-medium text-theme" htmlFor="name">Name</label>
              <input
                type="text" id="name" value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition-all"
                style={{ backgroundColor: "var(--background)", borderColor: "var(--accent)", color: "var(--text-color)" }}
              />
            </div>
            <div>
              <label className="block mb-1.5 text-sm font-medium text-theme" htmlFor="email">Email</label>
              <input
                type="email" id="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition-all"
                style={{ backgroundColor: "var(--background)", borderColor: "var(--accent)", color: "var(--text-color)" }}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-theme" htmlFor="message">Message</label>
            <textarea
              id="message" value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help?"
              className="w-full px-4 py-3 rounded-lg border resize-none h-32 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition-all"
              style={{ backgroundColor: "var(--background)", borderColor: "var(--accent)", color: "var(--text-color)" }}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-2.5 font-semibold rounded-lg shadow-sm transition-all duration-300 hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            style={{ backgroundColor: "var(--primary)", color: "white" }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="4" strokeDasharray="30"></circle>
                </svg>
                Sending...
              </span>
            ) : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}