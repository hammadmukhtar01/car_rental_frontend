// HeightContext.js
import React, { createContext, useState, useContext } from 'react';

const HeightContext = createContext(null);

export const useHeight = () => useContext(HeightContext);

export const HeightProvider = ({ children }) => {
  const [height, setHeight] = useState('auto');

  return (
    <HeightContext.Provider value={{ height, setHeight }}>
      {children}
    </HeightContext.Provider>
  );
};
