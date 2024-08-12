"use client"
import React, { createContext, useState, useContext, ReactNode, FC } from 'react';

interface Message {
  sender: string;
  // content: string;
  content: JSX.Element | string | null;
}
// Define the shape of your context data
interface ContentContextData {
  videoContent: any[];
  blogsContent: any[];
  buyingGuide: string;
  setVideoContent: (videos: any[]) => void;
  setBlogsContent: (blogs: any[]) => void;
  setBuyingGuide: (guide: string) => void;
  isChatStarted:boolean;
  setIsChatStarted: (started: boolean) => void;
  bestProducts:any[];
  setBestProducts:(bestproducts:any[])=>void;
  productInfo:any[];
  setProductInfo:(productInfo:any[])=>void;
  conversationHistorydata: any[];
  setConversationHistorydata: (conversationHistory: any[]) => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>; // Updated here
  productsHistory: any[];
  setProductsHistory: (productsHistory: any[]) => void;

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
  const [isChatStarted,setIsChatStarted]=useState(false);
  const [bestProducts,setBestProducts]=useState<any[]>([]);
  const [productInfo,setProductInfo]=useState<any[]>([]);
  const [conversationHistorydata, setConversationHistorydata] = useState<any[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [productsHistory, setProductsHistory] = useState<any[]>([]);

  return (
    <ContentContext.Provider value={{ videoContent, 
                                      blogsContent, 
                                      buyingGuide, 
                                      setVideoContent, 
                                      setBlogsContent, 
                                      setBuyingGuide,
                                      isChatStarted,
                                      setIsChatStarted ,
                                      bestProducts,
                                      setBestProducts,
                                      productInfo,
                                      setProductInfo,
                                      conversationHistorydata,
                                      setConversationHistorydata,
                                      messages,
                                      setMessages,
                                      productsHistory,
                                      setProductsHistory,
                                    }}>
      {children}
    </ContentContext.Provider>
  );
};
