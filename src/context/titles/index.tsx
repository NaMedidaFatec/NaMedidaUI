"use client";
import { createContext, useContext, useState } from 'react';

interface TitlesContextValue {
  setTitle: (title: string) => void;
  getTitle: () => string;
}

export const TitlesContext = createContext<TitlesContextValue>({
  setTitle: () => {},
  getTitle: () => ''
});

export const useTitles = () => useContext(TitlesContext);

export const TitlesProvider = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState('');

  return (
    <TitlesContext.Provider value={{ setTitle, getTitle: () => title }}>
      {children}
    </TitlesContext.Provider>
  );
};
