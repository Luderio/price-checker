import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegister from "./ServiceWorkerRegister";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "What's the price of this?",
  description: "This app tells you the price of the items in Sanchez's Store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ServiceWorkerRegister>
        <body className={`${poppins.className} antialiased`}>{children}</body>
      </ServiceWorkerRegister>
    </html>
  );
}
