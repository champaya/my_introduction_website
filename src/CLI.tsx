import React, { useState, useRef, useEffect } from "react";
import { Terminal, Layout } from "lucide-react";
import CommandLine from "./components/CommandLine";
import Output from "./components/Output";
import InvaderGame from "./components/InvaderGame";
import { handleCommand } from "./commands";
import { CommandType } from "./types";

interface CLIProps {
  onSwitchMode: () => void;
}

const CLI: React.FC<CLIProps> = ({ onSwitchMode }) => {
  const [history, setHistory] = useState<CommandType[]>([]);
  const [showGame, setShowGame] = useState(false);
  const outputEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (outputEndRef.current) {
      const container = outputEndRef.current;
      const scrollAmount = container.scrollHeight - container.clientHeight;
      container.scrollTo({
        top: Math.min(container.scrollTop + 200, scrollAmount),
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const processCommand = (command: string) => {
    const response = handleCommand(command);

    if (response.type === "clear") {
      setHistory([]);
      setShowGame(false);
      return;
    }

    if (response.type === "game") {
      setShowGame(true);
      return;
    }

    const newCommand: CommandType = {
      input: command,
      timestamp: new Date().toISOString(),
      output: response,
    };

    setHistory((prev) => [...prev, newCommand]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <nav className="fixed top-0 left-0 w-full bg-gray-900/90 backdrop-blur-sm border-b border-green-500/20 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Terminal className="w-6 h-6" />
              <span className="font-bold">Terminal Portfolio</span>
            </div>
            <button
              onClick={onSwitchMode}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 transition-colors"
            >
              <Layout className="w-4 h-4" />
              <span className="text-sm">Switch to GUI</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4 max-w-4xl pt-24 pb-20">
        {showGame ? (
          <div className="space-y-4">
            <button
              onClick={() => setShowGame(false)}
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              ← Back to Terminal
            </button>
            <InvaderGame />
          </div>
        ) : (
          <>
            {/* Welcome Message */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 mt-6 sm:mt-8">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                <span className="text-green-400">~/</span> Welcome
              </h2>
              <p className="text-sm sm:text-base text-gray-300 font-mono">
                $ Ready. Waiting for input...
              </p>
              <p className="text-sm sm:text-base text-gray-300 font-mono">
                $ Type <span className="text-green-400">help</span> to display
                available commands
              </p>
            </div>

            {/* Command History */}
            <div className="space-y-4 sm:space-y-6 font-mono">
              {history.map((cmd, index) => (
                <Output key={index} command={cmd} />
              ))}
              <div ref={outputEndRef} />
            </div>

            {/* Command Input */}
            <CommandLine onCommand={processCommand} />
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-gray-900/90 backdrop-blur-sm border-t border-green-500/20">
        <div className="container mx-auto px-4 py-3">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Terminal Portfolio by{" "}
            <span className="text-green-400">HAYATO ITO</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CLI;
