import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const defaultUser = {
  _id: "69e0a64b14a2aee43567f711",
  email: "tes4t@example.com",
  name: "password123",
};
