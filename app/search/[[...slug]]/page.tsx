"use client";
import {
  useState,
  useEffect,
  useRef,
  SetStateAction,
} from "react";

import ProductCarousel from "@/components/ProductCarousel";
import { useRouter } from "next/navigation";
import { config } from "../../../constants";
import Layout from "@/components/layout";
import Message from "../../../public/icons/MessageIcon";
import { useContentContext } from "@/ContentContext";
const API_ENDPOINT = config.url;
console.log("API_ENDPOINT: ", API_ENDPOINT);

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
  const [isLoadingResearch, setIsLoadingResearch] = useState(false);
  const [inputWidth, setInputWidth] = useState<number | null>(null); // Specify type explicitly
  const inputRef = useRef<HTMLInputElement>(null); 
  const [pdt, setPdt] = useState(false);
  const [convnId, setConversationId] = useState("");
  const [productArray, setProductArray] = useState([]);
  const [guestID, setGuestID] = useState("");
  const [token, setToken] = useState("");
  const [prevConvId, setPrevConvId] = useState("");
  const [latestMessageIndex, setLatestMessageIndex] = useState(-1);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return getThemeFromLocalStorage();
  });
  const [followupSourcesVisible, setFollowupSourcesVisible] = useState(false);
  const { slug } = params;
  const userId = slug[0];
  const searchQuery = slug[1];
  const router = useRouter();
  const [checkedIndices, setCheckedIndices] = useState(new Set());
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const handleNewQuestion = (
    question: SetStateAction<string>,
    options: SetStateAction<string[]>
  ) => {
    setCurrentQuestion(question);
    setCurrentOptions(options);
  };

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
    setIsContentLoading,
    isContentLoading,
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
            if(UpdatedBlog.length >0){
              setIsContentLoading(false);
              console.log('content loaing set to false');
            }
            console.log('data',UpdatedBlog)
            setDiscoverBlogs(UpdatedBlog);
          } else if (eventData.type === "buying_guide") {
      
            console.log("buying_guide", eventData.text);
           
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
        console.log('token found', authTokenRef)
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

    const token = localStorage.getItem('token'); // Get the token from localStorage
    if (!token) {
      console.error('No token found');
      return;
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
            "Authorization": `Bearer ${token}`,
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
    const params = new URLSearchParams(window.location.search);
    const urlConversationId = params.get("convid");
    console.log("urlconvid: ", urlConversationId);
  
    // Check if conversationId exists in sessionStorage or URL
    let conversationIdToUse = urlConversationId || sessionStorage.getItem("conversationId");
    const token = localStorage.getItem('token'); // Get the token from localStorage
    if (!token) {
      console.error('No token found');
      return;
    }
  
    if (conversationIdToUse && token) {
      // Store the conversationId in sessionStorage if not already stored
      sessionStorage.setItem("conversationId", conversationIdToUse);
  
      const savedTheme = localStorage.getItem("darkmode");
      if (savedTheme) {
        setIsDarkMode(savedTheme === "dark");
      }
  
      const fetchConversationData = async () => {
        try {
          const response = await fetch(
            `https://${API_ENDPOINT}/api/WebChatbot/conversation/${conversationIdToUse}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                 "Authorization": `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error(`Error fetching conversation data: ${response.status}`);
          }
          const data = await response.json();
          const { conversationHistory } = data;
          console.log("conversationHistory: ", conversationHistory);
          setIsLoading(false);
          if (conversationHistory.length > 0) {
            setIsChatStarted(true);
            setIsLoading(false);
          }
          setConversationHistorydata(conversationHistory);
      
          // Ensure conversationIdToUse is not null before setting it
          if (conversationIdToUse) {
            setConversationId(conversationIdToUse);
          }
        } catch (error) {
          console.error("Error fetching conversation data:", error);
        }
      };
      
  
      fetchConversationData();
      // Add your other data fetching functions here, like getRefreshedBuyingGuide();
    } else {
      // Handle case where no conversation ID is found
      router.push("/");
    }
  }, []);
  
  useEffect(() => {
    if (messageId) {
      const fetchDiscoverData = async () => {
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
          const { article_links, youtube_links } = JSON.parse(data.Body);
  
          setDiscoverContentHistory(data);
          setDiscoverVideosHistory(youtube_links);
          setDiscoverBlogsHistory(article_links);
        } catch (error) {
          console.error("Error fetching discover content data:", error);
        }
      };
  
      const fetchFiltersData = async () => {
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
          if (data.Body) {
            const parsedData = JSON.parse(data.Body);
            setFiltersHistory(parsedData.follow_up_list);
          }
        } catch (error) {
          console.error("Error fetching Filters data:", error);
        }
      };
  
      fetchDiscoverData();
      fetchFiltersData();
    }
  }, [messageId]);
  

  


  return (
    <main className={`${isDarkMode ? "bg-[#202222]" : "bg-[#dde7eb]"} `}>
      <div className=" w-full flex items-center justify-end   z-10">
        <section className="w-[100%]">
          
          <div className={`flex w-full  ${isContentLoading ? 'mb-0' : 'mb-16'}  h-screent`}>          
            <Layout sendMessage={sendMessage}> 
            </Layout>
          </div>
        </section>
      </div>      
    </main>
  );
}