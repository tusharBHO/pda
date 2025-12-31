// app/(routes)/profile/_components/AccountSidebar.jsx
"use client";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AccountSidebar({
  activeTab,
  setActiveTab,
  closeSidebar,
}) {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    { name: "Account", key: "account", path: "/profile/account" },
    { name: "Contact", key: "contact", path: "/profile/contact" },
  ];

  const handleBack = () => {
    // Go to previous page
    router.back();
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Back & Close buttons */}
      <div className="flex items-center justify-between md:justify-start ">
        <button
          onClick={handleBack}
          className="
    flex items-center text-sm btn-theme p-2
    border border-transparent
    hover:border-border-theme
    rounded-md
    transition-all duration-200 ease-in-out
  "
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>

        <button onClick={closeSidebar} className="md:hidden p-1 ">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col space-y-3 md:space-y-2">
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
              className={`block py-2 px-3 rounded-md font-medium text-sm transition btn-theme ${
                isActive ? "opacity-90 border" : "opacity-70  hover:opacity-100"
              }`}
            >
              {name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}