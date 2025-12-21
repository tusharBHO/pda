// app/(routes)/profile/layout.jsx
"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import AccountSidebar from "./_components/AccountSidebar";

export default function AccountPage({ children }) {
  const [activeTab, setActiveTab] = useState("account");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarClasses = `
    fixed md:static top-0 left-0 h-full md:h-auto w-64 md:w-1/3 lg:w-1/4
    p-6 z-50 transform transition-transform duration-300 ease-in-out
    shadow-xl md:shadow-lg border md:border border-gray-300 md:rounded-xl
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `;

  return (
    <div className="mt-15 flex justify-center items-center p-4 min-h-[80vh] bg-background text-theme transition-colors">
      {/* Outer Container */}
      <div
        className="relative flex flex-col md:flex-row w-full max-w-5xl rounded-2xl shadow-2xl border border-gray-300 overflow-hidden transition-colors"
        style={{ backgroundColor: "var(--secondary)" }}
      >
        {/* Mobile Header */}
        <header
          className="md:hidden flex justify-between items-center p-4 border-b transition-colors"
          style={{ borderColor: "var(--accent)", backgroundColor: "var(--secondary)" }}
        >
          <h2 className="text-lg font-semibold text-theme">Account Settings</h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md shadow hover:shadow-md transition-all"
            style={{ backgroundColor: "var(--background)" }}
          >
            {sidebarOpen ? <X className="w-5 h-5 text-theme" /> : <Menu className="w-5 h-5 text-theme" />}
          </button>
        </header>

        {/* Sidebar */}
        <aside
          className={sidebarClasses}
          style={{ backgroundColor: "var(--secondary)" }}
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
            className="fixed inset-0 z-40 md:hidden backdrop-blur-sm transition-opacity"
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          />
        )}

        {/* Main Content */}
        <main
          className="flex-1 p-6 my-2 sm:p-8 overflow-y-auto transition-all min-h-[70.5vh] rounded-r-2xl md:rounded-none "
          style={{ backgroundColor: "var(--secondary)"}}
        >
          {children}
        </main>
      </div>
    </div>
  );
}