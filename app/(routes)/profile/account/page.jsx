// Theme-Update
"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useState } from "react";

export default function AccountDetails() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [name, setName] = useState(user?.fullName || "");
  const [isEditingName, setIsEditingName] = useState(false);

  const [modalType, setModalType] = useState(null); // "signOut", "signOutAll", "delete"

  const handleNameChange = async () => {
    if (!name.trim()) return;
    await user.update({
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1] || "",
    });
    setIsEditingName(false);
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) await user.setProfileImage({ file });
  };

  const handleConfirm = async () => {
    if (modalType === "signOut") {
      await signOut();
    } else if (modalType === "signOutAll") {
      await signOut({ session: "all" });
    } else if (modalType === "delete") {
      await user.delete();
      await signOut({ redirectUrl: "/" });
    }
    setModalType(null);
  };

  return (
    <div className="max-w-2xl w-full space-y-6">

      {/* Account Box */}
      <div
        className="rounded-xl shadow-md p-2 space-y-2 transition-colors duration-300"
        style={{ backgroundColor: "var(--secondary)", border: "1px solid var(--accent)" }}
      >
        <div className="text-lg font-semibold text-theme">Account Details</div>
        <hr className="border-theme/30 mb-4" />

        <div className="flex flex-col items-center text-center space-y-4 sm:flex-row sm:items-center sm:text-left sm:space-y-0 sm:space-x-4">
          <img
            src={user?.imageUrl}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover shadow-md"
          />

          <div className="flex-1">
            <p className="font-medium text-xl text-theme">{user?.fullName}</p>
            <p className="text-theme/70 break-words">
              {user?.primaryEmailAddress?.emailAddress}
            </p>

            <label
              className="px-3 py-1.5 border rounded-md cursor-pointer hover:bg-theme/10 mt-2 inline-block transition-colors"
              style={{ borderColor: "var(--accent)" }}
            >
              Change avatar
              <input type="file" className="hidden" onChange={handleAvatarChange} />
            </label>

            {/* Name Edit */}
            <div className="mt-4 w-full">
              <p className="text-sm text-theme/70">Full Name</p>
              {isEditingName ? (
                <div className="flex flex-col sm:flex-row items-center mt-2 space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded-md p-1.5 text-sm w-full sm:w-auto transition-colors"
                    style={{ borderColor: "var(--accent)", backgroundColor: "var(--background)", color: "var(--text-color)" }}
                  />
                  <button
                    onClick={handleNameChange}
                    className="px-3 py-1 text-sm rounded-md transition-colors"
                    style={{ backgroundColor: "var(--primary)", color: "var(--background)" }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingName(false)}
                    className="px-3 py-1 text-sm rounded-md hover:bg-theme/10 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2">
                  <p className="text-theme">{user?.fullName}</p>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="px-3 py-1 text-sm border rounded-md hover:bg-theme/10 transition-colors"
                    style={{ borderColor: "var(--accent)" }}
                  >
                    Change full name
                  </button>
                </div>
              )}
            </div>

            {/* Email */}
            <div className="mt-4 w-full">
              <p className="text-sm text-theme/70">Email</p>
              <p className="mt-1 break-words text-theme">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Box */}
      <div
        className="rounded-xl shadow-md p-4 space-y-4 transition-colors duration-300"
        style={{ backgroundColor: "var(--secondary)", border: "1px solid var(--accent)" }}
      >
        <h2 className="text-lg font-semibold text-theme mb-2">System</h2>
        <hr className="border-theme/30 mb-4" />

        <p className="text-theme">
          You are signed in as{" "}
          <span className="font-medium">{user?.primaryEmailAddress?.emailAddress}</span>
        </p>

        <div className="flex justify-between items-center">
          <p className="text-theme">Sign out</p>
          <button
            onClick={() => setModalType("signOut")}
            className="px-3 py-1 rounded-md border hover:bg-theme/10 transition-colors"
            style={{ borderColor: "var(--accent)" }}
          >
            Sign out
          </button>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-theme">Sign out of all sessions</p>
          <button
            onClick={() => setModalType("signOutAll")}
            className="px-3 py-1 rounded-md border hover:bg-theme/10 transition-colors"
            style={{ borderColor: "var(--accent)" }}
          >
            Sign out all
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-theme">Delete account</p>
            <p className="text-xs text-theme/70">Permanently delete your account and data</p>
          </div>
          <button
            onClick={() => setModalType("delete")}
            className="px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
            style={{ borderColor: "var(--accent)", color: "var(--red, #ef4444)" }}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {modalType && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <div
            className="rounded-xl shadow-xl p-6 w-80 text-center transition-colors duration-300"
            style={{ backgroundColor: "var(--secondary)", border: "1px solid var(--accent)" }}
          >
            <h2 className="text-lg font-semibold mb-2 text-theme">
              {modalType === "delete"
                ? "Delete Account?"
                : modalType === "signOutAll"
                ? "Sign out of all sessions?"
                : "Sign out?"}
            </h2>
            <p className="text-theme/70 text-sm mb-4">
              {modalType === "delete"
                ? "This action is permanent and cannot be undone."
                : "Are you sure you want to continue?"}
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 rounded-md border hover:bg-theme/10 transition-colors"
                style={{ borderColor: "var(--accent)", color: "var(--text-color)" }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className={`px-4 py-2 rounded-md text-white transition-colors ${
                  modalType === "delete"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-primary hover:bg-primary/90"
                }`}
                style={{ backgroundColor: modalType === "delete" ? "#ef4444" : "var(--primary)" }}
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