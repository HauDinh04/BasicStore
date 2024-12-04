"use client";
import React, { useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface multiSelectProps {
  placeholder: string;
  categories: CategoryType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}
const MultiSelect: React.FC<multiSelectProps> = ({
  placeholder,
  value,
  categories,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  let selected: CategoryType[];
  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      categories.find((category) => category._id === id)
    ) as CategoryType[];
  }
  const selectTable = categories.filter((item) => !selected.includes(item));
  return (
    <>
      <Command className="overflow-visible">
        <div className="flex gap-1 flex-wrap ">
          {selected.map((item) => (
            <Badge
              key={item._id}
              variant="outline"
              className="flex justify-between text-black"
            >
              {item.title}
              <Button
                size="sm"
                className="text-black bg-white w-5 h-5 ml-4 hover:bg-red-500 hover:text-white"
                onClick={() => onRemove(item._id)}
              >
                X
              </Button>
            </Badge>
          ))}

          <CommandInput
            value={inputValue}
            onValueChange={setInputValue}
            placeholder={placeholder}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
          />
        </div>
        <div className=" relative mt-2">
          {open && (
            <CommandGroup className="absolute w-full top-0 z-10 overflow-auto shadow-md bg-white">
              <CommandList>
                {selectTable.map((item) => (
                  <CommandItem
                    key={item._id}
                    onMouseDown={(e) => e.preventDefault()}
                    onSelect={() => {
                      if (!value.includes(item._id)) {
                        onChange(item._id);
                        setInputValue("");
                      }
                    }}
                    className="cursor-pointer"
                  >
                    {item.title}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          )}
        </div>
      </Command>
    </>
  );
};

export default MultiSelect;
