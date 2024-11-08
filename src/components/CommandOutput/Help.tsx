import React from "react";
import { HelpCircle } from "lucide-react";

interface HelpProps {
  content: Array<{
    command: string;
    description: string;
  }>;
}

const Help: React.FC<HelpProps> = ({ content }) => {
  return (
    <div className="space-y-4 select-text">
      <div className="flex items-center space-x-2">
        <HelpCircle className="w-5 h-5 flex-shrink-0" />
        <h3 className="font-bold">Available Commands</h3>
      </div>
      <div className="flex flex-col space-y-3">
        {content.map(({ command, description }) => (
          <div
            key={command}
            className="flex items-start space-x-3 hover:bg-gray-800/50 p-2 rounded-md transition-colors"
          >
            <code className="text-green-400 min-w-[120px] font-mono">
              {command}
            </code>
            <span className="text-sm opacity-80">{description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Help;
