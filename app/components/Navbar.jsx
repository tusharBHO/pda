// app/components/Navbar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import Sidebar from "./Sidebar";
import ProfileCard from "../(routes)/profile/_components/ProfileCard";

export default function Navbar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  /* =========================
     THEME SWITCHER
  ========================= */
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "BreedDetection", href: "/BreedDetection" },
    { name: "Database", href: "/Database" },
    { name: "HowItWorks", href: "/how-it-works" },
  ];

  /* Close profile card on outside click */
  useEffect(() => {
    const handleClick = (e) => {
      if (
        !e.target.closest("#profile-card") &&
        !e.target.closest("#profile-btn")
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav
  className="fixed top-0 left-0 w-full z-50 shadow-sm"
  style={{
    backgroundColor: "var(--background)",
    color: "var(--text-color)",
    borderBottom:
      theme === "dark" ? "1px solid rgba(255, 255, 255, 0.12)" : "none",
  }}
>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* ========== MOBILE NAVBAR ========== */}
        <div className="flex items-center justify-between w-full md:hidden">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src="/logo07.png"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-lg">Bharat Pashudhan</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
           <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover-shadow"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {isSignedIn && (
              <button
                id="profile-btn"
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300"
              >
                <img
                  src={user.imageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>
            )}

            <button onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* ========== DESKTOP NAVBAR ========== */}
        <div className="hidden md:flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src="/logo07.png"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-lg">Bharat Pashudhan</span>
          </div>

          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-md font-medium transition-colors ${
                  pathname === item.href ? "text-green-700" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover-shadow"
            >
              {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
            </button>

            {isSignedIn && (
              <button
                id="profile-btn"
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300"
              >
                <img
                  src={user.imageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>
            )}
          </div>
        </div>
      </div>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navItems={navItems}
      />

      {isSignedIn && (
        <ProfileCard
          user={user}
          signOut={signOut}
          profileOpen={profileOpen}
          setProfileOpen={setProfileOpen}
        />
      )}
    </nav>
  );
}