"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      return toast.warning("Please fill out all fields.");
    }

    setIsLoading(true);
    const toastId = toast.loading("Sending your message, please wait...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send message");

      toast.success("Message sent successfully!", { id: toastId });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      toast.error(err.message || "Something went wrong. Please try again.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-12 mx-auto w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-full rounded-2xl shadow-sm p-6 sm:p-8 bg-[var(--secondary)] border border-[var(--accent)]">
        <h2 className="text-2xl font-bold text-theme mb-2">Get in touch</h2>
        <p className="text-theme/70 mb-6 text-sm">
          Have a question or feedback? We'd love to hear from you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name Field */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-theme" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition-all bg-transparent"
                style={{ borderColor: "var(--accent)", color: "var(--text-color)" }}
                disabled={isLoading}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-theme" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition-all bg-transparent"
                style={{ borderColor: "var(--accent)", color: "var(--text-color)" }}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label className="block mb-1.5 text-sm font-medium text-theme" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help?"
              className="w-full px-4 py-3 rounded-lg border resize-none h-32 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition-all bg-transparent"
              style={{ borderColor: "var(--accent)", color: "var(--text-color)" }}
              disabled={isLoading}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-8 py-2.5 font-semibold rounded-lg shadow-sm transition-all duration-300 hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            style={{ backgroundColor: "var(--primary)", color: "white" }}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="4" strokeDasharray="30"></circle>
                </svg>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}