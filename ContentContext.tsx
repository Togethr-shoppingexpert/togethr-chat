"use client"
import React, { createContext, useState, useContext, ReactNode, FC, SetStateAction, useMemo } from 'react';

interface Message {
  sender: string;
  content: JSX.Element | string | null;
}

interface FactorOption {
  factor: string;
  options: string[];
}

interface BuyingGuide {
  buying_guide_text: string;
  buying_guide_starting_text: string;
  buying_guide_factors_options: FactorOption[];
  buying_guide_specs_text: string;
  buying_guide_ending_text: string;
}

interface ContentContextData {
  videoContent: any[];
  blogsContent: any[];
  discoverVideos: any[];
  discoverBlogs: any[];
  guideVideos: any[];
  guideBlogs: any[];
  buyingGuide: BuyingGuide;
  setVideoContent: (videos: any[]) => void;
  setBlogsContent: (blogs: any[]) => void;
  setDiscoverVideos: (videos: any[]) => void;
  setDiscoverBlogs: (blogs: any[]) => void;
  setGuideVideos: (videos: any[]) => void;
  setGuideBlogs: (blogs: any[]) => void;
  setBuyingGuide: React.Dispatch<React.SetStateAction<BuyingGuide>>;
  isChatOpen:boolean;
  setIsChatOpen: (started: boolean) => void;
  isChatStarted:boolean;
  setIsChatStarted: (started: boolean) => void;
  bestProducts:any[];
  setBestProducts:(bestproducts:any[])=>void;
  bestProductsHistory:any[];
  setBestProductsHistory:(bestProductsHistory:any[])=>void;
  productInfo:any[];
  setProductInfo:(productInfo:any[])=>void;
  conversationHistorydata: any[];
  setConversationHistorydata: (conversationHistory: any[]) => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
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
  filters:any[];
  setFilters:(followup:SetStateAction<never[]>)=>void;
  isOpen:boolean;
  setIsOpen: (started: boolean) => void;
  followupQues: any[];
  setFollowupQues: (ques: any[]) => void;
  isContentAvailable:boolean;
  setIsContentAvailable: (content: boolean) => void;
  filledHearts: Set<string>;
  setFilledHearts: (productId: string, isFilled: boolean) => void;
  messageId: string;
  setMessageId: (messageId: string) => void;
  discoverContentHistory: any[];
  setDiscoverContentHistory: (discoverContentHistory: any[]) => void;
  contentPageHistory: any[];
  setContentPageHistory: (contentPageHistory: any[]) => void;
  buyingGuideHistory: any[];
  setBuyingGuideHistory: (buyingGuideHistory: any[]) => void;
  filtersHistory:any[];
  setFiltersHistory:(followup:SetStateAction<never[]>)=>void;
  discoverVideosHistory: any[];
  discoverBlogsHistory: any[];
  setDiscoverVideosHistory: (videos: any[]) => void;
  setDiscoverBlogsHistory: (blogs: any[]) => void;
  guideVideosHistory: any[];
  guideBlogsHistory: any[];
  guideTextHistory: BuyingGuide;
  setGuideVideosHistory: (videos: any[]) => void;
  setGuideBlogsHistory: (blogs: any[]) => void;
  setGuideTextHistory: React.Dispatch<React.SetStateAction<BuyingGuide>>;
  contentVideosHistory: any[];
  contentBlogsHistory: any[];
  setContentVideosHistory: (videos: any[]) => void;
  setContentBlogsHistory: (blogs: any[]) => void;
  isContentLoading:boolean;
  setIsContentLoading: (started: boolean) => void;
}

const ContentContext = createContext<ContentContextData | undefined>(undefined);

export const useContentContext = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContentContext must be used within a ContentProvider");
  }
  return context;
};

export const ContentProvider: FC<{ children: ReactNode }> = ({ children }) => {

  const defaultBuyingGuide: BuyingGuide = {
    buying_guide_text: "",
    buying_guide_starting_text: "",
    buying_guide_factors_options: [],
    buying_guide_specs_text: "",
    buying_guide_ending_text: "",
  };

  const [guideVideos, setGuideVideos] = useState<any[]>([]);
  const [guideBlogs, setGuideBlogs] = useState<any[]>([]);
  const [discoverVideos, setDiscoverVideos] = useState<any[]>([]);
  const [discoverBlogs, setDiscoverBlogs] = useState<any[]>([]);
  const [videoContent, setVideoContent] = useState<any[]>([]);
  const [blogsContent, setBlogsContent] = useState<any[]>([]);
  const [buyingGuide, setBuyingGuide] = useState<BuyingGuide>(defaultBuyingGuide);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [bestProducts, setBestProducts] = useState<any[]>([]);
  const [productInfo, setProductInfo] = useState<any[]>([]);
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
  const [filters, setFilters] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [followupQues, setFollowupQues] = useState<any[]>([]);
  const [isContentAvailable, setIsContentAvailable] = useState<boolean>(false);
  const [filledHearts, setFilledHearts] = useState<Set<string>>(new Set());
  const [messageId, setMessageId] = useState<string>("");
  const [discoverContentHistory, setDiscoverContentHistory] = useState<any[]>([]);
  const [contentPageHistory, setContentPageHistory] = useState<any[]>([]);
  const [buyingGuideHistory, setBuyingGuideHistory] = useState<any[]>([]);
  const [filtersHistory, setFiltersHistory] = useState([]);
  const [discoverVideosHistory, setDiscoverVideosHistory] = useState<any[]>([]);
  const [discoverBlogsHistory, setDiscoverBlogsHistory] = useState<any[]>([]);
  const [guideVideosHistory, setGuideVideosHistory] = useState<any[]>([]);
  const [guideBlogsHistory, setGuideBlogsHistory] = useState<any[]>([]);
  const [guideTextHistory, setGuideTextHistory] = useState<BuyingGuide>(defaultBuyingGuide);
  const [contentVideosHistory, setContentVideosHistory] = useState<any[]>([]);
  const [contentBlogsHistory, setContentBlogsHistory] = useState<any[]>([]);
  const [bestProductsHistory, setBestProductsHistory] = useState<any[]>([]);
  const [isContentLoading, setIsContentLoading] = useState<boolean>(true);
  

  const updateFilledHearts = (productId: string, isFilled: boolean) => {
    setFilledHearts(prev => {
      const newSet = new Set(prev);
      if (isFilled) {
        newSet.add(productId);
      } else {
        newSet.delete(productId);
      }
      return newSet;
    });
  };

  const contextValue = useMemo(() => ({
    videoContent,
    blogsContent,
    buyingGuide,
    setVideoContent,
    setBlogsContent,
    discoverVideos,
    setDiscoverVideos,
    discoverBlogs,
    setDiscoverBlogs,
    guideBlogs,
    guideVideos,
    setGuideBlogs,
    setGuideVideos,
    setBuyingGuide,
    isChatStarted,
    setIsChatStarted,
    isChatOpen,
    setIsChatOpen,
    bestProducts,
    setBestProducts,
    bestProductsHistory,
    setBestProductsHistory,
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
    filters,
    setFilters,
    isOpen,
    setIsOpen,
    followupQues,
    setFollowupQues,
    isContentAvailable,
    setIsContentAvailable,
    filledHearts,
    setFilledHearts: updateFilledHearts,
    messageId, setMessageId,
    discoverContentHistory, setDiscoverContentHistory,
    buyingGuideHistory, setBuyingGuideHistory,
    contentPageHistory, setContentPageHistory,
    filtersHistory, setFiltersHistory,
    discoverBlogsHistory, setDiscoverBlogsHistory,
    discoverVideosHistory, setDiscoverVideosHistory,
    guideBlogsHistory, setGuideBlogsHistory,
    guideVideosHistory, setGuideVideosHistory,
    guideTextHistory, setGuideTextHistory,
    contentBlogsHistory, setContentBlogsHistory,
    contentVideosHistory, setContentVideosHistory,
    isContentLoading, setIsContentLoading
  }), [videoContent, blogsContent, buyingGuide, discoverVideos, discoverBlogs, guideBlogs, guideVideos, isChatStarted, isChatOpen, bestProducts, bestProductsHistory, setBestProductsHistory, productInfo, conversationHistorydata, messages, productsHistory, isLoading, userMessage, currentoptionvisible, curation, currentOptions, followupSourcesVisible, followup, filters, isOpen, followupQues, isContentAvailable, filledHearts, messageId, setMessageId,discoverContentHistory, setDiscoverContentHistory,buyingGuideHistory, setBuyingGuideHistory,contentPageHistory, setContentPageHistory,filtersHistory, setFiltersHistory,discoverBlogsHistory, discoverVideosHistory, setDiscoverBlogsHistory, setDiscoverVideosHistory,     guideBlogsHistory, setGuideBlogsHistory, guideVideosHistory, setGuideVideosHistory,
    guideTextHistory, setGuideTextHistory, contentBlogsHistory, setContentBlogsHistory, contentVideosHistory, setContentVideosHistory]);

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
};
