"use client";

import { useEffect } from "react";

const Serviceworker = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
          navigator.serviceWorker
            .register("/src/app/serviceworker.js")
            .then((response) =>
              console.log({
                result: "service worker registered",
                response: response,
              })
            )
            .catch((err) => console.log("service worker not registered", err));
        });
      }
    }
  }, []);

  return <>{children}</>;
};

export default Serviceworker;
