"use client";
import { X } from "lucide-react";
import Sidebar from "./Sidebar";

const SidebarDrawer = ({
  isOpen,
  onClose,
  ...props
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 h-full w-80 bg-secondary shadow-xl transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold">Filters</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="p-4 overflow-y-auto h-full">
          <Sidebar {...props} />
        </div>
      </div>
    </div>
  );
};

export default SidebarDrawer;