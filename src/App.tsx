import React, { useState, useEffect } from 'react';
import GUI from './GUI';
import CLI from './CLI';
import LoadingScreen from './components/LoadingScreen';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCLIMode, setIsCLIMode] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMode = () => {
    setIsCLIMode(!isCLIMode);
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      {!isLoading && (
        isCLIMode ? (
          <CLI onSwitchMode={toggleMode} />
        ) : (
          <GUI onSwitchMode={toggleMode} />
        )
      )}
    </>
  );
};

export default App;