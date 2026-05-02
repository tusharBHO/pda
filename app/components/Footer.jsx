// app/components/Footer.jsx
import React from "react";
import Link from "next/link";

const Footer = () => {
  // Automatically updates the year so you don't have to change it manually
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-theme bg-[var(--background)] transition-theme">
      <div className="w-full max-w-7xl mx-auto py-2 sm:py-6 px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-1 sm:gap-4">

        {/* Left Side: Copyright */}
        <span className="text-sm text-theme opacity-80 text-center md:text-left">
          © {currentYear}{" "}
          <Link href="/" className="font-semibold hover:underline transition-all hover:text-[var(--primary)]">
            Pashugyan™
          </Link>
          . All Rights Reserved.
        </span>

        {/* Right Side: Quick Links */}
        <div className="flex items-center gap-6 text-sm text-theme opacity-80">
          <Link href="/terms" className="hover:underline hover:text-[var(--primary)] transition-colors">
            Terms & Conditions
          </Link>
          <Link href="/how-it-works" className="hover:underline hover:text-[var(--primary)] transition-colors">
            Privacy Policy
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;