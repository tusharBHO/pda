// // app/(routes)/profile/_components/AccountSidebar.jsx
"use client";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountSidebar({
  activeTab,
  setActiveTab,
  closeSidebar,
}) {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    { name: "Account", key: "account", path: "/profile/account" },
    { name: "Preferences", key: "preferences", path: "/profile/preferences" },
    { name: "Contact", key: "contact", path: "/profile/contact" },
  ];

  // Sync active tab with current URL path on load
  useEffect(() => {
    const currentTab = tabs.find(tab => pathname.includes(tab.path));
    if (currentTab) setActiveTab(currentTab.key);
  }, [pathname]);

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex items-center justify-between md:justify-start">
        <button
          onClick={() => router.back()}
          className="flex items-center text-sm font-medium p-2 -ml-2 rounded-md hover:bg-[var(--background)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>
        <button onClick={closeSidebar} className="md:hidden p-1">
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex flex-col space-y-2">
        {tabs.map(({ name, key, path }) => {
          const isActive = activeTab === key;
          return (
            <Link
              key={key}
              href={path}
              onClick={() => {
                setActiveTab(key);
                closeSidebar();
              }}
              className={`block py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                isActive 
                  ? "bg-[var(--accent)] text-[var(--primary)] shadow-sm border border-[var(--accent)]" 
                  : "hover:bg-[var(--background)] opacity-70 hover:opacity-100"
              }`}
            >
              {name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}