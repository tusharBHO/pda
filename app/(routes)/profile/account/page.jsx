"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useState } from "react";

export default function AccountDetails() {
    const { user } = useUser();
    const { signOut } = useClerk();
    const [name, setName] = useState(user?.fullName || "");
    const [isEditingName, setIsEditingName] = useState(false);

    // Modal states
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
            <div className="bg-white shadow-md rounded-xl p-4 space-y-2">
                <div className="text-lg font-semibold ">Account Details</div>
                <hr className="border-gray-300 mb-4" />

                <div className="flex flex-col items-center text-center space-y-4 sm:flex-row sm:items-center sm:text-left sm:space-y-0 sm:space-x-4">
                    <img
                        src={user?.imageUrl}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover"
                    />

                    <div className="flex-1">
                        <p className="font-medium text-xl">{user?.fullName}</p>
                        <p className="text-gray-500 break-words">
                            {user?.primaryEmailAddress?.emailAddress}
                        </p>

                        <label className="px-3 py-1.5 border text-sm rounded-md cursor-pointer hover:bg-gray-100 mt-2 inline-block">
                            Change avatar
                            <input type="file" className="hidden" onChange={handleAvatarChange} />
                        </label>

                        {/* Name edit */}
                        <div className="mt-4 w-full">
                            <p className="text-sm text-gray-500">Full Name</p>
                            {isEditingName ? (
                                <div className="flex flex-col sm:flex-row items-center mt-2 space-y-2 sm:space-y-0 sm:space-x-2">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="border border-gray-300 rounded-md p-1.5 text-sm w-full sm:w-auto"
                                    />
                                    <button
                                        onClick={handleNameChange}
                                        className="px-3 py-1 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-700"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setIsEditingName(false)}
                                        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2">
                                    <p>{user?.fullName}</p>
                                    <button
                                        onClick={() => setIsEditingName(true)}
                                        className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 mt-2 sm:mt-0"
                                    >
                                        Change full name
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Email */}
                        <div className="mt-4 w-full">
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="mt-1 break-words">
                                {user?.primaryEmailAddress?.emailAddress}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* System Box */}
            <div className="bg-white shadow-md rounded-xl p-4 space-y-4 text-left">
                <h2 className="text-lg font-semibold mb-2">System</h2>
                <hr className="border-gray-300 mb-4" />

                <p>
                    You are signed in as{" "}
                    <span className="font-medium">
                        {user?.primaryEmailAddress?.emailAddress}
                    </span>
                </p>

                <div className="flex justify-between items-center">
                    <p>Sign out</p>
                    <button
                        onClick={() => setModalType("signOut")}
                        className="px-3 py-1 border rounded-md hover:bg-gray-100"
                    >
                        Sign out
                    </button>
                </div>

                <div className="flex justify-between items-center">
                    <p>Sign out of all sessions</p>
                    <button
                        onClick={() => setModalType("signOutAll")}
                        className="px-3 py-1 border rounded-md hover:bg-gray-100"
                    >
                        Sign out all
                    </button>
                </div>

                <div className="flex justify-between items-center">
                    <div>
                        <p>Delete account</p>
                        <p className="text-xs text-gray-500">
                            Permanently delete your account and data
                        </p>
                    </div>
                    <button
                        onClick={() => setModalType("delete")}
                        className="px-3 py-1 border border-red-400 text-red-500 rounded-md hover:bg-red-50"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* Confirmation Modal */}
            {modalType && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-80 text-center">
                        <h2 className="text-lg font-semibold mb-2">
                            {modalType === "delete"
                                ? "Delete Account?"
                                : modalType === "signOutAll"
                                    ? "Sign out of all sessions?"
                                    : "Sign out?"}
                        </h2>
                        <p className="text-gray-600 text-sm mb-4">
                            {modalType === "delete"
                                ? "This action is permanent and cannot be undone."
                                : "Are you sure you want to continue?"}
                        </p>
                        <div className="flex justify-center space-x-3">
                            <button
                                onClick={() => setModalType(null)}
                                className="px-4 py-2 rounded-md border hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className={`px-4 py-2 rounded-md text-white ${modalType === "delete"
                                    ? "bg-red-500 hover:bg-red-600"
                                    : "bg-blue-600 hover:bg-blue-700"
                                    }`}
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
