// app/components/Navbar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sun, Moon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import Sidebar from "./Sidebar";
import ProfileCard from "../(routes)/profile/_components/ProfileCard";

export default function Navbar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  /* =========================
     HOVER TIMEOUT REF
  ========================= */
  const closeTimeoutRef = useRef(null);

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
    { name: "BreedDetection", href: "/BreedDetection" },
    { name: "Database", href: "/Database" },
    { name: "HowItWorks", href: "/how-it-works" },
    { name: "WhatWeProvide", href: "/what-we-provide" },
    { name: "Help & Guide", href: "/help-guide" },
  ];

  /* =========================
     HOVER HANDLERS
  ========================= */
  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setProfileOpen(true);
  };

  const handleMouseLeave = () => {
    // Adds a tiny 300ms delay so the menu doesn't snap shut instantly
    closeTimeoutRef.current = setTimeout(() => {
      setProfileOpen(false);
    }, 300);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 shadow-sm border-b border-theme bg-[var(--background)] text-theme transition-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        {/* ========== MOBILE NAVBAR ========== */}
        <div className="flex items-center justify-between w-full md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-theme transition-theme">
              <img
                src="/logo07.png"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-lg text-theme">
              Pashugyan
            </span>
          </Link>

          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 -mr-2 text-theme hover:opacity-70 transition-theme"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>

        {/* ========== DESKTOP NAVBAR ========== */}
        <div className="hidden md:flex items-center justify-between w-full h-full">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-theme transition-theme">
              <img
                src="/logo07.png"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-lg text-theme">
              Pashugyan
            </span>
          </Link>

          <div className="flex items-center space-x-8 h-full">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-md font-medium transition-theme hover:opacity-70 ${pathname === item.href
                  ? "text-[var(--primary)] font-bold"
                  : "text-theme"
                  }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Desktop Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="icon-btn text-theme hover:opacity-70 transition-theme cursor-pointer"
            >
              {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
            </button>

            {/* 🔥 DESKTOP PROFILE HOVER WRAPPER 🔥 */}
            {isSignedIn && (
              <div
                className="relative flex items-center"
                onMouseEnter={() => {
                  if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
                  setProfileOpen(true);
                }}
                onMouseLeave={() => {
                  closeTimeoutRef.current = setTimeout(() => {
                    setProfileOpen(false);
                  }, 150);
                }}
              >
                <button
                  className="w-10 h-10 overflow-hidden border-2 border-theme rounded-full hover:opacity-80 transition-theme"
                >
                  <img
                    src={user.imageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </button>

                <ProfileCard
                  user={user}
                  signOut={signOut}
                  profileOpen={profileOpen}
                  setProfileOpen={setProfileOpen}
                  closeTimeoutRef={closeTimeoutRef} // 👈 pass this
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navItems={navItems}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </nav>
  );
}