import React, { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";

interface CommandLineProps {
  onCommand: (command: string) => void;
}

const CommandLine: React.FC<CommandLineProps> = ({ onCommand }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClick = () => inputRef.current?.focus();
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input.trim());
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 flex items-center space-x-2 bg-gray-800/50 p-3 rounded-lg border border-green-400/20"
    >
      <ChevronRight className="w-4 h-4 text-green-400" />
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-gray-100 placeholder-gray-500"
        placeholder="Type a command..."
        autoFocus
      />
    </form>
  );
};

export default CommandLine;
