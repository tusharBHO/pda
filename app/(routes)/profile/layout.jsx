"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import AccountSidebar from "./_components/AccountSidebar";

export default function AccountPage({ children }) {
    const [activeTab, setActiveTab] = useState("account");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="mt-2 flex justify-center items-center  bg-gray-100 text-gray-800 p-4 min-h-[80vh]">
            {/* Outer Container */}
            <div className="relative flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-2xl min-h-[87.5vh] mt-12 shadow-xl overflow-hidden">

                {/* Mobile Header */}
                <header className="md:hidden flex justify-between items-center p-4 border-b bg-white ">
                    <h2 className="text-lg font-semibold">Account Settings</h2>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                    >
                        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </header>

                {/* Sidebar */}
                <aside
                    className={`fixed md:static top-0 left-0 h-full md:h-auto bg-white md:bg-transparent shadow-lg md:shadow-none w-64 md:w-1/3 lg:w-1/4 p-6 z-50 transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 border-r border-gray-200`}
                >
                    <AccountSidebar
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        closeSidebar={() => setSidebarOpen(false)}
                    />
                </aside>

                {/* Overlay for Mobile */}
                {sidebarOpen && (
                    <div
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
                    />
                )}

                {/* Main Content */}
                <main className="flex-1 p-6 my-2 sm:p-8 bg-gray-50 md:bg-white overflow-y-auto border-l border-gray-200 md:border-none md:rounded-r-2xl transition-all min-h-[70.5vh]">
                    {children}
                </main>
            </div>
        </div>
    );
}
