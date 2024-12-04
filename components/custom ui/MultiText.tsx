import React, { useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string[]) => void; 
}

const MultiText: React.FC<MultiTextProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState("");
  const handleAdd = () => {
    if (inputValue.trim() && !value.includes(inputValue)) {
      onChange([...value, inputValue.trim()]);
      setInputValue("");
    }
  };
  const handleRemove = (item: string) => {
    onChange(value.filter((tag) => tag !== item));
  };

  return (
    <div>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
          }
        }}
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {value.map((tag, index) => (
          <Badge key={index} className="flex items-center bg-white text-black">
            {tag}
            <button
              type="button"
              className="ml-4 p-1 text-red-300 hover:text-red-500"
              onClick={() => handleRemove(tag)}
            >
              X
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default MultiText;
