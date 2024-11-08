import React from 'react';
import { Moon, Sun, Terminal } from 'lucide-react';

interface NavigationProps {
  setTheme: (theme: 'classic' | 'modern' | 'hacker') => void;
  currentTheme: string;
}

const Navigation: React.FC<NavigationProps> = ({ setTheme, currentTheme }) => {
  return (
    <nav className="flex items-center space-x-4">
      <button
        onClick={() => setTheme('classic')}
        className={`p-2 rounded-lg transition-colors ${
          currentTheme === 'classic' ? 'bg-green-500/20' : 'hover:bg-green-500/10'
        }`}
      >
        <Terminal className="w-5 h-5" />
      </button>
      <button
        onClick={() => setTheme('modern')}
        className={`p-2 rounded-lg transition-colors ${
          currentTheme === 'modern' ? 'bg-gray-500/20' : 'hover:bg-gray-500/10'
        }`}
      >
        <Moon className="w-5 h-5" />
      </button>
      <button
        onClick={() => setTheme('hacker')}
        className={`p-2 rounded-lg transition-colors ${
          currentTheme === 'hacker' ? 'bg-blue-500/20' : 'hover:bg-blue-500/10'
        }`}
      >
        <Sun className="w-5 h-5" />
      </button>
    </nav>
  );
}

export default Navigation;