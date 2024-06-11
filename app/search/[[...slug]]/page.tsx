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
import favicon from "@/app/favicon.ico"
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

const item = {
  title: "Section 1",
  content: "Content for section 1",
};

export default function Page({ params }: { params: Params }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [isConversationIdLoaded, setIsConversationIdLoaded] = useState(false);
  const [isLoadingResearch, setIsLoadingResearch] = useState(false);
  const [followup, setFollowup] = useState([]);
  const [inputWidth, setInputWidth] = useState<number | null>(null); // Specify type explicitly
  const inputRef = useRef<HTMLInputElement>(null); // Specify type explicitly
  const [curation, setCuration] = useState(false);
  const [pdt, setPdt] = useState(false);
  const [nextsearch, setNextSearch] = useState(false);
  const [convnId, setConversationId] = useState("");
  const [productArray, setProductArray] = useState([]);
  const [showbuttons, setShowbuttons] = useState(false);
  const [guestID, setGuestID] = useState("");
  const [token, setToken] = useState("");
  const [prevConvId, setPrevConvId] = useState("");
  const [latestMessageIndex, setLatestMessageIndex] = useState(-1);
  const [conversationHistorydata, setConversationHistorydata] = useState<any[]>(
    []
  );
  const [productsHistory, setProductsHistory] = useState<any[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return getThemeFromLocalStorage();
  });
  const [followupSourcesVisible,setFollowupSourcesVisible]=useState(false);
  const { slug } = params;
  const userId = slug[0];
  const searchQuery = slug[1];
  const router = useRouter();

  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(true);
  const [checkedIndices, setCheckedIndices] = useState(new Set());
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [currentoptionvisible,setCurrentoptionvisible]=useState(false);
  const handleNewQuestion = (question: SetStateAction<string>, options: SetStateAction<string[]>) => {
    setCurrentQuestion(question);
    setCurrentOptions(options);
  };

  // const handleOptionClick = (option: string) => {
  //   setUserMessage((prevMessage) => prevMessage + ' ' + option); // Append option to user message
  // };
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
      };

      ws.onclose = (event) => {
        console.log("LOG:: Closed ", event);
      };

      ws.onmessage = (event) => {
        console.log("LOG:: onMessage ", event);
        console.log("event : ", event.data);
        const eventData = JSON.parse(event.data);
        console.log("eventdatatype:", eventData.type);
        if (updateLoadingStateCallback && eventData) {
          if (eventData.type === "research_flag") {
            updateLoadingStateCallback(true);
          } else if (eventData.data === "Preparing Response") {
            updateLoadingStateCallback(false);
          } else if (eventData.type === "follow_up_questions") {
            let messages = eventData.data;
            followupques = messages;
            setFollowup(messages);
            setFollowupSourcesVisible(true);

          } 
          else if (eventData.type === "product information") {
            setTimeout(() => {
              
            
              let ques = eventData.data;
              const formattedProducts: Product[] = eventData.data.map(
                (product: any) => ({
                  title: product.title,
                  rating: product.rating,
                  prices: product.prices,
                  media: product.media,
                  sellers_results: product.sellers_results,
                })
              );
  
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
              console.log("followupques: ", followup);
              console.log("followupques: ", followupques);
              setProductArray(ques);
              setCuration(false);
              console.log("setproductarrayworked: ", productArray);
            
            }, 2000);
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
        // Set the loading state update callback
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

  // decoding the user query from URL and setting in the input field as soon as we come on this page
  useEffect(() => {
    const chatstarted = localStorage.getItem("chatstarted");
    if (!chatstarted && searchQuery && !messageSentRef.current) {
      sendMessage(decodeURIComponent(searchQuery));
      // setUserMessage(decodeURIComponent(searchQuery));
      sessionStorage.setItem("chatstarted", "true");
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


    // try {
    //   const response = await fetch(
    //     `https://${API_ENDPOINT}/api/WebChatbot/message`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${authTokenRef.current}`,
    //       },
    //       body: JSON.stringify({
    //         userMessage: message,
    //         id: conversationId,
    //       }),
    //     }
    //   );

    //   // Handle response
    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log("Response from backend:", data);

    //     const aiResponse = data.AI_Response;
    //     console.log("AI Response:", aiResponse);

    //     const isCurationRequired = data.curration; // Corrected spelling
    //     const isPdtFlag = data.productFlag;
    //     setCuration(isCurationRequired);
    //     setPdt(isPdtFlag);

    //     console.log("Is Curation Required:", isCurationRequired);
    //     console.log("Is Product Flag:", isPdtFlag);

    //     const newAiMessage: Message = { sender: "AI", content: aiResponse };
    //     setMessages((prevMessages) => [...prevMessages, newAiMessage]);

    //     if (isCurationRequired) {
    //       // if (!isPdtFlag && aiResponse.products === undefined) {
    //         // const productResponse = await fetch(
    //         //   `https://${API_ENDPOINT}/api/WebChatbot/product`,
    //         //   {
    //         //     method: "POST",
    //         //     headers: {
    //         //       "Content-Type": "application/json",
    //         //       Authorization: `Bearer ${authTokenRef.current}`,
    //         //     },
    //         //     body: JSON.stringify({
    //         //       MessageId: data.MessageId,
    //         //     }),
    //         //   }
    //         // );



    //       //   if (productArray&&productArray.length>0) {
    //       //     // const productData = await productResponse.json();
    //       //     console.log("product data :", productArray);
    //       //     // setCuration(false);
    //       //     const formattedProducts: Product[] = productArray.map(
    //       //       (product: any) => ({
    //       //         title: product.title,
    //       //         rating: product.rating,
    //       //         prices: product.prices,
    //       //         media: product.media,
    //       //         sellers_results: product.sellers_results,
    //       //       })
    //       //     );

    //       //     const productAiMessage: Message = {
    //       //       sender: "AI",
    //       //       content: <ProductCarousel products={formattedProducts} />,
    //       //     };
    //       //     setMessages((prevMessages) => [
    //       //       ...prevMessages,
    //       //       productAiMessage,
    //       //     ]);
    //       //     setProductArray([]);
    //       //     setCuration(false);
    //       //   } else {
    //       //     console.error(
    //       //       "Failed to fetch products:",
    //       //       // productResponse.statusText
    //       //     );
    //       //     setCuration(false);

    //       //   }
    //       // } else
    //       setCuration(false);
    //        if (isPdtFlag || data.products !== undefined) {
    //         const productsFromAI = data.products || [];
    //         console.log("ai response : ", aiResponse.products);
    //         console.log("products from ai: ", productsFromAI);
    //         const formattedProducts: Product[] = productsFromAI.map(
    //           (product: any) => ({
    //             title: product.title,
    //             rating: product.rating,
    //             prices: product.prices,
    //             media: product.media,
    //             sellers_results: product.sellers_results,
    //           })
    //         );
    //         const productAiMessage: Message = {
    //           sender: "AI",
    //           content: <ProductCarousel products={formattedProducts} />,
    //         };
    //         setMessages((prevMessages) => [...prevMessages, productAiMessage]);
    //       }
    //     }
    //   } else {
    //     console.error("Failed to send message:", response.statusText);
    //   }
    // } catch (error) {
    //   console.error("Error sending message:", error);
    // } finally {
    //   setIsLoading(false);
    // }
    
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
        console.log("Response from backend:", data);
    
        const segments = data.segments; // Assuming segments is part of the response
        console.log("Segments:", segments);
        const ai_response = data.AI_Response;
        const isCurationRequired = data.curration; // Corrected spelling
        const isPdtFlag = data.productFlag;
        setCuration(isCurationRequired);
        setPdt(isPdtFlag);
        setCheckedIndices(new Set());
    
        console.log("Is Curation Required:", isCurationRequired);
        console.log("Is Product Flag:", isPdtFlag);
    
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
              .filter((segment: { tag: string; }, idx: unknown) => newChecked.has(idx) && segment.tag === 'o')
              .map((segment: { value: any; }) => segment.value)
              .join(', ');
    
            setUserMessage(updatedMessage);
    
            return newChecked;
          });
        };
    
        
    
        if (!segments) {
          const newAiMessage = { sender: "AI", content: ai_response };
          setMessages((prevMessages) => [...prevMessages, newAiMessage]);
          setLatestMessageIndex(messages.length);
        } else {
          // Combine all segments into a single JSX element
          if (segments && segments.length > 0) {
            const questionSegment = segments.find((segment: { tag: string; }) => segment.tag === "q");
            const optionsSegments = segments.filter(
              (segment: { tag: string; }) => segment.tag === "o"
            );
      
            if (questionSegment && optionsSegments.length > 0) {
              const question = questionSegment.value;
              const options = optionsSegments.map((segment: { value: any; }) => segment.value);
              setCurrentoptionvisible(true);
              setCurrentQuestion(question);
              setCurrentOptions(options);
            }
          }
          const combinedSegments = segments.map((segment: { tag: string; value: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | PromiseLikeOfReactNode | null | undefined; }, index: number) => {
            const keyIndex = index as Key;
            const isLastSegment = index === segments.length;
            const isSelected = checkedIndices.has(index); 
            if (segment.tag === 'o') {
              return (
                <div
                  key={keyIndex}
                  className={`segment ${isSelected ? 'selected' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '10px',
                    // cursor: 'pointer' // Make the cursor a pointer to indicate it is clickable
                  }}
                  // onClick={() => handleCheckboxChange(index)}
                >
                  {/* <input
                    type="checkbox"
                    checked={checkedIndices.has(index)}
                    onClick={(e) => e.stopPropagation()} // Prevent onClick event from firing when the checkbox itself is clicked
                    onChange={() => handleCheckboxChange(index)}
                    style={{
                      width: '20px',
                      height: '20px',
                      marginRight: '10px',
                      borderRadius: '50%', // Make the checkbox perfectly round
                      border: '2px solid #2e2f2f',
                      cursor: 'pointer',
                      appearance: 'none', // Remove default checkbox appearance
                      WebkitAppearance: 'none', // For older browsers
                      MozAppearance: 'none', // For older browsers
                    }}
                  /> */}
                   {segment.value}
                </div>
              );
            } else if (segment.tag === 'q') {
              return (
                <div key={keyIndex} >
                  <div className="mb-[10px]">{segment.value}</div>
                </div>
              );
            } else {
              return <div key={keyIndex}>{segment.value}</div>;
            }
          });
        
          // Create a single AI message with combined segments
          // const newAiMessage = { sender: "AI", content: <div ref={latestMessageRef}>{combinedSegments}</div> };
          // setMessages((prevMessages) => [...prevMessages, newAiMessage]);
          const newAiMessage = { sender: "AI", content: ai_response };
          setMessages((prevMessages) => [...prevMessages, newAiMessage]);
          setLatestMessageIndex(messages.length);
          setCheckedIndices(new Set());
        }
        
    
        if (isCurationRequired) {
          setCuration(false);
          if (isPdtFlag || data.products !== undefined) {
            const productsFromAI = data.products || [];
            console.log("products from ai: ", productsFromAI);
            const formattedProducts = productsFromAI.map(
              (product: { title: any; rating: any; prices: any; media: any; sellers_results: any; }) => ({
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
      const checkboxes = latestMessageRef.current.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox, index) => {
        const inputElement = checkbox as HTMLInputElement; // Assert the type to HTMLInputElement
        const parentDiv = inputElement.parentElement; // Get the parent div
        if (inputElement && checkedIndices.has(index+1)) {
          inputElement.style.backgroundColor = '#2e2f2f'; // Change to red when selected
          if (parentDiv) {
            parentDiv.classList.add('selected'); // Add 'selected' class to parent div
          }
        } else {
          inputElement.style.backgroundColor = 'transparent';
          if (parentDiv) {
            parentDiv.classList.remove('selected'); // Remove 'selected' class from parent div
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
  useSmoothScrollIntoView(messagesEndRef, [messages]);
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
    const perfEntries = performance.getEntriesByType("navigation");
    const perfEntry = perfEntries.length && perfEntries[0] as PerformanceNavigationTiming;
    const isPageRefreshed = perfEntry && perfEntry.type === "reload";
    const params = new URLSearchParams(window.location.search);
    const urlConversationId = params.get("convid");
    console.log("urlconvid: ", urlConversationId);

    // Check if conversationId exists in sessionStorage
    let storedConversationId: string;
if (isPageRefreshed) {
    storedConversationId = sessionStorage.getItem("conversationId") || "";  
    const savedTheme = localStorage.getItem("darkmode");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
} else {
    storedConversationId = localStorage.getItem("conversationId") || "";
    const savedTheme = localStorage.getItem("darkmode");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
}

    console.log("stored convid: ", storedConversationId);
    
    if (
      
      storedConversationId &&
      urlConversationId &&
      urlConversationId === storedConversationId
    ) {
      // Use data from sessionStorage if conversationId matches
      sessionStorage.setItem("conversationId", storedConversationId);
      const getrefresheddata = async () => {
        try {
          const response = await fetch(
            `https://${API_ENDPOINT}/api/WebChatbot/conversation/${storedConversationId}`,{
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authTokenRef.current}`, 
              }
              
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          const data = await response.json();
          const { conversationHistory, products } = data;
          console.log("history: ", data);
          setConversationHistorydata(conversationHistory);
          setProductsHistory(products[0]);
          setConversationId(storedConversationId);
          // console.log("products:",products[0][0]);
          console.log("response: ", response);
          console.log("conversationHistory: ", conversationHistorydata);
          console.log("producthistory: ", productsHistory);
          setConversationId(storedConversationId);
        } catch (error) {
          console.error("Error fetching conversation data:", error);
        }
      };

      getrefresheddata(); // Call the async function
    } else {
      router.push("/");
      
    }
  }, []);

 

  const fetchGuestAuthSignup = async () => {
    try {
      const response = await fetch(
        `https://${API_ENDPOINT}/api/guest-auth/signup`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      //.guest ---> .User
      //.guestId ---> UserId
      // setGuestID(data.guest.GuestId);
      // setToken(data.token);

      setGuestID(data.User.UserId);
      setToken(data.token);
      // Store guestID and token in local storage
      // localStorage.setItem('guestID', data.guest.GuestId);
      localStorage.setItem("UserID", data.User.UserId);

      localStorage.setItem("token", data.token);
      authTokenRef.current = data.token;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const storedGuestID = localStorage.getItem("UserID");
    const storedToken = localStorage.getItem("token");

    if (storedGuestID && storedToken) {
      setGuestID(storedGuestID);
      setToken(storedToken);
    } else {
      // Fetch API only if guestID and token are not stored in local storage
      fetchGuestAuthSignup();
    }
  }, []);
  const handleOptionClick = (option: string) => {
    setSelectedOptions(prevOptions => {
      if (prevOptions.includes(option)) {
        // Deselect the option
        const updatedOptions = prevOptions.filter(item => item !== option);
        setUserMessage(updatedOptions.join(' ').trim());
        return updatedOptions;
      } else {
        // Select the option
        const updatedOptions = [...prevOptions, option];
        setUserMessage(updatedOptions.join(' ').trim());
        return updatedOptions;
      }
    });
  };
  useEffect(() => {
    // Logic to handle the clicked options
    console.log('Selected Options:', selectedOptions);

    // Update the currentOptions based on selectedOptions or any other logic
    // setCurrentOptions(selectedOptions);
  }, [selectedOptions]);
  return (
    <main className={`${isDarkMode ? "bg-[#202222]" : "bg-[#dde7eb]"} `} >
      
      <Navbar mode={isDarkMode?"dark":"light"} />
{/* 
        <div className=" fixed top-[25px] right-4 z-[500]">
          <label className="switch">
            <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
            <span className="slider round"></span>
          </label>
        </div> 
     */}
      <div className="mb-[120px]">
        <section className="flex justify-center h-full mb-16 bp-0  ">
          <div className="md:max-w-2xl md:min-w-[42rem] sm-w-[75%] w-[90%]  mt-5 mb-10 h-full p-0  ">
            {/* attempt 1 */}

            {conversationHistorydata.map((message, index) => {
               let productIndex = 0;
               return (
              <div
                key={index}
                className={`flex flex-row gap-4 mx-1 md:mx-6 my-5 ${
                  message.role === "AI" ? "justify-start" : "justify-end"
                }`}
              >
                {/* Render AI messages */}
                {message.role === "AI" ? (
                  <>
                    <Avatar className="shadow-md z-10">
                      <AvatarImage src={`${isDarkMode?"/icon2.png":"/favicon.png"}`}/>
                      <AvatarFallback>bot</AvatarFallback>
                    </Avatar>

                    <div className={`flex w-max max-w-[75%] font-medium flex-col gap-2 rounded-xl  px-3 py-2 text-xs md:text-sm  ${isDarkMode?"bg-[#3c3b3b] text-white":"bg-white text-black"}`}>
                    {/* <div className={`flex w-max max-w-[75%] font-medium flex-col gap-2 rounded-xl  px-3 py-2 text-xs md:text-sm  text-white bg-[#242424] border-[2px] border-[#2e2f2f]`}> */}
                      
                      {/* Render message content */}
                      <div className="response-content">
                        {typeof message.MessageBody === "string" ? (
                          <div>
                            {message.MessageBody.split("\n").map(
                              (
                                paragraph: string,
                                i: Key | null | undefined
                              ) => (
                                <div key={i}>
                                  {paragraph.split("\n").map((line, idx) => {
                                    const boldRegex = /\*\*([^*]*)\*\*/g;
                                    let parts = line.split(boldRegex);
                                    parts = parts.filter(Boolean); // Remove empty parts

                                    return (
                                      <span key={idx}>
                                        {parts.map((part, index) => {
                                          return boldRegex.test(`**${part}**`) ? (
                                            <span key={index}>{part}</span>
                                          ) : (
                                            <strong key={index} className="font-bold">{part}</strong>
                                            
                                          );
                                        })}
                                        <br />
                                      </span>
                                    );
                                  })}
                                  {message.containsProduct && Array.isArray(productsHistory[0][productIndex]) && (
                        <ProductCarousel products={productsHistory[0][productIndex++]} />
                      )}
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <div>{message.MessageBody}</div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  // Render user messages
                  <>
                    <div className="flex w-max max-w-[75%] flex-col items-center justify-center font-medium  gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm ml-auto bg-[#0C8CE9] text-primary-foreground">
                      {message.MessageBody}
                    </div>
                    <Avatar className="shadow-lg z-10">
                      <AvatarImage src="/user.png" className="z-10" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </>
                )}
              </div>
            );})}
            {messages.map((message, index) => (
              <>
                <div
                  key={index}
                  className={`flex flex-row gap-4 mx-1 md:mx-6 my-5 ${
                    message.sender === "AI" ? "justify-start" : "justify-end"
                  }`}
                >
            

                  {/* atempt 2 */}
                  {/* Render AI messages */}
                  {message.sender === "AI" ? (
                    <>
                      <Avatar className="shadow-md z-10">
                        <AvatarImage src={`${isDarkMode?"/icon2.png":"/favicon.png"}`} />
                        <AvatarFallback>bot</AvatarFallback>
                      </Avatar>

                      <div className={`flex w-max max-w-[75%] font-medium flex-col gap-2 rounded-xl  px-3 py-2 text-xs md:text-sm  ${isDarkMode?"bg-[#3c3b3b] text-white":"bg-white text-black"}`}>
                      {/* <div className={`flex w-max max-w-[75%] font-medium flex-col gap-2 rounded-xl  px-3 py-2 text-xs md:text-sm  bg-[#242424] border-[2px] border-[#2e2f2f] text-white`}> */}
            
                        
                        {typeof message.content === "string" ? (
                          <div className="response-content">
                            {message.content.split("\n").map((paragraph, i) => (
                              <div key={i}>
                                {paragraph.split("\n").map((line, idx) => {
                                  const boldRegex = /\*\*([^*]*)\*\*/g;
                                  let parts = line.split(boldRegex);
                                  parts = parts.filter(Boolean); // Remove empty parts

                                  return (
                                    <span key={idx}>
                                      {parts.map((part, index) => {
                                        return boldRegex.test(`**${part}**`) ? (
                                          <span key={index}>{part}</span>
                                        ) : (
                                          <strong key={index} className="font-bold">{part}</strong>
                                          
                                        );
                                      })}
                                      <br />
                                    </span>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div>
            

                            {Array.isArray(message.content) &&
                            message.content.length > 0 ? (
                              // Render ProductCarousel
                              <div>{message.content}</div>
                            ) : (
                              // Render other types of content
                              <div>{message.content}</div>
                            )}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    // Render user messages
                    <>
                      <div className="flex w-max max-w-[75%] flex-col items-center justify-center font-medium  gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm ml-auto bg-[#0C8CE9] text-primary-foreground">
                        {message.content}
                      </div>
                      <Avatar className="shadow-lg z-10">
                        <AvatarImage src="/user.png" className="z-10" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </>
                  )}
                </div>
              </>
            ))}
            {(isLoading  && !curation) && (
              <div className="flex items-center space-x-4 mx-1 md:mx-6">
                <GeneralLoader mode={isDarkMode?"dark":"light"} />
              </div>
            )}
            {/* { productArray.length > 0 && (
              <ProductCarousel products={productArray} />
            )} */}
            <div ref={messagesEndRef}  />
            {followupSourcesVisible&&followup&& followup.length > 0 && (
              <div>
{/*                 
              <Sources containerWidth={containerWidth}
              followup={followupques}
              isOpen={isOpen}
              setUserMessage={setUserMessage}
              sendMessage={sendMessage}
              mode={isDarkMode?"dark":"light"}
              setIsOpen={setIsOpen}/> */}
              <Followup
                containerWidth={containerWidth}
                followup={followupques}
                isOpen={isOpen}
                setUserMessage={setUserMessage}
                sendMessage={sendMessage}
                setIsOpen={setIsOpen}
                mode={isDarkMode?"dark":"light"}
              />
              

              </div>
              
            )}
            

            {/* <GeneralLoader />
<ResearchLoader /> */}

            {/* message loader */}

            {/* <ResearchComponent/> */}
            {/* {isLoadingResearch && isLoading && (
            <div className="flex items-center space-x-4 mx-1 md:mx-6">
              <ResearchLoader />
            </div>
          )} */}

            
          </div>
          

        </section>
        <footer className={`fixed bottom-0 w-full flex justify-center mt-6 p-5 ${isDarkMode ? "bg-[#202222]" : "bg-[#dde7eb]"}  z-10 `}>
      <div className={`flex flex-col w-full max-w-2xl ${isDarkMode ? "bg-[#2e2f2f]" : "bg-white"} px-2  rounded-xl items-center z-1200 relative`}>
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
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-xl hover:bg-blue-600"
            onClick={() => sendMessage(userMessage)}
            disabled={!userMessage.trim() || isLoading}
          >
            <div className='flex items-center justify-center mb-1' >
          &gt;
          </div>
          </button>
          </div>
          <div className="flex justify-evenly mt-2 w-full overflow-x-auto whitespace-nowrap" style={{ overflowY: 'hidden', scrollbarWidth: 'thin' }}>
          {currentoptionvisible&&currentOptions.map((option, index) => (
          <div
          key={index}
          className={`p-2 rounded-xl cursor-pointer mr-2 mb-2 text-white text-[12px] ${selectedOptions.includes(option) ? 'bg-[#444545]' : 'bg-[#202222]'}`}
          onClick={() => handleOptionClick(option)}
        >
          {option && option.length > 15 ? option.slice(0, 15) + '...' : option}
        </div>
       ))}
        </div>
      </div>
    </footer>
      </div>
    </main>
  );
}
