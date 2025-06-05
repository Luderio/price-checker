"use client";

import React, { createContext, useContext, ReactNode } from "react";

export type handleSelectedProductType = {
  (product_name: string): void;
};

interface HomePageContextInterface {
  products: string[];
  handleSelectedProduct: handleSelectedProductType;
}

const HomePageContext = createContext<Partial<HomePageContextInterface>>({});

const products = [
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

export const HomePageContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const handleSelectedProduct: handleSelectedProductType = (product_name) => {
    console.log("Selected Product is: ", product_name);
  };

  return (
    <HomePageContext.Provider value={{ products, handleSelectedProduct }}>
      {children}
    </HomePageContext.Provider>
  );
};

export const useHomePageContext = () => {
  const context = useContext(HomePageContext);
  if (!context) {
    throw new Error(
      "useHomePageContext must be used within a HomePageContextProvider's children components"
    );
  }
  return context;
};
