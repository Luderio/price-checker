"use client";

import { ChangeEvent, forwardRef, useState } from "react";

import { cn } from "@/lib/utils";
import SearchIcon from "@/components/ui/SearchIcon";

const Input = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const [input, setInput] = useState("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInput((event.target as HTMLInputElement).value);
    };

    console.log(input); // remove this later

    return (
      <>
        <span className="flex flex-row min-w-full relative">
          <SearchIcon
            size={35}
            color="#494b48"
            className="absolute bottom-6 left-5"
            strokeWidth={1}
          />
          <input
            type={type}
            className={cn(
              "flex h-9 w-full rounded-full border border-input bg-transparent px-20 py-10 text-base shadow-lg transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-2xl hover:outline",
              className
            )}
            ref={ref}
            {...props}
            onChange={handleInputChange}
          />
        </span>
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
