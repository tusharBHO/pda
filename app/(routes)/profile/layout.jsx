// // app/(routes)/profile/layout.jsx
"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import AccountSidebar from "./_components/AccountSidebar";

export default function AccountPage({ children }) {
  const [activeTab, setActiveTab] = useState("account");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarClasses = `
    account-sidebar
    fixed md:static top-0 left-0 h-full md:h-auto
    w-64 md:w-1/3 lg:w-1/4
    p-6 z-50
    transform transition-transform duration-300 ease-in-out
    shadow-2xl md:shadow-none
    border-r border-gray-200 dark:border-gray-800
    bg-[var(--secondary)]
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `;

  return (
    <div className="account-layout mt-15 flex justify-center items-start p-4 min-h-screen text-theme transition-colors">
      <div className="relative flex flex-col md:flex-row w-full max-w-5xl rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-[var(--secondary)]">
        
        {/* Mobile Header */}
        <header className="md:hidden flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-theme">Settings</h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md shadow-sm hover:shadow transition-all bg-[var(--background)] border border-gray-200 dark:border-gray-800"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Sidebar */}
        <aside className={sidebarClasses}>
          <AccountSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            closeSidebar={() => setSidebarOpen(false)}
          />
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="account-overlay fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 sm:p-8 md:min-h-[600px] bg-[var(--background)]">
          {children}
        </main>
      </div>
    </div>
  );
}