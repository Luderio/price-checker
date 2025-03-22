import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NextJS 15 App",
    short_name: "NextJS15",
    description: "This application is an app for Next JS 15 tutorial",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/src/app/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/src/app/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/src/app/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
