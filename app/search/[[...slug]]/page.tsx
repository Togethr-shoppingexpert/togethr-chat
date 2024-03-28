"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import ResearchLoader from "@/components/shared/ResearchLoader";
import ProductCard from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
// import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import Loader from "@/components/shared/Loader";

interface Params {
  slug: string[];
}

interface Message {
  sender: string;
  // content: string;
  content : JSX.Element | string;
}

interface Product {
  title: string;
  rating: number;
  prices: number[];
  media: { link: string }[];
  sellers_results: { online_sellers: { link: string }[] };
}

export default function Page({ params }: { params: Params }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  // const [conversationId, setConversationId] = useState(""); // State to hold conversation ID
  const [isConversationIdLoaded, setIsConversationIdLoaded] = useState(false);
  // const [sessionID, setSessionID] = useState(""); // State to hold session ID

  const [convnId, setConversationId] = useState("");
  const [productArray, setProductArray] = useState<any[]>([]);

  const { slug } = params;
  const userId = slug[0];
  const searchQuery = slug[1];

  const router = useRouter();

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

  //to get conversation ID
  // useEffect(() => {
  //   const getSessionId = async () => {
  //     try {
  //       const response = await fetch('https://govoyr.com/api/WebChatbot/conversationId', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${authTokenRef.current}`,
  //         },
  //         body: JSON.stringify({
  //           platform: "web",
  //         })
  //       });
  //       if (response.ok) {
  //         const data = await response.json();
  //         const newConversationId = data.ConversationId;
  //         localStorage.setItem('conversationId', newConversationId); // Store conversation ID in local storage
  //       }else {
  //         console.error('Failed to fetch conversation ID:', response.statusText);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching conversation ID:', error);
  //     }
  //   }

  //   getSessionId();
  // }, []);

  // decoding the user query from URL and setting in the input field as soon as we come on this page
  useEffect(() => {
    if (searchQuery && !messageSentRef.current) {
      sendMessage(decodeURIComponent(searchQuery));
      // setUserMessage(decodeURIComponent(searchQuery));
      messageSentRef.current = true; // Update the flag
    }
  }, [searchQuery]); // Empty dependency array to trigger only once when component mounts

  //session id logic , to be replaced with conversation id logic


//attempt2
useEffect(() => {
  const storedConversationId = sessionStorage.getItem("conversationId");
  let isNewIdGenerated = false; // Flag to track if a new ID was generated

  // Check if stored conversation ID exists
  if (storedConversationId) {
    setConversationId(storedConversationId);
  } else {
    // If stored conversation ID doesn't exist, check if the page is refreshed
    if (window.performance.navigation.type === 1) {
      const generateNewConversationId = async () => {
        try {
          const response = await fetch(
            "https://govoyr.com/api/WebChatbot/conversationId",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authTokenRef.current}`,
              },
              body: JSON.stringify({
                platform: "web",
              }),
            }
          );
          if (response.ok) {
            const data = await response.json();
            const newConversationId = data.ConversationId;
            sessionStorage.setItem("conversationId", newConversationId);
            setConversationId(newConversationId);
            isNewIdGenerated = true; // Set the flag indicating a new ID was generated
          } else {
            console.error(
              "Failed to fetch conversation ID:",
              response.statusText
            );
          }
        } catch (error) {
          console.error("Error fetching conversation ID:", error);
        }
      };

      generateNewConversationId();
    }
  }

  // If a new ID was not generated, set the conversation ID using the stored value
  if (!isNewIdGenerated && storedConversationId) {
    setConversationId(storedConversationId);
  }
}, [authTokenRef]); // Include authTokenRef as a dependency if it's used inside the effect



  const handleInputChange = (newValue: string) => {
    setUserMessage(newValue);
  };

  // const conversationId = sessionStorage.getItem('conversationId');

  // const sendMessage = async (message: string) => {
  //   setIsLoading(true);

  //   const conversationId = sessionStorage.getItem('conversationId');
  //   if (!conversationId) {
  //     console.error('Conversation ID not found in local storage.');
  //     setIsLoading(false);
  //     return;
  //   }

  //   const newMessage: Message = { sender: 'user', content: message };
  //   setMessages(prevMessages => [...prevMessages, newMessage]);
  //   setUserMessage("");

  //   try {
  //     const response = await fetch('https://govoyr.com/api/WebChatbot/message', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // Authorization: `Bearer ${authToken}`,
  //         'Authorization': `Bearer ${authTokenRef.current}`,
  //       },
  //       body: JSON.stringify({
  //         userMessage: message,
  //         id: conversationId
  //         // id: convnId
  //         // id: "41a71743-5d89-4c02-9022-6d89de9e3473"
  //       })
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       const aiResponse = data.AI_Response;
  //       console.log(data);
  //       // let aiContent = typeof aiResponse === 'string' ? aiResponse : ''; // Check if aiResponse is a string
  //       const newAiMessage: Message = { sender: 'AI', content: aiResponse };
  //       setMessages(prevMessages => [...prevMessages, newAiMessage]);
  //     } else {
  //       console.error('Failed to send message:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error sending message:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const sendMessage = async (message: string) => {
    setIsLoading(true);

    const conversationId = sessionStorage.getItem("conversationId");
    if (!conversationId) {
      console.error("Conversation ID not found in local storage.");
      setIsLoading(false);
      return;
    }

    const newMessage: Message = { sender: "user", content: message };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserMessage("");

    try {
      const response = await fetch(
        "https://govoyr.com/api/WebChatbot/message",
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

      if (response.ok) {
        const data = await response.json();
        console.log("Response from backend:", data);

        const aiResponse = data.AI_Response;
        console.log("AI Response:", aiResponse);

        const isCurationRequired = data.curration; // Corrected spelling

        console.log("Is Curation Required:", isCurationRequired);

        const newAiMessage: Message = { sender: "AI", content: aiResponse };
        setMessages((prevMessages) => [...prevMessages, newAiMessage]);

        if (isCurationRequired) {
          const productResponse = await fetch(
            "https://govoyr.com/api/WebChatbot/product",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authTokenRef.current}`,
              },
              body: JSON.stringify({
                MessageId: data.MessageId,
              }),
            }
          );

          if (productResponse.ok) {
            //attempt 1
            // const productData = await productResponse.json();
            // // // Handle the product data received from the external API
            // console.log("Product Data:", productData);

            // setProductArray(productData);


            //attempt 2
            // console.log("Products data:", productArray);
            // const productData = await productResponse.json();
            // // Handle the product data received from the external API
            // console.log("Product Data:", productData);
            // setProductArray(productData);
            // // Create an AI message containing the product data directly
            // const productAiMessage: Message = {
            //   sender: "AI",
            //   content: productData, // Set productData directly as content
            // };
    
            // Add the product AI message to messages
            // setMessages((prevMessages) => [...prevMessages, productAiMessage]);

            //attempt 3
            const productData = await productResponse.json();
            console.log(productData);
  // Extract relevant information from productData and pass it to the ProductCarousel component
  const formattedProducts: Product[] = productData.map((product: any) => ({
    title: product.title,
    rating: product.rating,
    prices: product.prices,
    media: product.media,
    sellers_results: product.sellers_results,
  }));
  // Create an AI message containing the product data as props
  const productAiMessage: Message = {
    sender: "AI",
    content: <ProductCarousel products={formattedProducts} />, // Pass formattedProducts as props
  };
  // Add the product AI message to messages
  setMessages((prevMessages) => [...prevMessages, productAiMessage]);
          } else {
            console.error(
              "Failed to fetch products:",
              productResponse.statusText
            );
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="bg-[#111111]">
      <Navbar />

      <section className="flex justify-center h-full mb-16 bp-0  ">
        <div className="md:max-w-2xl md:min-w-[42rem] max-w-md  mt-5 mb-10 h-full p-0 overflow-hidden ">
          {/* attempt 1 */}
          {messages.map((message, index) => (
            <>
              <div
                key={index}
                className={`flex flex-row gap-4 mx-1 md:mx-6 my-5 ${
                  message.sender === "AI" ? "justify-start" : "justify-end"
                }`}
              >
                {/* {message.sender === "AI" ?  */}
                {/* ( */}
                  {/* // <>
                  //   <Avatar className="shadow-md z-10">
                  //     <AvatarImage src="/ai2.png" />
                  //     <AvatarFallback>bot</AvatarFallback>
                  //   </Avatar>
                  //   <div className="flex w-max max-w-[75%]  font-medium flex-col gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm text-[#DDDDDD] bg-[#1A1A1A]">
                  //     {typeof message.content === "string" ? ( */}
                  {/* //       message.content.split("\n").map((paragraph, i) => (
                  //         <div key={i}>
                  //           {paragraph.split("\n").map((line, idx) => { */}
                  {/* //             if (/^\d+\./.test(line.trim())) { */}
                  {/* //               return (
                  //                 <span key={idx}>
                  //                   {line.trim()}
                  //                   <br />
                  //                 </span>
                  //               );
                  //             } else { */}
                  {/* //               return <span key={idx}>{line.trim()}</span>;
                  //             }
                  //           })}
                  //         </div>
                  //       ))
                  //     ) : (

                  //       <div>{message.content}</div> // Render the content as is if it's not a string
                  //     )}
                  //   </div> */}
                
                  {/* // </> */}
                {/* ) : ( */}
                  {/* //  {productArray.length > 0 && <ProductCarousel products={productArray} />} */}
                  {/* <>
                    <div className="flex w-max max-w-[75%] flex-col font-medium gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm ml-auto bg-[#0C8CE9] text-primary-foreground">
                      {message.content}
                    </div>
                    <Avatar className="shadow-lg z-10">
                      <AvatarImage src="/human.png" className="z-10" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </>
                )} */}


{/* {message.sender==='AI' && productArray.length > 0 && 
      <ProductCarousel products={productArray} />
} */}
{/* {message.sender === 'AI' && Array.isArray(productArray) && productArray.length > 0 && (
  <ProductCarousel products={productArray} />
)} */}

{/* atempt 2 */}
 {/* Render AI messages */}
 {message.sender === "AI" ? (
      <>
        <Avatar className="shadow-md z-10">
          <AvatarImage src="/ai2.png" />
          <AvatarFallback>bot</AvatarFallback>
        </Avatar>
        <div className="flex w-max max-w-[75%]  font-medium flex-col gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm text-[#DDDDDD] bg-[#1A1A1A]">
          {typeof message.content === "string" ? (
            message.content.split("\n").map((paragraph, i) => (
              <div key={i}>
                {paragraph.split("\n").map((line, idx) => {
                  if (/^\d+\./.test(line.trim())) {
                    return (
                      <span key={idx}>
                        {line.trim()}
                        <br />
                      </span>
                    );
                  } else {
                    return <span key={idx}>{line.trim()}</span>;
                  }
                })}
              </div>
            ))
          ) : (
            // Render ProductCarousel
            <div >
              {message.content}
            </div>
          )}
        </div>
      </>
    ) : (
      // Render user messages
      <>
        <div className="flex w-max max-w-[75%] flex-col font-medium  gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm ml-auto bg-[#0C8CE9] text-primary-foreground">
          {message.content}
        </div>
        <Avatar className="shadow-lg z-10">
          <AvatarImage src="/human.png" className="z-10" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </>
    )}

              </div>
              {/* {message.sender === 'AI' && productArray.length > 0 && (
              <div className="flex justify-center mb-5">
                <ProductCarousel products={productArray} />
              </div>
            )} */}
            </>
          ))}

          {/* <ResearchLoader/> */}
          {productArray.length > 0 && (
            <ProductCarousel products={productArray} />
          )}
          
          {/* {messages.some(message => message.sender === 'AI') && productArray.length > 0 && <ProductCarousel products={productArray} />} */}
          {/* message loader */}
          {isLoading && (
            <div className="flex items-center space-x-4 mx-1 md:mx-6">
              <Avatar className="shadow-md z-10">
                <AvatarImage src="/ai2.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] md:w-[300px] bg-[#323232]" />
                <Skeleton className="h-4 w-[250px] md:w-[265px] bg-[#323232]" />
                <Skeleton className="h-4 w-[240px] md:w-[250px] bg-[#323232]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </section>

      <footer className="fixed bottom-0 w-full flex justify-center mt-5  p-5 bg-[#111111] z-50">
        <div className="flex w-full max-w-2xl h-[64px]  bg-[#1A1A1A] px-[6px] py-1 rounded-xl items-center space-x-2 z-1200">
          <Input
            type="email"
            placeholder="Find your product"
            className="transition border-[#141414] bg-black shadow-lg text-white rounded-xl h-full z-1000"
            value={userMessage}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <Button
            type="submit"
            className="bg-[#0C8CE9] hover:bg-[#0c8de99a] font-medium text-2xl rounded-xl  h-[58px]  w-[58px] md:w-[65px]"
            onClick={() => sendMessage(userMessage)} // Pass userMessage to sendMessage function
            disabled={!userMessage.trim() || isLoading}
          >
            &gt;
            {/* <IoIosArrowForward className='h-2/3'/> */}
          </Button>
        </div>
      </footer>
    </main>
  );
}
