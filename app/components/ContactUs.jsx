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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation in JS
    if (!formData.name || !formData.email || !formData.message) {
      toast.warning("Please fill in all fields ⚠️");
      return;
    }

    const toastId = toast.loading("Sending your message, please wait... ⏳");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Message sent successfully ✅", { id: toastId });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send your message ❌", { id: toastId });
      console.error("Contact form error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center rounded-3xl px-4 mx-3 py-12">
      <div
        className="w-full max-w-md rounded-2xl shadow-lg p-6"
        style={{ backgroundColor: "var(--secondary-bg)" }}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Contact Us</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-2.5 rounded-lg border border-gray-300
              bg-transparent focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-2.5 rounded-lg border border-gray-300
              bg-transparent focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={4}
            className="w-full p-2.5 rounded-lg border border-gray-300
              bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            className="mt-3 py-2.5 font-semibold rounded-lg btn-theme transition hover:scale-105"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;