"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { User, LogOut } from "lucide-react";

export default function ProfileCard({
  user,
  signOut,
  profileOpen,
  setProfileOpen,
  closeTimeoutRef,
}) {
  const router = useRouter();

  if (!profileOpen) return null;

  return (
    <div
      className="
        absolute -right-7 top-16 w-80 rounded-2xl shadow-2xl
        overflow-hidden transform transition-all duration-200 ease-out
        z-50 bg-secondary border border-theme
      "
      onMouseEnter={() => {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      }}
      onMouseLeave={() => {
        setProfileOpen(false);
      }}
    >
      {/* Header */}
      <div className="p-6 border-b border-theme flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-full p-1 border-2 border-[var(--primary)]">
          <img
            src={user.imageUrl}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <div className="text-center w-full">
          <h2 className="font-bold text-xl text-theme truncate">
            {user.fullName || "User"}
          </h2>
          <p className="text-sm opacity-70 text-theme truncate mt-1">
            {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 flex flex-col gap-3 bg-[var(--background)]">
        <button
          onClick={() => {
            setProfileOpen(false);
            setTimeout(() => {
              startTransition(() => {
                router.push("/profile/account");
              });
            }, 150);
          }}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl btn-theme"
        >
          <User size={18} />
          Account Settings
        </button>

        <button
          onClick={() => {
            setProfileOpen(false);
            signOut({ redirectUrl: "/" });
          }}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl btn-theme-logout"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}