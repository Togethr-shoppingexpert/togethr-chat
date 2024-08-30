"use client";
import {
  useState,
  useEffect,
  useRef,
  SetStateAction,
  Key,
  JSXElementConstructor,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  use,
} from "react";

import Navbar from "@/components/shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import favicon from "@/app/favicon.ico";
import { FaSun, FaMoon } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCarousel from "@/components/ProductCarousel";
import useSmoothScrollIntoView from "@/hooks/autoscroll";
import Followup from "@/components/Followup";
import { ResearchComponent } from "@/components/ResearchComponent";
import ResearchLoader from "@/components/shared/ResearchLoader";
import GeneralLoader from "@/components/shared/GeneralLoader";
import { FaRegLightbulb } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { config } from "../../../constants";
import Sources from "@/components/Sources";
import HeroResult from "@/components/HeroResult";
import Chat from "@/components/Chat";
import Layout from "@/components/layout";
import Discover from "../../discover/discover";
import Heart from "../../../public/icons/HeartIcon";
import HeartFill from "../../../public/icons/HeartFilledIcon";
import Message from "../../../public/icons/MessageIcon";
import Videos from "@/components/Videos";
import Blogs from "@/components/Blogs";
import ContentIcon from "../../../public/icons/ContentIcon";
import DiscoverIcon from "../../../public/icons/DiscoverIcon";
import BuyingIcon from "../../../public/icons/BuyingGuideIcon";
import BuyingGuideIcon from "../../../public/icons/BuyingGuideIcon";
import FooterNav from "@/components/FooterNav";
import { useContentContext } from "@/ContentContext";
const API_ENDPOINT = config.url;
console.log("API_ENDPOINT: ", API_ENDPOINT);
let followupques: [];
let productinformation: any[];
// const id = sessionStorage.getItem("conversationId");

interface Params {
  slug: string[];
}

interface Message {
  sender: string;
  // content: string;
  content: JSX.Element | string | null;
}

interface Product {
  title: string;
  rating: number;
  prices: number[];
  media: { link: string }[];
  sellers_results: { online_sellers: { link: string }[] };
}

interface BlogContent {
  title: string;
  link: string;
  favicon: string;
  source: string;
}

interface VideoContent {
  link: string;
  title: string;
  description: string;
  length: number;
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

const item = {
  title: "Section 1",
  content: "Content for section 1",
};

interface Product {
  product_name: string;
  product_id: string;
  recommendation_reason: string;
}

export default function Page({ params }: { params: Params }) {
  //const [messages, setMessages] = useState<Message[]>([]);
  //const [userMessage, setUserMessage] = useState("");
  //const [isLoading, setIsLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [isConversationIdLoaded, setIsConversationIdLoaded] = useState(false);
  const [isLoadingResearch, setIsLoadingResearch] = useState(false);
  //const [followup, setFollowup] = useState([]);
  const [inputWidth, setInputWidth] = useState<number | null>(null); // Specify type explicitly
  const inputRef = useRef<HTMLInputElement>(null); // Specify type explicitly
  //const [curation, setCuration] = useState(false);
  const [pdt, setPdt] = useState(false);
  const [nextsearch, setNextSearch] = useState(false);
  const [convnId, setConversationId] = useState("");
  const [productArray, setProductArray] = useState([]);
  const [showbuttons, setShowbuttons] = useState(false);
  const [guestID, setGuestID] = useState("");
  const [token, setToken] = useState("");
  const [prevConvId, setPrevConvId] = useState("");
  const [latestMessageIndex, setLatestMessageIndex] = useState(-1);
  //const [conversationHistorydata, setConversationHistorydata] = useState<any[]>([]);
  //const [productsHistory, setProductsHistory] = useState<any[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return getThemeFromLocalStorage();
  });
  const [followupSourcesVisible, setFollowupSourcesVisible] = useState(false);
  const { slug } = params;
  const userId = slug[0];
  const searchQuery = slug[1];
  const router = useRouter();

  const [containerWidth, setContainerWidth] = useState<number>(0);
  //const [isOpen, setIsOpen] = useState(false);
  const [checkedIndices, setCheckedIndices] = useState(new Set());
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const [currentQuestion, setCurrentQuestion] = useState("");
  //const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  //const [currentoptionvisible, setCurrentoptionvisible] = useState(false);
  const handleNewQuestion = (
    question: SetStateAction<string>,
    options: SetStateAction<string[]>
  ) => {
    setCurrentQuestion(question);
    setCurrentOptions(options);
  };
  // const [bestProducts,setBestProducts]=useState<Product[]>([]);
  // const bestProductsRef = useRef<Product[]>([]);
  // const [airesponse,setAiResponse]=useState()
  // const [blogsContent, setBlogsContent] = useState<BlogContent[]>([]);
  // const [buyingGuide, setBuyingGuide] = useState<string>('');
  // const [videoContent, setVideoContent] = useState<VideoContent[]>([]);
  // const handleOptionClick = (option: string) => {
  //   setUserMessage((prevMessage) => prevMessage + ' ' + option); // Append option to user message
  // };


  const {
    setGuideBlogs,
    setGuideVideos,
    setVideoContent,
    setBlogsContent,
    setDiscoverBlogs,
    setDiscoverVideos,
    setBuyingGuide,
    setIsChatStarted,
    setBestProducts,
    setProductInfo,
    setConversationHistorydata,
    setMessages,
    setProductsHistory,
    setIsLoading,
    setUserMessage,
    setCurrentoptionvisible,
    setCuration,
    userMessage,
    currentOptions,
    setCurrentOptions,
    isOpen,
    setIsOpen,
    setFollowup,
    setFollowupQues,
    conversationHistorydata,
    setIsContentAvailable,
    setFilters,
    messageId,
    setBuyingGuideHistory,
    setContentPageHistory,
    setDiscoverContentHistory,
    setFiltersHistory,
    setDiscoverVideosHistory,
    setDiscoverBlogsHistory,
    setGuideTextHistory,
    setGuideVideosHistory,
    setGuideBlogsHistory,
    setContentBlogsHistory,
    setContentVideosHistory,
  } = useContentContext();


  const WebSocketSingleton = (() => {
    let instance: WebSocket | null = null;
    // Callback function to update loading state
    let updateLoadingStateCallback: ((isLoading: boolean) => void) | null =
      null;

    // Function to create WebSocket instance
    function createInstance(id: string) {
      const ws = new WebSocket(`wss://${API_ENDPOINT}/ws/${id}`);
      // WebSocket setup
      ws.onopen = (event) => {
        console.log("LOG:: Connected ", event);
        let isConnected = true;
      };

      ws.onclose = (event) => {
        console.log("LOG:: Closed ", event);
      };

      ws.onmessage = (event) => {
        console.log("LOG:: onMessage ", event);
        const eventData = JSON.parse(event.data);
        console.log("eventdatatype:", eventData.type);

        if (updateLoadingStateCallback && eventData) {
          if (eventData.type === "research_flag") {
            updateLoadingStateCallback(true);
          } else if (eventData.data === "Preparing Response") {
            updateLoadingStateCallback(false);
          } else if (eventData.type === "follow_up_questions") {
            //let messages = eventData.data;
            //followupques = messages;
            
            setFollowupSourcesVisible(true);
            const followUpQuestions = eventData.data;
            setFollowup(followUpQuestions);
            
            setFollowupQues(followUpQuestions);
            console.log('followUpQuestions', followUpQuestions);
          } else if (eventData.type === "follow_up_suggestion") {
            //let messages = eventData.data;
            //followupques = messages;
            
           // setFollowupSourcesVisible(true);
           const suggestion = eventData.follow_up_list;
           setFilters(suggestion);
            //setFollowup(followUpQuestions);
             
            //setFollowupQues(followUpQuestions);
            console.log('followUpSuggestions', suggestion);
          } else if (eventData.type === "product information") {
            setTimeout(() => {
              const formattedProducts: Product[] = eventData.data
              .filter((product: any) => 
                product.sellers_results && // Check if sellers_results exists
              product.sellers_results.online_sellers && // Check if online_sellers exists
              Array.isArray(product.sellers_results.online_sellers) && // Check if online_sellers is an array
              product.sellers_results?.online_sellers.length > 0 
              )
              .map((product: any) => ({
                title: product.title,
                rating: product.rating,
                prices: product.prices,
                media: product.media,
                sellers_results: product.sellers_results,
              }));

              console.log('formattedProducts', formattedProducts);

              const productAiMessage: Message = {
                sender: "AI",
                content: <ProductCarousel products={formattedProducts} />,
              };
              setMessages((prevMessages) => [
                ...prevMessages,
                productAiMessage,
              ]);
              setProductArray([]);
              setCuration(false);
              setProductArray(eventData.data);
              setCuration(false);
              console.log("setproductarrayworked: ", productArray);
            }, 2000);
          } else if (eventData.type === "segments") {
            const { data } = eventData;
            if (data && data.length > 0) {
              const questionSegment = data.find(
                (segment: { tag: string }) => segment.tag === "q"
              );
              const optionsSegments = data.filter(
                (segment: { tag: string }) => segment.tag === "o"
              );

              if (questionSegment && optionsSegments.length > 0) {
                const question = questionSegment.value;
                const options = optionsSegments.map(
                  (segment: { value: any }) => segment.value
                );
                setCurrentoptionvisible(true);
                setCurrentOptions(options);
              }
            }
          }
          else if (eventData.type === "discover_article_content") {
            console.log("discover_blog_content", eventData.data);
            const UpdatedBlog = eventData.data.map((blog: any) => ({
              link: blog.link,
              title: blog.title, 
              favicon: blog.favicon,
              source: blog.source,
            }));
            console.log('data',UpdatedBlog)
            setDiscoverBlogs(UpdatedBlog);
          } else if (eventData.type === "buying_guide") {
            //console.log("buying_guide", eventData.text);
            //setBuyingGuide(eventData.text);
            console.log("buying_guide", eventData.text);
           {/*} const FormattedBuyingGuide: BuyingGuide[] = eventData.text.map((guide: any) => ({
              buying_guide_text: guide.buying_guide_text,
              buying_guide_starting_text: guide.buying_guide_starting_text, 
              buying_guide_factors_options: guide.buying_guide_factors_options, 
              buying_guide_specs_text: guide.buying_guide_specs_text,
              buying_guide_ending_text: guide.buying_guide_ending_text,
            })); 
            console.log('fetched formatted guide', FormattedBuyingGuide);
            setBuyingGuide(FormattedBuyingGuide);*/}
            const parsedBuyingGuide = JSON.parse(eventData.text);
            console.log('parsedBuyingGuide' , parsedBuyingGuide);
            
            setBuyingGuide(parsedBuyingGuide);
          }else if (eventData.type === "buying_guide_content") {
            console.log("buying_guide_blogs", eventData.articel_url);
            console.log("buying_guide_videos", eventData.youtube_url);
            const UpdatedVideo: VideoContent[] = eventData.youtube_url.map((video: any) => ({
              link: video.link,
              title: video.title, 
              description: video.description, 
              length: video.length,
            })); 
            setGuideVideos(UpdatedVideo);
            const UpdatedBlog = eventData.articel_url.map((blog: any) => ({
              link: blog.link,
              title: blog.title, 
              favicon: blog.favicon,
              source: blog.source,
            }));
            setGuideBlogs(UpdatedBlog);
          } else if (eventData.type === "discover_video_content") {
            console.log("discover_video_content", eventData.links);
            const UpdatedVideo: VideoContent[] = eventData.links.map((video: any) => ({
              link: video.link,
              title: video.title, 
              description: video.description, 
              length: video.length,
            }));
            setDiscoverVideos(UpdatedVideo);
      {/*}    }else if (eventData.type === "content_page") {
            console.log("content_blogs", eventData.articel_url);
            console.log("content_video", eventData.youtube_url);
            const UpdatedVideo: VideoContent[] = eventData.youtube_url.map((video: any) => ({
              link: video.link,
              title: video.title, 
              description: video.description, 
              length: video.length,
            })); 
            setVideoContent(UpdatedVideo);
            const UpdatedBlog = eventData.article_url.map((blog: any) => ({
              link: blog.link,
              title: blog.title, 
              favicon: blog.favicon,
              source: blog.source,
            }));
            setBlogsContent(UpdatedBlog);    */}
          }else if(eventData.type==="product_information"){
              console.log("product_Information",eventData.data);
              setProductInfo(eventData.data);
          }
        }
      };

      ws.onerror = (event) => {
        console.log("LOG:: Error", event);
      };

      return ws;
    }

    return {
      getInstance: (id: string, callback: (isLoading: boolean) => void) => {
        updateLoadingStateCallback = callback;

        if (!instance) {
          instance = createInstance(id);
        }
        return instance;
      },
    };
  })();
  const toggleFollowup = () => {
    setIsOpen(!isOpen);
  };
  const containerRef = useRef<HTMLDivElement>(null); // Specify the type as HTMLDivElement

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageSentRef = useRef<boolean>(false);
  const authTokenRef = useRef<string | null>(null); // Ref to hold the authentication token

  // fetch authtoken from localstorage.
  useEffect(() => {
    const fetchAuthToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        authTokenRef.current = token;
      } else {
        console.log("token not found");
      }
    };
    fetchAuthToken();
  }, []);


   const storeCurrentPageUrl = () => {
    const currentPageUrl = window.location.href;
    sessionStorage.setItem('currentPageUrl', currentPageUrl);
  };
  useEffect(() => {
    storeCurrentPageUrl();
  }, []);


  // decoding the user query from URL and setting in the input field as soon as we come on this page
  useEffect(() => {
    const chatstarted = localStorage.getItem("chatstarted");
    if (!chatstarted && searchQuery && !messageSentRef.current) {
      sendMessage(decodeURIComponent(searchQuery));
      // setUserMessage(decodeURIComponent(searchQuery));
      sessionStorage.setItem("chatstarted", "true");
      setIsChatStarted(true);
      localStorage.setItem("chatstarted", "true");

      messageSentRef.current = true; // Update the flag
    }
  }, [searchQuery]); // Empty dependency array to trigger only once when component mounts

  // handle input change
  const handleInputChange = (newValue: string) => {
    setUserMessage(newValue);
  };

  // Function to handle WebSocket messages and update loading state
  const handleWebSocketMessage = (isLoading: boolean) => {
    setIsLoadingResearch(isLoading);
  };
  // useEffect(() => {
  //   if (isLoading === false) {
  //     setCuration(false);
  //   }
  // },[]);
  useEffect(() => {
    // Get conversation ID from sessionStorage
    const storedConversationId = localStorage.getItem("conversationId");

    // If conversation ID exists, initialize WebSocket connection
    if (storedConversationId) {
      // Get the WebSocket instance and pass the callback function
      const ws = WebSocketSingleton.getInstance(
        storedConversationId,
        handleWebSocketMessage
      );

      // Send message after 2 secs
      setTimeout(() => {
        ws.send("I am trying");
      }, 2000);
    } else {
      console.error("Conversation ID not found in sessionStorage");
    }
  }, []); // Empty dependency array to run once on component mount

  const sendMessage = async (message: string) => {
    setIsLoading(true);
    setFollowupSourcesVisible(false);
    setCheckedIndices(new Set());
    setCurrentoptionvisible(false);
    // Check if conversationId exists in session storage
    let conversationId = sessionStorage.getItem("conversationId");

    // If conversationId doesn't exist, wait for 500ms to retry fetching
    if (!conversationId) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      conversationId = sessionStorage.getItem("conversationId");

      // If conversationId still doesn't exist, log error and return
      if (!conversationId) {
        console.error(
          "Conversation ID not found in local storage after timeout."
        );
        setIsLoading(false);
        return;
      }
    }

    const newMessage: Message = { sender: "user", content: message };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserMessage("");
    setCheckedIndices(new Set());

    try {
      const response = await fetch(
        `https://${API_ENDPOINT}/api/WebChatbot/message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokenRef.current}`,
          },
          body: JSON.stringify({
            userMessage: message,
            id: conversationId,
          }),
        }
      );

      // Handle response
      if (response.ok) {
        
        const data = await response.json();
        // if(data.curration===true){
          setCuration(data.curration);
          console.log(data.curration);
          //console.log('dataCuratiob' ,curation);
        // }
        console.log("Response from backend:", data);
        const bestproductset=false;
        const segments = data.segments; // Assuming segments is part of the response
        console.log("Segments:", segments);
        const ai_response = data.AI_Response;
        if(data.curration){
          setBestProducts(JSON.parse(ai_response));
          const curatioMessage = data.CurationMessage;
          const newAiMessage = { sender: "AI", content: curatioMessage };
            
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, newAiMessage];
            setLatestMessageIndex(updatedMessages.length ); // Set the index based on the updated messages
            return updatedMessages;
          });
        }
        // console.log("bestproduct: ",bestProductsRef.current);
        console.log("ai_response: ",ai_response);
        // console.log("bestproducts",bestProducts);

        const isCurationRequired = data.curration; // Corrected spelling
        const isPdtFlag = data.productFlag;
        setCuration(isCurationRequired);
        
        setPdt(isPdtFlag);
        setCheckedIndices(new Set());

        console.log("Is Curation Required:", isCurationRequired);
        console.log("Is Product Flag:", isPdtFlag);
        //console.log('curationforproducts', curation);
        const handleCheckboxChange = (index: unknown) => {
          setCheckedIndices((prev) => {
            const newChecked = new Set(prev);
            if (newChecked.has(index)) {
              newChecked.delete(index);
            } else {
              newChecked.add(index);
            }

            // Update userMessage based on checked checkboxes
            const updatedMessage = segments
              .filter(
                (segment: { tag: string }, idx: unknown) =>
                  newChecked.has(idx) && segment.tag === "o"
              )
              .map((segment: { value: any }) => segment.value)
              .join(", ");

            setUserMessage(updatedMessage);

            return newChecked;
          });
        };

        if (!segments&&data.curration==false) {
          const newAiMessage = { sender: "AI", content: ai_response };
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, newAiMessage];
            setLatestMessageIndex(updatedMessages.length );
            return updatedMessages;
          });
        } else {
          if (data.curration === false) {
            const newAiMessage = { sender: "AI", content: ai_response };
            
            setMessages((prevMessages) => {
              const updatedMessages = [...prevMessages, newAiMessage];
              setLatestMessageIndex(updatedMessages.length ); // Set the index based on the updated messages
              return updatedMessages;
            });
          }  
        
          setCheckedIndices(new Set());
        }

        if (isCurationRequired) {
          setCuration(false);
          if (isPdtFlag || data.products !== undefined) {
            const productsFromAI = data.products || [];
            console.log("products from ai: ", productsFromAI);
            const formattedProducts = productsFromAI.map(
              (product: {
                title: any;
                rating: any;
                prices: any;
                media: any;
                sellers_results: any;
              }) => ({
                title: product.title,
                rating: product.rating,
                prices: product.prices,
                media: product.media,
                sellers_results: product.sellers_results,
              })
            );
            const productAiMessage = {
              sender: "AI",
              content: <ProductCarousel products={formattedProducts} />,
            };
            setMessages((prevMessages) => [...prevMessages, productAiMessage]);

          }
        }
      } else {
        console.error("Failed to send message:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
      console.log("checked indices", checkedIndices);
      setCheckedIndices(new Set());
      setUserMessage("");
    }
  };


  useEffect(() => {
    // Set options text in the input box when options change
    // setUserMessage(currentOptions.join(', '));
    setSelectedOptions([]);
    setUserMessage("");
  }, [currentOptions]);
  useEffect(() => {
    // This useEffect will run whenever checkedIndices changes to update the appearance
    if (latestMessageRef.current) {
      const checkboxes = latestMessageRef.current.querySelectorAll(
        'input[type="checkbox"]'
      );
      checkboxes.forEach((checkbox, index) => {
        const inputElement = checkbox as HTMLInputElement; // Assert the type to HTMLInputElement
        const parentDiv = inputElement.parentElement; // Get the parent div
        if (inputElement && checkedIndices.has(index + 1)) {
          inputElement.style.backgroundColor = "#2e2f2f"; // Change to red when selected
          if (parentDiv) {
            parentDiv.classList.add("selected"); // Add 'selected' class to parent div
          }
        } else {
          inputElement.style.backgroundColor = "transparent";
          if (parentDiv) {
            parentDiv.classList.remove("selected"); // Remove 'selected' class from parent div
          }
        }
      });
    }
  }, [checkedIndices]);

  useEffect(() => {
    console.log("Checked indices changed:", checkedIndices);
    // Any other side effects related to checkedIndices changes can be handled here
  }, [checkedIndices]);
  //function to trigger send message on pressing enter button
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && userMessage.trim() !== "") {
        sendMessage(userMessage);
        setCurrentoptionvisible(false);
        // setMessageSent(true);
        setCheckedIndices(new Set());
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [userMessage]); // Include messageSent in the dependency array

  // Call the custom hook to enable smooth auto-scrolling
  //useSmoothScrollIntoView(messagesEndRef, [messages]);
  // Trigger auto-scrolling whenever messages change

  //set followupcomponent width
  // Calculate input width
  useEffect(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current.offsetWidth);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevTheme) => {
      const newTheme = !prevTheme; // Toggle between true (dark) and false (light)
      localStorage.setItem("darkmode", newTheme ? "dark" : "light");
      return newTheme;
    });
  };
  function getThemeFromLocalStorage() {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("darkmode");
      return savedTheme ? savedTheme === "dark" : true; // Default to dark mode
    }
    return true; // Default to dark mode
  }
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkmode");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }

    window.addEventListener("storage", () => {
      setIsDarkMode(getThemeFromLocalStorage());
    });

    return () => {
      window.removeEventListener("storage", () => {
        setIsDarkMode(getThemeFromLocalStorage());
      });
    };
  }, []);

  useEffect(() => {
    // Check if the page was refreshed
    const perfEntries = performance.getEntriesByType("navigation");
    const perfEntry =
      perfEntries.length && (perfEntries[0] as PerformanceNavigationTiming);
    const isPageRefreshed = perfEntry && perfEntry.type === "reload";
  
    // Retrieve URL parameters and theme
    const params = new URLSearchParams(window.location.search);
    const urlConversationId = params.get("convid");
    console.log("urlconvid: ", urlConversationId);
  
    const savedTheme = localStorage.getItem("darkmode");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  
    // Determine the stored conversation ID (check sessionStorage or localStorage)
    let storedConversationId = isPageRefreshed
      ? sessionStorage.getItem("conversationId") || ""
      : localStorage.getItem("conversationId") || "";
  
    console.log("stored convid: ", storedConversationId);
  
    const conversationIdToUse = urlConversationId || storedConversationId;
  
    // Fetch data if we have a valid conversation ID
    if (conversationIdToUse) {
      sessionStorage.setItem("conversationId", conversationIdToUse);
  
      const fetchData = async () => {
        try {
          // Fetch conversation history
          const chatResponse = await fetch(
            `https://${API_ENDPOINT}/api/WebChatbot/conversation/${conversationIdToUse}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authTokenRef.current}`,
              },
            }
          );
          if (!chatResponse.ok) {
            throw new Error(`Error fetching conversation history: ${chatResponse.status}`);
          }
          const chatData = await chatResponse.json();
          console.log("history: ", chatData);
  
          const { conversationHistory } = chatData;
          if (conversationHistory.length > 0) {
            setIsChatStarted(true);
          }
          setConversationHistorydata(conversationHistory);
          setConversationId(conversationIdToUse);
  
          // Fetch buying guide
          const guideResponse = await fetch(
            `https://${API_ENDPOINT}/api/buying-guide/${conversationIdToUse}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authTokenRef.current}`,
              },
            }
          );
          if (!guideResponse.ok) {
            throw new Error(`Error fetching buying guide data: ${guideResponse.status}`);
          }
          const guideData = await guideResponse.json();
          console.log("Buying Guide history: ", guideData);
  
          const {
            buying_guide_text,
            buying_guide_article_links,
            buying_guide_youtube_links,
          } = JSON.parse(guideData[0].Body);
  
          setBuyingGuide(guideData);
  
          const parsedBuyingGuideText = JSON.parse(buying_guide_text);
          setGuideTextHistory(parsedBuyingGuideText);
          setGuideVideosHistory(buying_guide_youtube_links);
          setGuideBlogsHistory(buying_guide_article_links);
  
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    } else {
      // Redirect to home page if no conversation ID is found
      router.push("/");
    }
  }, []);
  

  useEffect(() => {
    // Check if messageId is available
    if (messageId) {
      const getRefreshedDiscoverData = async () => {
        try {
          const response = await fetch(
            `https://${API_ENDPOINT}/api/discover-content/${messageId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error(`Error fetching discover content: ${response.status}`);
          }
      
          const data = await response.json();
          console.log("discover content history: ", data);
      
          // Parse the Body
          const { article_links, youtube_links } = JSON.parse(data.Body);
      
          // Log the separate content
          console.log("Article Links: ", article_links);
          console.log("YouTube Links: ", youtube_links);
      
          // Send the parsed data to the respective components
          setDiscoverContentHistory(data);
          setDiscoverVideosHistory(youtube_links);
          setDiscoverBlogsHistory(article_links);
      
        } catch (error) {
          console.error("Error fetching discover content data:", error);
        }
      };
      
      
      const getRefreshedFiltersData = async () => {
        try {
          const response = await fetch(
            `https://${API_ENDPOINT}/api/suggestion/${messageId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error(`Error fetching Filters: ${response.status}`);
          }
      
          const data = await response.json();
          console.log("Filters history: ", data);
      
          // Check if Body exists and parse it
          if (data.Body) {
            const parsedData = JSON.parse(data.Body);
            console.log("Parsed filters history:", parsedData);
      
            // Access follow_up_list
            const followUpList = parsedData.follow_up_list;
            console.log("Follow-up list:", followUpList);
      
            // You can now update your state or handle the follow-up list as needed
            setFiltersHistory(followUpList);
          } else {
            console.error("Body field is missing from the response data");
          }
      
        } catch (error) {
          console.error("Error fetching Filters data:", error);
        }
      };
      
      
  
      getRefreshedDiscoverData();
      getRefreshedFiltersData();
    }
  }, [messageId]); // Add messageId as a dependency
  

  useEffect(() => {
    console.log('Updated messadge id :', messageId);  // Debugging
  }, [messageId]);
  
  const fetchGuestAuthSignup = async () => {
    try {
      const response = await fetch(
        `https://${API_ENDPOINT}/api/guest-auth/signup`
      );
      if (!response.ok) {
        throw new Error("auth- Network response was not ok");
      }
      const data = await response.json();
      
      setGuestID(data.User.UserId);
      setToken(data.token);
  
      // Store guestID, token, and expiration in local storage
      localStorage.setItem("UserID", data.User.UserId);
      localStorage.setItem("token", data.token);
  
      // If the token has an expiration time, store it
      if (data.tokenExpiration) {
        const expirationTime = Date.now() + data.tokenExpiration * 1000; // Convert to ms
        localStorage.setItem("tokenExpiration", expirationTime.toString());
      }
  
      authTokenRef.current = data.token;
    } catch (error) {
      console.error("Error fetching guest authentication:", error);
      // Optionally display a user notification or retry logic
    }
  };
  
  useEffect(() => {
    const storedGuestID = localStorage.getItem("UserID");
    const storedToken = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
  
    // Check if the token is still valid
    if (storedToken && tokenExpiration && Date.now() > Number(tokenExpiration)) {
      console.log("Token expired. Fetching new token.");
      fetchGuestAuthSignup();
      return;
    }
  
    if (storedGuestID && storedToken) {
      setGuestID(storedGuestID);
      setToken(storedToken);
    } else {
      // Fetch API only if guestID and token are not stored in local storage
      fetchGuestAuthSignup();
    }
  }, []);
  
 {/* const handleOptionClick = (option: string) => {
    setSelectedOptions((prevOptions) => {
      if (prevOptions.includes(option)) {
        // Deselect the option
        const updatedOptions = prevOptions.filter((item) => item !== option);
        setUserMessage(updatedOptions.join(" ").trim());
        return updatedOptions;
      } else {
        // Select the option
        const updatedOptions = [...prevOptions, option];
        setUserMessage(updatedOptions.join(" ").trim());
        return updatedOptions;
      }
    });
  };*/}

  // useEffect(() => {
  //   console.log("Best Products Ref Updated:", bestProductsRef.current);
  // }, [bestProductsRef.current]);

{/*  useEffect(() => {
    // Logic to handle the clicked options
    console.log("Selected Options:", selectedOptions);

    // Update the currentOptions based on selectedOptions or any other logic
    // setCurrentOptions(selectedOptions);
  }, [selectedOptions]); */}

 {/* const [showHeroAndFollowup, setShowHeroAndFollowup] = useState(false);

  useEffect(() => {
    const hasFollowups = Array.isArray(followup) && followup.length > 0;
    if (hasFollowups) {
      setShowHeroAndFollowup(true);
    } else {
      setShowHeroAndFollowup(false);
    }
  }, [followup]);*/}
  return (
    <main className={`${isDarkMode ? "bg-[#202222]" : "bg-[#dde7eb]"} `}>
     {/* <Navbar mode={isDarkMode ? "dark" : "light"} />
     
        <div className=" fixed top-[25px] right-4 z-[500]">
          <label className="switch">
            <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
            <span className="slider round"></span>
          </label>
        </div> 
     */}
     
      <div className=" w-full flex items-center justify-end   z-10">
        <section className="w-[100%]">
          
          <div className="flex w-full mb-16  h-screent">
             {/*<div className="fixed right-0 top-0 w-[370px] overflow-y-scroll order-2  products-height">
            
            attempt 1 
            <Chat />

          {/*  {isLoading && !curation && (
              <div className="flex items-center space-x-4 mx-1 md:mx-6">
                <GeneralLoader mode={isDarkMode ? "dark" : "light"} />
              </div>
            )}

            <footer
          className={`fixed right-3 bottom-8 lg:bottom-0 w-96 flex justify-center overflow-hidden mt-6 p-5 z-[9999] ${
            isDarkMode ? "bg-[#202222]" : "bg-[#dde7eb]"
          } z-10`}
        >
          <div
            className={`flex flex-col w-full lg:w-[100%] ${
              isDarkMode ? "bg-[#2e2f2f]" : "bg-white"
            } px-2 rounded-xl z-1200 relative`}
          >
            <div className="flex w-[100%]">
              <input
                type="text"
                placeholder="Type your message..."
                className="bg-[#242424] text-white transition border-none outline-none focus:outline-none focus:border-none rounded-xl font-semibold mt-2 mr-2 p-2 w-[100%]"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
              />

              <button
                type="button"
                className="bg-[#2196F3] text-white px-4 py-2 mt-2 rounded-xl cursor-pointer hover:bg-[#568bf6]"
                onClick={() => sendMessage(userMessage)}
                disabled={!userMessage.trim() || isLoading}
              >
                <div className="flex items-center justify-center mb-1 font-bold text-lg">
                  &gt;
                </div>
              </button>
            </div>

            <div
              className="flex mt-2 overflow-x-scroll whitespace-nowrap"
              style={{
                overflowY: "hidden",
                scrollbarWidth: "thin",
                width: "100%",
              }}
            >
              {currentoptionvisible &&
                currentOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-xl cursor-pointer mr-2 mb-2 text-white text-[12px] ${
                      selectedOptions.includes(option)
                        ? "bg-[#444545]"
                        : "bg-[#202222]"
                    }`}
                    onClick={() => handleOptionClick(option)}
                    // style={{ flex: "0 0 calc(31.5% - 10px)" }}
                  >
                    {option && option.length > 30
                      ? option.slice(0, 30) + "..."
                      : option}
                  </div>
                ))}
            </div>
          </div>
            </footer>

            </div>*/}
         <Layout sendMessage={sendMessage}> 
           {/* <Discover sendMessage={sendMessage}/>*/}
            {/*<div className="w-[65%] h-full overflow-y-scroll p-4 order-1 flex flex-col items-center justify-end">
            
              <HeroResult />
              <div ref={messagesEndRef} />
              {followupSourcesVisible && followup && followup.length > 0 && (
                <div>
                  <Followup
                    containerWidth={containerWidth}
                    followup={followupques}
                    isOpen={isOpen}
                    setUserMessage={setUserMessage}
                    sendMessage={sendMessage}
                    setIsOpen={setIsOpen}
                    mode={isDarkMode ? "dark" : "light"}
                  />
                </div>
              )}
            </div>*/}
          </Layout>
          </div>
        </section>
        

        {/*   <footer
          className={`fixed bottom-8 lg:bottom-0 w-full flex justify-center  mt-6 p-5 z-[9999] ${
            isDarkMode ? "bg-[#202222]" : "bg-[#dde7eb]"
          } z-10`}
        >
          <div
            className={`flex flex-col w-full lg:w-[52%] ${
              isDarkMode ? "bg-[#2e2f2f]" : "bg-white"
            } px-2 rounded-xl z-1200 relative`}
          >
            <div className="flex w-[100%]">
              <input
                type="text"
                placeholder="Type your message..."
                className="bg-[#242424] text-white transition border-none outline-none focus:outline-none focus:border-none rounded-xl font-semibold mt-2 mr-2 p-2 w-[100%]"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
              />

              <button
                type="button"
                className="bg-[#2196F3] text-white px-4 py-2 mt-2 rounded-xl cursor-pointer hover:bg-[#568bf6]"
                onClick={() => sendMessage(userMessage)}
                disabled={!userMessage.trim() || isLoading}
              >
                <div className="flex items-center justify-center mb-1 font-bold text-lg">
                  &gt;
                </div>
              </button>
            </div>

            <div
              className="flex mt-2 overflow-x-auto whitespace-nowrap"
              style={{
                overflowY: "hidden",
                scrollbarWidth: "thin",
                width: "100%",
              }}
            >
              {currentoptionvisible &&
                currentOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-xl cursor-pointer mr-2 mb-2 text-white text-[12px] ${
                      selectedOptions.includes(option)
                        ? "bg-[#444545]"
                        : "bg-[#202222]"
                    }`}
                    onClick={() => handleOptionClick(option)}
                    // style={{ flex: "0 0 calc(31.5% - 10px)" }}
                  >
                    {option && option.length > 30
                      ? option.slice(0, 30) + "..."
                      : option}
                  </div>
                ))}
            </div>
          </div>
        </footer>*/}
      </div>
      
      
      {/*<FooterNav />*/}
      
    </main>
  );
}