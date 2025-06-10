import HomePageContextProvider from "./context/homepage-context/homepage-context";
import SearchBarComponent from "@/components/homepage-components/SearchBarComponent";
import { Qrcode } from "@/components/ui/icon";

export default function Home() {
  return (
    <section className="h-screen flex flex-row justify-center items-center">
      <div className="w-full max-w-5xl p-4 flex flex-col justify-center items-center gap-10">
        <h1 className="text-2xl text-center sm:text-4xl lg:text-5xl font-extralight">
          What&apos;s the price of this?
        </h1>
        <HomePageContextProvider>
          <SearchBarComponent />
        </HomePageContextProvider>
        <div className="border rounded-full border-dashed border-gray-700">
          <span className="text-xs sm:text-xl flex flex-row justify-start items-center gap-2 p-4 text-gray-700 animate-pulse">
            <Qrcode color="#2c2c2c" size={35} />
            or scan the bar or qr code to check the price
          </span>
        </div>
      </div>
    </section>
  );
}
