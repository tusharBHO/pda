// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/" },
        { name: "BreedDetection", href: "/BreedDetection" },
        { name: "Database", href: "/Database" },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full border-b bg-white z-50">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full"><img src="/logo07.png" alt="" /></div>
                    <span className="font-semibold text-lg text-black">
                        Bharat Pashudhan
                    </span>
                </div>

                <div className="flex items-center space-x-8">
                    {/* Nav Links */}
                    <div className="flex space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-sm font-medium transition-colors hover:text-blue-600 ${pathname === item.href ? "text-blue-600" : "text-gray-700"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <UserButton afterSignOutUrl="/" />
                </div>

            </div>
        </nav>
    );
};

export default Navbar;