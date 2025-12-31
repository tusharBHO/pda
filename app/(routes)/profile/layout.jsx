// app/(routes)/profile/layout.jsx
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
    shadow-xl md:shadow-lg
    border md:border border-gray-300
    md:rounded-xl
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `;

  return (
    <div className="account-layout mt-15 flex justify-center items-center p-4 min-h-[80vh] text-theme transition-colors">
      {/* Outer Container */}
      <div className="relative flex flex-col md:flex-row w-full max-w-5xl rounded-2xl shadow-2xl border border-gray-300 overflow-hidden bg-[var(--secondary)]">
        
        {/* Mobile Header */}
        <header className="md:hidden flex justify-between items-center p-4 ">
          <h2 className="text-lg font-semibold">Account Settings</h2>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md shadow hover:shadow-md transition-all bg-[var(--background)]"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
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
            className="account-overlay fixed inset-0 z-40 md:hidden"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto min-h-[70.5vh] bg-[var(--secondary)]">
          {children}
        </main>
      </div>
    </div>
  );
}