// Theme-Updated
import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us!");
    setFormData({ name: "", email: "", message: "" });
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
            required
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
            required
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
            required
          />

          <button
            type="submit"
            className="mt-3 py-2.5 bg-green-600 text-white
              font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;