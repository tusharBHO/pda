// app/components/Sidebar.jsx
"use client";

import Link from "next/link";
import { X, Sun, Moon, Settings, LogOut, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";

const Sidebar = ({ isOpen, onClose, navItems, theme, toggleTheme }) => {
  const pathname = usePathname();
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300
        ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
    >
      {/* Backdrop/Overlay */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <div
        className={`absolute top-0 left-0 h-full w-4/5 max-w-sm p-6 bg-secondary border-r border-theme
          transform transition-transform duration-300 shadow-2xl flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (Logo + Title + Close Button) */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-theme transition-theme">
              <img
                src="/logo07.png"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-xl tracking-wide text-theme">Pashugyan</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-full text-theme hover:bg-[var(--border-color)] transition-theme"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Top Navigation Links */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`
                  text-lg font-medium py-3 px-4 rounded-xl transition-all duration-200
                  ${isActive
                    ? "text-[var(--primary)] bg-[var(--primary)]/10 font-bold"
                    : "text-theme hover:bg-[var(--border-color)]/50"
                  }
                `}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions Section */}
        <div className="mt-auto pt-6 border-t border-theme flex flex-col">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-4 text-lg font-medium text-theme py-2 px-4 rounded-xl hover:bg-[var(--border-color)]/50 transition-theme"
          >
            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>

          {/* Settings Link */}
          <Link
            href="/profile"
            onClick={onClose}
            className="flex items-center gap-4 text-lg font-medium text-theme py-2 px-4 rounded-xl hover:bg-[var(--border-color)]/50 transition-theme"
          >
            <Settings size={22} />
            Settings
          </Link>

          {/* User Account / Auth Status */}
          {isSignedIn ? (
            <div className="mt-4 p-4 rounded-xl border border-theme bg-[var(--background)] flex items-center justify-between transition-theme">
              <div className="flex items-center gap-3 overflow-hidden">
                <img
                  src={user.imageUrl}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-theme flex-shrink-0"
                />
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-bold text-theme truncate">
                    {user.fullName || "User"}
                  </span>
                  <span className="text-xs text-theme opacity-70 truncate">
                    {user.primaryEmailAddress?.emailAddress}
                  </span>
                </div>
              </div>

              <button
                onClick={() => signOut()}
                className="p-2 ml-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0"
                aria-label="Log Out"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link
              href="/sign-in"
              onClick={onClose}
              className="mt-4 flex items-center gap-4 text-lg font-medium py-3 px-4 rounded-xl button-primary transition-theme text-center justify-center"
            >
              <User size={22} />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;