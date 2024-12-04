"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface multiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}
const MultiText: React.FC<multiTextProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addTag = (item: string) => {
    if (item) {
      onChange(item);
      setInputValue(""); // Di chuyển việc setInputValue ra ngoài render
    }
  };

  return (
    <>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTag(inputValue);
          }
        }}
      />
      <div className="flex flex-wrap gap-3 mt-2">
        {value.map((tag, index) => (
          <div key={index} className="flex justify-between">
            <Badge
              variant="outline"
              className="flex justify-between text-black"
            >
              {tag}
              <Button
                size="sm"
                className="text-black bg-white w-5 h-5 ml-4 hover:bg-red-500 hover:text-white"
                onClick={() => onRemove(tag)}
              >
                X
              </Button>
            </Badge>
          </div>
        ))}
      </div>
    </>
  );
};

export default MultiText;
