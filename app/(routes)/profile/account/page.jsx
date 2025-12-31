// app/(routes)/profile/account/page.jsx
"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

export default function AccountDetails() {
  const { user } = useUser();
  const { signOut } = useClerk();

  const [name, setName] = useState(user?.fullName || "");
  const [isEditingName, setIsEditingName] = useState(false);
  const [modalType, setModalType] = useState(null);

  // ✅ Ref to prevent duplicate toast
  const hasShownToast = useRef(false);

  // ✅ Show toast once after user is loaded
  useEffect(() => {
    if (user && !hasShownToast.current) {
      toast.success("Account details loaded");
      hasShownToast.current = true;
    }
  }, [user]);

  /* ================= NAME CHANGE ================= */
  const handleNameChange = async () => {
    if (!name.trim()) {
      toast.warning("Name cannot be empty");
      return;
    }

    const id = toast.loading("Updating name...");
    try {
      await user.update({
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1] || "",
      });
      toast.success("Name updated successfully", { id });
      setIsEditingName(false);
    } catch {
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
      if (modalType === "signOut") {
        await signOut();
      }
      if (modalType === "signOutAll") {
        await signOut({ session: "all" });
      }
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
    <div className="max-w-2xl w-full page-enter space-y-6">
      {/* ================= ACCOUNT DETAILS ================= */}
      <div
        className="rounded-xl shadow-md p-4 space-y-4 transition-colors"
        style={{
          backgroundColor: "var(--secondary)",
          border: "1px solid var(--accent)",
        }}
      >
        <h2 className="text-lg font-semibold text-theme">Account Details</h2>
        <hr className="border-theme/30" />

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <img
            src={user?.imageUrl}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover shadow-md"
          />

          <div className="flex-1 space-y-2 text-center sm:text-left">
            <p className="text-xl font-medium text-theme">{user?.fullName}</p>
            <p className="text-theme/70 break-words">
              {user?.primaryEmailAddress?.emailAddress}
            </p>

            {/* Change Avatar */}
            <label
              className="inline-block mt-2 px-3 py-1.5 rounded-md border cursor-pointer
                         transition-all hover:scale-105 btn-theme"
              style={{ borderColor: "var(--accent)" }}
            >
              Change avatar
              <input type="file" className="hidden" onChange={handleAvatarChange} />
            </label>

            {/* ================= NAME EDIT ================= */}
            <div className="mt-4">
              <p className="text-sm text-theme/70">Full Name</p>

              {isEditingName ? (
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 rounded-md border text-sm"
                    style={{
                      borderColor: "var(--accent)",
                      backgroundColor: "var(--background)",
                      color: "var(--text-color)",
                    }}
                  />

                  <button
                    onClick={handleNameChange}
                    className="px-3 py-1 rounded-md btn-theme"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => {
                      setIsEditingName(false);
                      setName(user?.fullName || "");
                      toast("Edit cancelled");
                    }}
                    className="px-3 py-1 rounded-md border btn-theme"
                    style={{ borderColor: "var(--accent)" }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsEditingName(true);
                    toast.info("You can now edit your name");
                  }}
                  className="mt-2 px-3 py-1 rounded-md border btn-theme"
                  style={{ borderColor: "var(--accent)" }}
                >
                  Change full name
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= SYSTEM ================= */}
      <div
        className="rounded-xl shadow-md p-4 space-y-4 transition-colors"
        style={{
          backgroundColor: "var(--secondary)",
          border: "1px solid var(--accent)",
        }}
      >
        <h2 className="text-lg font-semibold text-theme">System</h2>
        <hr className="border-theme/30" />

        <SystemRow
          label="Sign out"
          onClick={() => {
            setModalType("signOut");
            toast.warning("You are about to sign out");
          }}
        />

        <SystemRow
          label="Sign out of all sessions"
          onClick={() => {
            setModalType("signOutAll");
            toast.warning("Signing out from all sessions");
          }}
        />

        <SystemRow
          label="Delete account"
          danger
          onClick={() => {
            setModalType("delete");
            toast.error("This action is permanent");
          }}
        />
      </div>

      {/* ================= CONFIRM MODAL ================= */}
      {modalType && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center
                     bg-black/50 backdrop-blur-sm"
          onClick={() => setModalType(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="rounded-xl shadow-xl p-6 w-80 text-center
                       transition-transform scale-100"
            style={{
              backgroundColor: "var(--secondary)",
              border: "1px solid var(--accent)",
            }}
          >
            <h2 className="text-lg font-semibold text-theme mb-2">
              Confirm action
            </h2>

            <p className="text-theme/70 text-sm mb-4">
              Are you sure you want to continue?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 rounded-md border btn-theme"
                style={{ borderColor: "var(--accent)" }}
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded-md btn-theme-logout"
              >
                Confirm
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
    <div className="flex justify-between items-center">
      <p className="text-theme">{label}</p>
      <button
        onClick={onClick}
        className={`px-3 py-1 rounded-md border transition-colors
          ${danger ? "btn-theme-logout" : "btn-theme"}`}
      >
        {label}
      </button>
    </div>
  );
}