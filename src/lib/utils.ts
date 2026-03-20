import clsx, { type ClassValue } from "clsx";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.anikitty.com";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function absoluteUrl(path = "") {
  const base = SITE_URL.replace(/\/$/, "");
  if (!path) {
    return base;
  }

  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function isTodoValue(value: string) {
  return /TODO/i.test(value);
}

export function isMailtoLink(url: string) {
  return url.startsWith("mailto:");
}

export function purchaseLabel(url: string) {
  if (isMailtoLink(url)) {
    return "Request purchase link";
  }

  return "Buy externally";
}
