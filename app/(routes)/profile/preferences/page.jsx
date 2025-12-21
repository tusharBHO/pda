// app/(routes)/profile/preferences/page.jsx
"use client";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { toast } from "sonner";

export default function Preferences() {
  const [darkMode, setDarkMode] = useState(false);

  // Load saved preference
  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newValue = !prev;
      document.documentElement.classList.toggle("dark", newValue);
      localStorage.setItem("darkMode", newValue);
      toast.success(`Switched to ${newValue ? "Dark" : "Light"} Mode`);
      return newValue;
    });
  };

  return (
    <div className="max-w-2xl p-4">
      <h2 className="text-xl font-semibold mb-2 text-theme">Preferences</h2>
      <hr className="border-theme/30 mb-6" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-theme">Dark Mode</p>
            <p className="text-sm text-theme/70">
              Enable dark theme for the interface
            </p>
          </div>

          {/* Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-500 ${
              darkMode ? "shadow-xl bg-blue-50" : "shadow-xl bg-yellow-50"
            }`}
          >
            {/* Circle */}
            <div
              className={`w-6 h-6 flex items-center justify-center rounded-full shadow-md transform transition-all duration-500 ease-in-out ${
                darkMode ? "translate-x-8 bg-gray-800" : "translate-x-0 bg-yellow-400"
              }`}
            >
              {darkMode ? (
                <Moon className="w-4 h-4 text-white transition-colors duration-500" />
              ) : (
                <Sun className="w-4 h-4 text-white transition-colors duration-500" />
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}