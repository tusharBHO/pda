// app/(routes)/profile/contact/page.jsx
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

    if (!name || !email || !message) {
      toast.error("Please fill out all fields.");
      return;
    }

    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      toast.success("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        className="w-full max-w-md flex flex-col space-y-4 rounded-2xl p-6 shadow-lg border transition-colors duration-300"
        style={{ backgroundColor: "var(--secondary)", borderColor: "var(--accent)" }}
        onSubmit={handleSubmit}
      >
        {/* Name */}
        <div>
          <label className="block mb-1 text-theme" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full px-4 py-2 rounded-lg border transition-colors duration-300"
            style={{
              backgroundColor: "var(--background)",
              borderColor: "var(--accent)",
              color: "var(--text-color)",
            }}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-theme" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-lg border transition-colors duration-300"
            style={{
              backgroundColor: "var(--background)",
              borderColor: "var(--accent)",
              color: "var(--text-color)",
            }}
          />
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 text-theme" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message..."
            className="w-full px-4 py-2 rounded-lg border resize-none h-32 transition-colors duration-300"
            style={{
              backgroundColor: "var(--background)",
              borderColor: "var(--accent)",
              color: "var(--text-color)",
            }}
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full font-semibold py-2 rounded-lg shadow-md transition-colors duration-300 hover:brightness-105 disabled:opacity-50"
          style={{ backgroundColor: "var(--primary)", color: "var(--background)" }}
        >
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
}