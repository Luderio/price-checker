"use client";

import { Input } from "@/components/ui/input";
import { QrCode } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="h-screen flex flex-row justify-center items-center">
        <div className="min-w-full p-32 flex flex-col justify-center items-center gap-10">
          <h1 className="text-5xl font-extralight">
            What&apos;s the price of this?
          </h1>
          <Input type="text" />
          <div className="border rounded-full border-dashed border-gray-700">
            <span className="flex flex-row justify-start items-center gap-2 text-xl p-4 text-gray-700 animate-pulse">
              <QrCode color="#2c2c2c" size={35} />
              or scan the bar or qr code to check the price
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
