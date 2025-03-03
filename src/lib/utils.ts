import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { toBlob, toPng } from "html-to-image";

export async function convertHtmlToPng(
  targetElement: HTMLElement,
  countReRender: number = 0,
  timeout: number = 1,
  exportSettings: any
): Promise<string> {
  const png = await toPng(targetElement, exportSettings);
  await new Promise((resolve) => setTimeout(resolve, timeout)); // ← time to render

  if (countReRender > 0) {
    // ↓ Let's try to redo it recursively N times
    return convertHtmlToPng(
      targetElement,
      countReRender - 1,
      timeout,
      exportSettings
    );
  }
  return png;
}

export async function convertHtmlToBlob(
  targetElement: HTMLElement,
  countReRender: number = 0,
  timeout: number = 1,
  exportSettings: any
): Promise<Blob | null> {
  const blob = await toBlob(targetElement, exportSettings);
  await new Promise((resolve) => setTimeout(resolve, timeout)); // ← time to render

  if (countReRender > 0) {
    // ↓ Let's try to redo it recursively N times
    return convertHtmlToBlob(
      targetElement,
      countReRender - 1,
      timeout,
      exportSettings
    );
  }
  return blob;
}

export function isSafariOrIos() {
  if (typeof navigator === "undefined") return false; // Ensure it's running in a browser

  const userAgent = navigator.userAgent.toLowerCase();
  return (
    (/safari/.test(userAgent) && !/chrome/.test(userAgent)) ||
    /iphone|ipad|ipod/.test(userAgent)
  );
}
