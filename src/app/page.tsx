"use client";

import { SearchBar } from "@/components/ui/search-bar";
import { Qrcode } from "@/components/ui/icon";

export default function Home() {
  const cities = [
    "New York",
    "London",
    "Paris",
    "Tokyo",
    "Sydney",
    "Rome",
    "Berlin",
    "Madrid",
    "Beijing",
    "Moscow",
    "Cairo",
    "Rio de Janeiro",
    "Dubai",
    "Bangkok",
    "Singapore",
    "Lucky Me Pancit Canton",
    "Mumbai",
    "San Francisco",
    "Chicago",
    "Nescafe 3 in 1",
    "Kopiko Brown 3 in 1",
    "Houston",
    "Philadelphia",
    "Phoenix",
    "San Antonio",
    "San Diego",
    "Dallas",
    "Los Angeles",
    "Toronto",
    "Vancouver",
    "Mexico City",
    "Buenos Aires",
    "Santiago",
    "Lima",
    "Bogota",
    "Caracas",
    "Copenhagen",
    "Amsterdam",
    "Brussels",
    "Vienna",
    "Stockholm",
    "Oslo",
    "Helsinki",
    "Warsaw",
    "Prague",
    "Budapest",
    "Athens",
    "Istanbul",
    "Seoul",
    "Shanghai",
    "Hong Kong",
    "Taipei",
    "Jakarta",
    "Kuala Lumpur",
    "Manila",
    "Hanoi",
    "Ho Chi Minh City",
    "Auckland",
    "Wellington",
    "Johannesburg",
    "Cape Town",
    "Nairobi",
    "Lagos",
    "Accra",
    "Rabat",
    "Algiers",
  ];

  const handleCitySelect = (selectedCity: string): void => {
    console.log("Selected City:", selectedCity);
    // You can do something with the selected city here, e.g., update a form state
  };

  return (
    <>
      <section className="h-screen flex flex-row justify-center items-center">
        <div className="w-full max-w-5xl p-4 flex flex-col justify-center items-center gap-10">
          <h1 className="text-2xl text-center sm:text-4xl lg:text-5xl font-extralight">
            What&apos;s the price of this?
          </h1>
          <SearchBar
            type="text"
            suggestions={cities}
            id="product-price"
            onselect={handleCitySelect}
          />
          <div className="border rounded-full border-dashed border-gray-700">
            <span className="text-xs sm:text-xl flex flex-row justify-start items-center gap-2 p-4 text-gray-700 animate-pulse">
              <Qrcode color="#2c2c2c" size={35} />
              or scan the bar or qr code to check the price
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
