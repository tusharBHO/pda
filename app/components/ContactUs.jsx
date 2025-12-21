// app/components/ContactUs.jsx
"use client";
import React, { useState } from "react";
import { toast } from "sonner";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    // 🔔 Validation toasts
    if (!name.trim()) {
      toast.warning("Please enter your name");
      return;
    }
    if (!email.trim()) {
      toast.warning("Please enter your email");
      return;
    }
    if (!message.trim()) {
      toast.warning("Please write a message");
      return;
    }

    try {
      setLoading(true);
      const toastId = toast.loading("Sending your message...");

      // ⏳ Simulate API call (replace with real API later)
      await new Promise((res) => setTimeout(res, 1500));

      toast.success("Message sent successfully! 📩", {
        id: toastId,
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center rounded-3xl px-4 mx-3 py-12">
      <div
        className="w-full max-w-md rounded-2xl shadow-lg p-6"
        style={{ backgroundColor: "var(--secondary-bg)" }}
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-2.5 rounded-lg border border-gray-300
              bg-transparent focus:outline-none
              focus:ring-2 focus:ring-green-400"
            disabled={loading}
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-2.5 rounded-lg border border-gray-300
              bg-transparent focus:outline-none
              focus:ring-2 focus:ring-green-400"
            disabled={loading}
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={4}
            className="w-full p-2.5 rounded-lg border border-gray-300
              bg-transparent resize-none focus:outline-none
              focus:ring-2 focus:ring-green-400"
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-3 py-2.5 bg-green-600 text-white
              font-semibold rounded-lg hover:bg-green-700
              disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;