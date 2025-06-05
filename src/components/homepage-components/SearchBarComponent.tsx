"use client";

import { useHomePageContext } from "@/app/context/homepage-context/homepage-context";
import SearchBar from "@/components/ui/search-bar";

export default function SearchBarComponent() {
  const { products, handleSelectedProduct } = useHomePageContext();

  return (
    <>
      <SearchBar
        type="text"
        suggestions={products}
        id="product-price"
        onselect={handleSelectedProduct}
      />
    </>
  );
}

SearchBarComponent.displayName = "SearchBarComponent";
