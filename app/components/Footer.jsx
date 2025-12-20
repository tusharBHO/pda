// Theme-Updated
import React from "react";

const Footer = () => {
  return (
    <footer
      className="rounded-lg flex items-center justify-center mt-10"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="w-full py-5 flex justify-center">
        {/* Text color now comes from global CSS */}
        <span className="text-sm text-center">
          © 2025{" "}
          <a href="" className="hover:underline">
            Bharat Pashudhan™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;