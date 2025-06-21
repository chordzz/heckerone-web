import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getAuthStatus(): boolean {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const value = localStorage.getItem("heckerOneUserLoggedIn");
    return value === "true";
  }
  return false;
}

export function getToken(): string | null {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    return localStorage.getItem("heckerOneToken");
  }
  return null;
}