// Theme-Update
"use client";
import Link from "next/link";

export default function ProfileCard({ user, signOut, profileOpen, setProfileOpen }) {
    if (!profileOpen) return null;

    return (
        <>
            {/* backdrop for click outside */}
            <div
                className="fixed inset-0 bg-transparent z-[9998]"
                onClick={() => setProfileOpen(false)}
            ></div>


            {/* actual card */}
            <div
                id="profile-card"
                className="fixed right-4 top-16 w-80 bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 ease-out z-[9999]"
            >
                {/* Header */}
                <div className="relative h-24 bg-gradient-to-r from-green-500 to-green-700">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeyOrtvFtfc6bikgiU6R5hXrqD274Ly_ripw&s"
                        alt="background"
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 flex gap-4 items-center justify-center text-white">
                        <img
                            src={user.imageUrl}
                            alt="Profile"
                            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md mb-1"
                        />
                        <h2 className="font-semibold text-xl">{user.fullName || "User"}</h2>
                    </div>
                </div>

                {/* Info Section */}
                <div className="py-3 text-center">
                    <p className="text-gray-600 text-sm break-words">
                        {user.primaryEmailAddress?.emailAddress || "No email available"}
                    </p>

                    {/* Buttons */}
                    <div className="mt-4 flex flex-col items-center space-y-3">
                        <Link
                            href="/profile/account"
                            onClick={() => setProfileOpen(false)}
                            className="cursor-pointer w-3/4 bg-blue-50 text-black hover:text-green-600 font-medium text-sm py-2 rounded-lg hover:bg-blue-100 transition"
                        >
                            Account
                        </Link>

                    </div>

                    <hr className="my-4" />

                    <button
                        onClick={() => {
                            setProfileOpen(false);
                            signOut({ redirectUrl: "/" });
                        }}
                        className="cursor-pointer w-3/4 mx-auto bg-red-50 text-red-600 hover:bg-red-100 font-medium py-2 rounded-lg transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}