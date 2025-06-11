"use client";

import React, { useEffect } from "react";

export default function ServiceWorkerRegister({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Check if running in a browser and service workers are supported
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Register immediately without waiting for 'load'
      // This is generally safe and allows the SW to start working sooner
      navigator.serviceWorker
        .register("/serviceworker.js") // Path is relative to the domain root
        .then((registration) => {
          console.log(
            "[Service Worker] Registered successfully:",
            registration
          );
          // Optional: Listen for updates (new service worker version)
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === "installed") {
                  if (navigator.serviceWorker.controller) {
                    // New content available! You might want to prompt the user to refresh.
                    console.log("[Service Worker] New content available!");
                    // Example: You could dispatch an event or set state to show a "New version available" banner
                  } else {
                    // Content is cached for offline use.
                    console.log(
                      "[Service Worker] Content is now available offline."
                    );
                  }
                }
              };
            }
          };
        })
        .catch((error) => {
          console.error("[Service Worker] Registration failed:", error);
        });
    } else {
      console.log(
        "[Service Worker] Service Workers not supported or not in browser environment."
      );
    }
  }, []); // Empty dependency array ensures this runs once on mount

  return <>{children}</>;
}
