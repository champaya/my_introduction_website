import React from 'react';
import { CommandType } from '../types';
import About from './CommandOutput/About';
import Skills from './CommandOutput/Skills';
import Projects from './CommandOutput/Projects';
import Contact from './CommandOutput/Contact';
import Certifications from './CommandOutput/Certifications';
import Help from './CommandOutput/Help';
import Download from './CommandOutput/Download';

interface OutputProps {
  command: CommandType;
}

const Output: React.FC<OutputProps> = ({ command }) => {
  const renderOutput = () => {
    switch (command.output.type) {
      case 'about':
        return <About content={command.output.content} />;
      case 'skills':
        return <Skills content={command.output.content} />;
      case 'projects':
        return <Projects content={command.output.content} />;
      case 'contact':
        return <Contact content={command.output.content} />;
      case 'certifications':
        return <Certifications content={command.output.content} />;
      case 'help':
        return <Help content={command.output.content} />;
      case 'download':
        return <Download content={command.output.content} />;
      case 'error':
        return <div className="text-red-400">{command.output.content}</div>;
      case 'clear':
        return null;
      default:
        return <div>{JSON.stringify(command.output.content)}</div>;
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <span className="text-green-400">$</span>
        <span>{command.input}</span>
      </div>
      <div className="pl-4 opacity-80">
        {renderOutput()}
      </div>
    </div>
  );
};

export default Output;