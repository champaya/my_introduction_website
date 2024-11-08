import React from "react";
import { Terminal, Code, Zap } from "lucide-react";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Terminal Animation */}
        <div className="relative mb-8">
          <Terminal className="w-16 h-16 text-green-400 animate-pulse" />
          <div className="absolute -top-1 -right-1">
            <div className="relative">
              <Zap className="w-6 h-6 text-yellow-400 animate-bounce" />
              <Code className="absolute top-0 left-0 w-6 h-6 text-green-400 animate-ping" />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-green-400 mb-4">
          Initializing Terminal...
        </h2>

        {/* Loading Bar */}
        <div className="w-64 h-2 bg-green-900 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-green-400 rounded-full animate-loading-bar" />
        </div>

        {/* Loading Messages */}
        <div className="h-6 mt-4">
          <div className="animate-typing-message">
            <span className="text-green-400/80 font-mono text-sm">
              Loading modules...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
