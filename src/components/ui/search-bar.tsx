"use client";

import { ChangeEvent, useRef, useState, useEffect, useCallback } from "react";
import { handleSelectedProductType } from "@/app/context/homepage-context/homepage-context";

import { cn } from "@/lib/utils";
import { SearchIcon } from "./icon";

interface SearchBarProps extends React.ComponentProps<"input"> {
  type?: string;
  className?: string;
  id: string;
  suggestions?: string[];
  onselect?: handleSelectedProductType;
}

const SearchBar = ({
  type,
  className,
  id,
  suggestions,
  placeholder = "Search for product price",
  onselect,
  ref,
  ...props
}: SearchBarProps) => {
  const [input, setInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Effect to filter suggestions based on input value
  useEffect(() => {
    if (input) {
      const filtered =
        suggestions?.filter((suggestion: string) =>
          suggestion.toLowerCase().includes(input.toLowerCase())
        ) ?? []; // Returns an empty array if suggestions prop has no data.
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0); // Only show if there are matching suggestions
      setActiveSuggestionIndex(-1); // Reset active selection when input changes
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [input, suggestions]);

  // Effect to handle clicks outside the component to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to select a suggestion
  interface SelectSuggestionCallback {
    (suggestion: string): void;
  }

  const selectSuggestion: SelectSuggestionCallback = useCallback(
    (suggestion) => {
      setInput(suggestion);
      setShowSuggestions(false);
      if (onselect) {
        onselect(suggestion); // Call the provided onselect callback
      }
    },
    [onselect]
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput((event.target as HTMLInputElement).value);
  };

  // Handle keyboard navigation (Arrow Up/Down, Enter, Escape)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault(); // Prevent cursor movement
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault(); // Prevent cursor movement
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredSuggestions.length - 1
      );
    } else if (event.key === "Enter") {
      if (
        activeSuggestionIndex !== -1 &&
        filteredSuggestions[activeSuggestionIndex]
      ) {
        selectSuggestion(filteredSuggestions[activeSuggestionIndex]);
      } else {
        // If Enter is pressed without an active suggestion, but there's input,
        setShowSuggestions(false); // Close dropdown if no active suggestion

        // Still pass the input value to input state and possibly pass the value to the onselect callback prop.
        setInput((event.target as HTMLInputElement).value);
        if (onselect) {
          onselect(input); // Call the provided onselect callback
        }
      }
    } else if (event.key === "Escape") {
      setShowSuggestions(false); // Closes the drop down list when the Esc key is pressed.
    }
  };

  return (
    <>
      <section className="min-w-full relative" ref={wrapperRef}>
        <span className="flex flex-row min-w-full relative">
          <SearchIcon
            size={35}
            color="#494b48"
            className="absolute z-30 bottom-6 left-5"
            strokeWidth={1}
          />
          {/** Label tag is visually hidden but semantically visible. For screeen readers only*/}
          <label htmlFor={id} className="sr-only">
            Search for product price
          </label>
          <input
            type={type}
            value={input}
            id={id}
            role="datalist"
            placeholder={placeholder}
            className={cn(
              "z-20 flex h-9 w-full rounded-full border border-input bg-white px-20 py-10 text-base shadow-lg transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:shadow-none disabled:cursor-not-allowed disabled:opacity-50 md:text-2xl hover:outline",
              className
            )}
            ref={ref}
            {...props}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              // Show suggestions when input is focused and there's content or initial suggestions
              if (input || (suggestions?.length ?? 0) > 0) {
                setShowSuggestions(filteredSuggestions.length > 0);
              }
            }}
            aria-autocomplete="list"
            aria-controls="product-price-list"
            autoComplete="off"
            autoFocus
          />
        </span>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul
            id={id}
            role="listbox"
            className="absolute top-10 z-10 w-full pt-14 bg-white border border-gray-200 rounded-b-3xl shadow-lg mt-1 max-h-60 overflow-y-auto no-scrollbar"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                role="option"
                aria-selected={index === activeSuggestionIndex}
                onClick={() => selectSuggestion(suggestion)}
                className={`
                px-4 py-2 cursor-pointer hover:bg-gray-200
                ${index === activeSuggestionIndex ? "bg-blue-100" : ""}
              `}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

SearchBar.displayName = "SearchBar";

export default SearchBar;
