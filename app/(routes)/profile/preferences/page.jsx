// // app/(routes)/profile/preferences/page.jsx
"use client";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { toast } from "sonner";

export default function Preferences() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newValue = !prev;
      document.documentElement.classList.toggle("dark", newValue);
      localStorage.setItem("darkMode", newValue);
      toast.success(`${newValue ? "Dark" : "Light"} mode enabled`);
      return newValue;
    });
  };

  if (!mounted) return null; // Prevents hydration mismatch

  return (
    <div className="max-w-2xl w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="rounded-2xl shadow-sm p-6 sm:p-8 bg-[var(--secondary)] border border-[var(--accent)]">
        <h2 className="text-xl font-bold text-theme mb-6">Appearance</h2>

        <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--accent)] bg-[var(--background)]">
          <div>
            <p className="font-semibold text-theme">Dark Mode</p>
            <p className="text-sm text-theme/70 mt-0.5">Toggle the visual theme of the dashboard.</p>
          </div>

          <button
            onClick={toggleDarkMode}
            className={`relative w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] ${darkMode ? "bg-indigo-600" : "bg-gray-300"
              }`}
          >
            <div
              className={`w-6 h-6 flex items-center justify-center rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${darkMode ? "translate-x-8 bg-gray-900" : "translate-x-0 bg-white"
                }`}
            >
              {darkMode ? (
                <Moon className="w-3.5 h-3.5 text-indigo-200" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-yellow-500" />
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}