// app/components/Sidebar.jsx
"use client";

import Link from "next/link";
import { X } from "lucide-react";

const Sidebar = ({ isOpen, onClose, navItems }) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300
        ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className={`fixed top-0 left-0 h-full w-full p-6
          transform transition-transform duration-300 shadow-xl
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ backgroundColor: "var(--background)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover-shadow"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className="
                text-2xl font-medium py-2 px-3 rounded-lg
                transition-all duration-200
                hover:bg-[var(--secondary)]
              "
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;