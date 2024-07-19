"use client"
import React, { createContext, useState, useContext, ReactNode, FC } from 'react';

// Define the shape of your context data
interface ContentContextData {
  videoContent: any[];
  blogsContent: any[];
  buyingGuide: string;
  setVideoContent: (videos: any[]) => void;
  setBlogsContent: (blogs: any[]) => void;
  setBuyingGuide: (guide: string) => void;
}

// Create the context with default values
const ContentContext = createContext<ContentContextData | undefined>(undefined);

export const useContentContext = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContentContext must be used within a ContentProvider");
  }
  return context;
};

// Create a provider component
export const ContentProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [videoContent, setVideoContent] = useState<any[]>([]);
  const [blogsContent, setBlogsContent] = useState<any[]>([]);
  const [buyingGuide, setBuyingGuide] = useState<string>('');

  return (
    <ContentContext.Provider value={{ videoContent, blogsContent, buyingGuide, setVideoContent, setBlogsContent, setBuyingGuide }}>
      {children}
    </ContentContext.Provider>
  );
};
