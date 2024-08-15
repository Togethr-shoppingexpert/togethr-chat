"use client"
import React, { createContext, useState, useContext, ReactNode, FC, SetStateAction } from 'react';

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
  isLoading:boolean;
  setIsLoading: (started: boolean) => void;
  userMessage:string;
  setUserMessage: (userMessage: string) => void;
  currentoptionvisible:boolean;
  setCurrentoptionvisible: (started: boolean) => void;
  curation:boolean;
  setCuration: (started: boolean) => void;
  currentOptions:string[];
  setCurrentOptions:(currentoptions:SetStateAction<string[]>)=>void;
  followupSourcesVisible:boolean;
  setFollowupSourcesVisible: (started: boolean) => void;
  followup:any[];
  setFollowup:(followup:SetStateAction<never[]>)=>void;
  isOpen:boolean;
  setIsOpen: (started: boolean) => void;
  followupQues: any[];
  setFollowupQues: (ques: any[]) => void;
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
  const [isLoading, setIsLoading] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [currentoptionvisible, setCurrentoptionvisible] = useState(false);
  const [curation, setCuration] = useState(false);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [followupSourcesVisible, setFollowupSourcesVisible] = useState(false);
  const [followup, setFollowup] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [followupQues, setFollowupQues] = useState<any[]>([]);

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
                                      isLoading,
                                      setIsLoading,
                                      userMessage,
                                      setUserMessage,
                                      currentoptionvisible,
                                      setCurrentoptionvisible,
                                      curation,
                                      setCuration,
                                      currentOptions,
                                      setCurrentOptions,
                                      followupSourcesVisible,
                                      setFollowupSourcesVisible,
                                      followup,
                                      setFollowup,
                                      isOpen,
                                      setIsOpen,
                                      followupQues,
                                      setFollowupQues,
                                    }}>
      {children}
    </ContentContext.Provider>
  );
};