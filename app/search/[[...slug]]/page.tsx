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
} from "react";
import Navbar from "@/components/shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
const API_ENDPOINT = config.url;
console.log("API_ENDPOINT: ", API_ENDPOINT);
let followupques: SetStateAction<never[]>;
let productinformation: any[];
const id = sessionStorage.getItem("conversationId");

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
interface Conversation {
  ConversationId: string;
  MessageBody: string;
  MessageId: string;
  containsProduct: boolean;
  createdAt: string;
  role: string;
  tokenUsage: number;
  updatedAt: string;
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
  const [conversationHistorydata, setConversationHistorydata] = useState<any[]>(
    []
  );
  const [productsHistory, setProductsHistory] = useState<any[]>([]);
  const { slug } = params;
  const userId = slug[0];
  const searchQuery = slug[1];
  const router = useRouter();

  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

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
            console.log("followupques: ", followupques);
          } else if (eventData.type === "product information") {
            let ques = eventData.data;
            setProductArray(ques);
            console.log("setproductarrayworked: ", productArray);
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

  useEffect(() => {
    setFollowup(followupques);
    console.log("setfollowupworked", followup);
  }, []);

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
  useEffect(() => {
    if (isLoading === false) {
      setCuration(false);
    }
  });
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

        const aiResponse = data.AI_Response;
        console.log("AI Response:", aiResponse);

        const isCurationRequired = data.curration; // Corrected spelling
        const isPdtFlag = data.productFlag;
        setCuration(isCurationRequired);
        setPdt(isPdtFlag);

        console.log("Is Curation Required:", isCurationRequired);
        console.log("Is Product Flag:", isPdtFlag);

        const newAiMessage: Message = { sender: "AI", content: aiResponse };
        setMessages((prevMessages) => [...prevMessages, newAiMessage]);

        if (isCurationRequired) {
          if (!isPdtFlag && aiResponse.products === undefined) {
            

            if (productArray.length>0) {
              const productData = productArray;
              console.log("product data :", productData);

              const formattedProducts: Product[] = productData.map(
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
            } else {
              console.error(
                "Failed to fetch products:",
                // productResponse.statusText
              );
            }
          } else if (isPdtFlag || data.products !== undefined) {
            const productsFromAI = data.products || [];
            console.log("ai response : ", aiResponse.products);
            console.log("products from ai: ", productsFromAI);
            const formattedProducts: Product[] = productsFromAI.map(
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
    }
  };

  //function to trigger send message on pressing enter button
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && userMessage.trim() !== "") {
        sendMessage(userMessage);
        // setMessageSent(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [userMessage]); // Include messageSent in the dependency array

  // Call the custom hook to enable smooth auto-scrolling
  useSmoothScrollIntoView(messagesEndRef, [messages]); // Trigger auto-scrolling whenever messages change
  useSmoothScrollIntoView(messagesEndRef,[productArray]);
  //set followupcomponent width
  // Calculate input width
  useEffect(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlConversationId = params.get("convid");
    console.log("urlconvid: ", urlConversationId);

    // Check if conversationId exists in sessionStorage
    const storedConversationId = localStorage.getItem("conversationId");
    console.log("stored convid: ", storedConversationId);
    const prevconvid = localStorage.getItem("prevconversationid");
    if (
      !prevconvid &&
      storedConversationId &&
      urlConversationId &&
      urlConversationId === storedConversationId
    ) {
      // Use data from sessionStorage if conversationId matches
      sessionStorage.setItem("conversationId", storedConversationId);
      const getrefresheddata = async () => {
        try {
          const response = await fetch(
            `https://${API_ENDPOINT}/api/WebChatbot/conversation/${storedConversationId}`
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

 
  return (
    <main className="bg-[#111111]">
      <Navbar />

      <div>
        <section className="flex justify-center h-full mb-16 bp-0  ">
          <div className="md:max-w-2xl md:min-w-[42rem] sm-w-[75%] w-[90%]  mt-5 mb-10 h-full p-0  ">
            {/* attempt 1 */}

            {conversationHistorydata.map((message, index) => (
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
                      <AvatarImage src="/icon2.png" />
                      <AvatarFallback>bot</AvatarFallback>
                    </Avatar>

                    <div className="flex w-max max-w-[75%] font-medium flex-col gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm text-[#DDDDDD] bg-[#1A1A1A]">
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
                                          return boldRegex.test(part) ? (
                                            <strong key={index}>{part}</strong>
                                          ) : (
                                            <span key={index}>{part}</span>
                                          );
                                        })}
                                        <br />
                                      </span>
                                    );
                                  })}
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
            ))}
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
                        <AvatarImage src="/icon2.png" />
                        <AvatarFallback>bot</AvatarFallback>
                      </Avatar>

                      <div className="flex w-max max-w-[75%] font-medium flex-col gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm text-[#DDDDDD] bg-[#1A1A1A]">
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
                                        return boldRegex.test(part) ? (
                                          <strong key={index}>{part}</strong>
                                        ) : (
                                          <span key={index}>{part}</span>
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
            {isLoading && productArray.length === 0 && !curation && !pdt && (
              <div className="flex items-center space-x-4 mx-1 md:mx-6">
                <GeneralLoader />
              </div>
            )}

            {!isLoading && productArray.length > 0 && (
              <ProductCarousel products={productArray} />
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

            <div ref={messagesEndRef} />
          </div>
        </section>
        
        <footer className="fixed bottom-0 w-full flex justify-center mt-6 p-5 bg-[#111111] z-10 ">
          <div className="flex flex-col w-full max-w-2xl  bg-[#1A1A1A] px-[6px] py-1 rounded-xl items-center  z-1200 relative">
            {followup && followup.length > 0 && (
              <Followup
                containerWidth={containerWidth}
                followup={followup}
                isOpen={isOpen}
                setUserMessage={setUserMessage}
                sendMessage={sendMessage}
                setIsOpen={setIsOpen}
              />
            )}
            <div
              className={`flex justify-center w-full mt-1 items-center bg-black rounded-xl ${
                isOpen ? "rounded-b-none" : "rounded-xl"
              }`}
            >
              <Input
                ref={inputRef}
                type="email"
                placeholder="Find your product"
                className={`transition  border-none focus:outline-none bg-black shadow-lg text-white h-full z-1000 ${
                  isOpen ? "rounded-t-none" : "rounded-xl"
                }`}
                value={userMessage}
                onChange={(e) => handleInputChange(e.target.value)}
              />
              {followup && followup.length > 0 && (
                <Button
                  onClick={toggleFollowup}
                  className="font-medium text-2xl md:text-2xl lg:text-3xl rounded-xl h-[58px] w-[58px] md:w-[65px] m-1"
                >
                  <FaRegLightbulb className="w-[50%] h-[50%]" />
                </Button>
              )}
              <Button
                type="submit"
                className="bg-[#0C8CE9] hover:bg-[#0c8de99a] font-medium text-2xl md:text-2xl lg:text-3xl rounded-xl h-[58px] w-[58px] md:w-[65px] m-1"
                onClick={() => sendMessage(userMessage)}
                disabled={!userMessage.trim() || isLoading}
              >
                &gt;
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
