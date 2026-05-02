// // // app/(routes)/profile/account/page.jsx
// app/(routes)/profile/account/page.jsx
"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

export default function AccountDetails() {
  const { user } = useUser();
  const { signOut } = useClerk();

  // ✅ Prefer metadata name, fallback to Clerk name
  const displayName = user?.unsafeMetadata?.fullName || user?.fullName || "";

  const [name, setName] = useState(displayName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [modalType, setModalType] = useState(null);

  const hasShownToast = useRef(false);

  useEffect(() => {
    if (user && !hasShownToast.current) {
      toast.success("Account details loaded");
      hasShownToast.current = true;
    }
  }, [user]);

  /* ================= NAME CHANGE ================= */
  const handleNameChange = async () => {
    const trimmed = name.trim();

    if (!trimmed) {
      toast.warning("Name cannot be empty");
      return;
    }

    const id = toast.loading("Updating name...");

    try {
      console.log("Updating unsafeMetadata:", trimmed);

      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          fullName: trimmed,
        },
      });

      toast.success("Name updated successfully", { id });
      setIsEditingName(false);
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update name", { id });
    }
  };

  /* ================= AVATAR CHANGE ================= */
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const id = toast.loading("Uploading avatar...");
    try {
      await user.setProfileImage({ file });
      toast.success("Avatar updated", { id });
    } catch {
      toast.error("Avatar upload failed", { id });
    }
  };

  /* ================= CONFIRM ACTIONS ================= */
  const handleConfirm = async () => {
    const id = toast.loading("Processing...");
    try {
      if (modalType === "signOut") await signOut();
      if (modalType === "signOutAll") await signOut({ session: "all" });

      if (modalType === "delete") {
        await user.delete();
        await signOut({ redirectUrl: "/" });
      }

      toast.success(
        modalType === "delete" ? "Account deleted" : "Action completed",
        { id }
      );
    } catch {
      toast.error("Something went wrong", { id });
    } finally {
      setModalType(null);
    }
  };

  return (
    <div className="max-w-2xl w-full page-enter space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* ================= ACCOUNT PROFILE CARD ================= */}
      <div className="rounded-2xl shadow-sm p-6 space-y-6 bg-[var(--secondary)] border border-[var(--accent)]">
        <h2 className="text-xl font-bold text-theme">Profile Information</h2>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative group">
            <img
              src={user?.imageUrl}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover shadow-md border-2 border-[var(--accent)]"
            />
            <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs font-semibold rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
              Upload
              <input type="file" className="hidden" onChange={handleAvatarChange} />
            </label>
          </div>

          <div className="flex-1 space-y-4 text-center sm:text-left w-full">
            <div>
              <p className="text-2xl font-bold text-theme">{displayName}</p>
              <p className="text-theme/70 font-medium break-words">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>

            <div className="pt-2">
              {isEditingName ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 p-2.5 rounded-lg border focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition-shadow"
                    style={{
                      borderColor: "var(--accent)",
                      backgroundColor: "var(--background)",
                      color: "var(--text-color)",
                    }}
                    autoFocus
                  />
                  <div className="flex gap-2 justify-center sm:justify-start">
                    <button
                      onClick={handleNameChange}
                      className="px-4 py-2.5 rounded-lg bg-[var(--primary)] hover:brightness-110 text-white font-medium transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingName(false);
                        setName(displayName);
                        toast("Edit cancelled");
                      }}
                      className="px-4 py-2.5 rounded-lg border border-[var(--accent)] hover:bg-[var(--background)] transition-colors text-theme"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-sm px-4 py-2.5 rounded-lg border border-[var(--accent)] hover:bg-[var(--background)] transition-colors font-medium text-theme"
                >
                  Edit Full Name
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= SYSTEM SETTINGS CARD ================= */}
      <div className="rounded-2xl shadow-sm p-6 space-y-4 bg-[var(--secondary)] border border-[var(--accent)]">
        <h2 className="text-xl font-bold text-theme mb-4">System Settings</h2>

        <div className="space-y-3">
          <SystemRow
            label="Sign out"
            onClick={() => setModalType("signOut")}
          />
          <SystemRow
            label="Sign out of all sessions"
            onClick={() => setModalType("signOutAll")}
          />
          <SystemRow
            label="Delete account"
            danger
            onClick={() => setModalType("delete")}
          />
        </div>
      </div>

      {/* ================= CONFIRM MODAL ================= */}
      {modalType && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setModalType(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center transform transition-all scale-100 bg-[var(--secondary)] border border-[var(--accent)]"
          >
            <h2 className="text-xl font-bold text-theme mb-2">Confirm action</h2>
            <p className="text-theme/70 text-sm mb-6">
              {modalType === "delete"
                ? "This action cannot be undone. This will permanently delete your account."
                : "Are you sure you want to proceed?"}
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleConfirm}
                className={`w-full px-4 py-2.5 rounded-lg font-semibold text-white transition-colors ${modalType === "delete" ? "bg-red-600 hover:bg-red-700" : "bg-[var(--primary)] hover:brightness-110"
                  }`}
              >
                Yes, continue
              </button>
              <button
                onClick={() => setModalType(null)}
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--accent)] hover:bg-[var(--background)] font-medium transition-colors text-theme"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= SMALL HELPER ================= */
function SystemRow({ label, onClick, danger }) {
  return (
    <div className="flex justify-between items-center p-3 rounded-lg hover:bg-[var(--background)] transition-colors border border-transparent hover:border-[var(--accent)]">
      <p className="font-medium text-theme">{label}</p>
      <button
        onClick={onClick}
        className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${danger
          ? "text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40"
          : "border border-[var(--accent)] hover:bg-[var(--background)] text-theme"
          }`}
      >
        {label}
      </button>
    </div>
  );
}