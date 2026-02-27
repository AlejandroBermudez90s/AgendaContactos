"use client";
import { useState } from "react";

const PASSWORD = process.env.NEXT_PUBLIC_APP_PASSWORD!;
const STORAGE_KEY = "app_auth";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  });

  const login = (password: string): boolean => {
    if (password === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthenticated(false);
  };

  return { authenticated, login, logout };
}