
// its work has not done yet, take a look over it after completing fixing other components
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import Sidebar from "./Sidebar";
import ProfileCard from "../(routes)/profile/_components/ProfileCard"
export default function Navbar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "BreedDetection", href: "/BreedDetection" },
    { name: "Database", href: "/Database" },
    { name: "HowItWorks", href: "/how-it-works" },
    // { name: "ChatBot", href: "/chatBot" },
  ];

  // Close profile card on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest("#profile-card") && !e.target.closest("#profile-btn")) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Mobile Navbar */}
        <div className="flex items-center justify-between w-full md:hidden">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full overflow-hidden">
              <img src="/logo07.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-semibold text-lg text-black">Bharat Pashudhan</span>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-2">
            {isSignedIn && (
              <button
                id="profile-btn"
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition-all"
              >
                <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
              </button>
            )}
            <button onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full overflow-hidden">
              <img src="/logo07.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-semibold text-lg text-black">Bharat Pashudhan</span>
          </div>

          {/* Nav Links + Profile */}
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-md font-medium transition-colors hover:text-blue-600 ${pathname === item.href ? "text-blue-600" : "text-gray-700"
                  }`}
              >
                {item.name}
              </Link>
            ))}

            {isSignedIn && (
              <button
                id="profile-btn"
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition-all"
              >
                <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navItems={navItems}
      />

      {/* ProfileCard */}
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