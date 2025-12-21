"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function LoginToastListener() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.Clerk) return;

    // 🔐 Listen to real auth events
    const unsubscribe = window.Clerk.addListener((event) => {
      if (event?.type === "auth:signIn") {
        toast.success("Logged in successfully 👋");
      }

      if (event?.type === "auth:signOut") {
        toast.info("Logged out successfully");
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return null;
}