import React, { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useSmoothScrollIntoView from "@/hooks/autoscroll";
import GeneralLoader from "./shared/GeneralLoader";
import ProductCarousel from "./ProductCarousel";
import { useContentContext } from "@/ContentContext";

interface Product {
  productId: string;
  title: string;
  rating: number;
  prices: number[];
  media: { link: string }[];
  sellers_results: { online_sellers: { link: string }[] };
}

export default function Chat({ sendMessage }: { sendMessage: (message: string) => void }) {
  const {
    conversationHistorydata,
    messages,
    productsHistory,
    setBestProductsHistory,
    setProductsHistory,
    isLoading,
    userMessage,
    setMessageId,
    currentoptionvisible,
    curation,
    setUserMessage,
    currentOptions,
  } = useContentContext();

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleClick = () => {
    sendMessage(userMessage);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useSmoothScrollIntoView(messagesEndRef, [messages]);

  useEffect(() => {
    setSelectedOptions([]);
    setUserMessage("");
  }, [currentOptions]);

  const handleOptionClick = (option: string) => {
    if (!selectedOptions.includes(option)) {
      const newSelectedOptions = [...selectedOptions, option];
      setSelectedOptions(newSelectedOptions);
      setUserMessage(newSelectedOptions.join(", "));
    } else {
      const newSelectedOptions = selectedOptions.filter(opt => opt !== option);
      setSelectedOptions(newSelectedOptions);
      setUserMessage(newSelectedOptions.join(", "));
    }
  };

  useEffect(() => {
    conversationHistorydata.forEach((message) => {
      if (message.containsProduct && message.products) {
        console.log('Product history from chat:', message.products); // Debugging
  
        // Filter products to include only non-null products with a valid productId
        const filteredProducts = message.products.filter((product: Product | null) => 
          product 
        );
  
        // Set the filtered products to productsHistory
        setProductsHistory(filteredProducts);
        console.log('Filtered product history:', filteredProducts);
  
        // Set message ID
        console.log('Message ID in chat:', message.MessageId);
        setMessageId(message.MessageId);
  
        // Parse and set best products history if applicable
        const response = JSON.parse(message.MessageBody);
        console.log('Message body in chat:', response);
        setBestProductsHistory(response);
      }
    });
  }, [conversationHistorydata, setProductsHistory, setMessageId, setBestProductsHistory]);
  
  

 {/*useEffect(() => {
    conversationHistorydata.forEach((message) => {
      if (message.containsProduct && message.products) {
        console.log('Product history from chat:', message.products); // Debugging
        setProductsHistory(message.products);
        console.log('message id in chat:', message.MessageId);
        setMessageId(message.MessageId);
        const response = JSON.parse(message.MessageBody);
        console.log('message boday in chat', response);
        setBestProductsHistory(response);
      }
    });
  }, [conversationHistorydata, setProductsHistory, setMessageId, setBestProductsHistory]);

 useEffect(() => {
    conversationHistorydata.forEach((message) => {
      if (message.containsProduct && message.products) {
        console.log('Product history from chat:', message.products); // Debugging
  
        // Assuming you have a type called `Product`
        const filteredProducts = message.products.filter((product: Product) => 
          product.sellers_results && 
          product.sellers_results.online_sellers &&
          Array.isArray(product.sellers_results.online_sellers) &&
          product.sellers_results.online_sellers.length > 0
        );
  
        setProductsHistory(filteredProducts);
        console.log('Filtered product history:', filteredProducts);
  
        // Set message ID
        console.log('Message ID in chat:', message.MessageId);
        setMessageId(message.MessageId);
  
        // Parse and set best products history if applicable
        const response = JSON.parse(message.MessageBody);
        console.log('Message body in chat:', response);
        setBestProductsHistory(response);
      }
    });
  }, [conversationHistorydata, setProductsHistory, setMessageId, setBestProductsHistory]); */}
  
  

  useEffect(() => {
    console.log("Selected Options:", selectedOptions);
  }, [selectedOptions]);

  return (
    <div className="w-[100%] h-full overflow-y-scroll pb-[100px]">
      <div className="chat-height">
        {conversationHistorydata.length > 2 && conversationHistorydata.map((message, index) => {
          let productIndex = 0;
          return (
            <div
              key={index}
              className={`flex flex-row gap-4 mx-1 md:mx-6 my-5 ${
                message.role === "AI" ? "justify-start" : "justify-end"
              }`}
            >
              {message.role === "AI" ? (
                <>
                  <div
                    className={`flex w-max max-w-[90%] font-medium flex-col gap-2 rounded-xl px-3 py-2 text-xs md:text-sm bg-[#3c3b3b] text-white`}
                  >
                    <div className="response-content">
                 {(() => {
                    if (typeof message.MessageBody === "string") {
                      try {
                        const contentArray = JSON.parse(message.MessageBody) as { value: string; tag: string }[];
                        return (
                          <div>
                            {contentArray.map((item, i: number) => {
                              if (item.tag === "q") {
                                return (
                                  <div key={i} className="font-semibold mb-2">
                                    {item.value}
                                  </div>
                                );
                              } else if (item.tag === "p") {
                                return (
                                  <div key={i} className="text-sm text-gray-300 mt-1">
                                    {item.value}
                                  </div>
                                );
                              } else if (item.tag === "o") {
                                return (
                                  <button
                                    key={i}
                                    className={`block px-3 py-1 mt-1 mb-2 rounded-lg text-sm cursor-pointer transition ${
                                      selectedOptions.includes(item.value)
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-black"
                                    }`}
                                    onClick={() => handleOptionClick(item.value)}
                                  >
                                    {item.value}
                                  </button>
                                );
                              }
                              return null;
                            })}
                          </div>
                        );
                      } catch (error) {
                        return <div>{message.MessageBody}</div>;
                      }
                    }
                    return <div>{message.MessageBody}</div>;
                  })()} 
                      
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex w-max max-w-[75%] flex-col items-center justify-center font-medium gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm ml-auto bg-[#0C8CE9] text-primary-foreground">
                    {message.MessageBody}
                  </div>
                </>
              )}
            </div>
          );
        })}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-row gap-3 mx-1 md:mx-3 my-5 ${
              message.sender === "AI" ? "justify-start" : "justify-end"
            }`}
          >
            {message.sender === "AI" ? (
              <>
                <div
                  className={`flex w-max max-w-[90%] font-medium flex-col gap-2 rounded-xl px-3 py-2 text-xs md:text-sm bg-[#3c3b3b] text-white`}
                >
                  {(() => {
                    if (typeof message.content === "string") {
                      try {
                        const contentArray = JSON.parse(message.content) as { value: string; tag: string }[];
                        return (
                          <div>
                            {contentArray.map((item, i: number) => {
                              if (item.tag === "q") {
                                return (
                                  <div key={i} className="font-semibold mb-2">
                                    {item.value}
                                  </div>
                                );
                              } else if (item.tag === "p") {
                                return (
                                  <div key={i} className="text-sm text-gray-300 mt-1">
                                    {item.value}
                                  </div>
                                );
                              } else if (item.tag === "o") {
                                return (
                                  <button
                                    key={i}
                                    className={`block text-left px-3 py-1 mt-1 mb-2 rounded-lg text-sm cursor-pointer transition ${
                                      selectedOptions.includes(item.value)
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-black"
                                    }`}
                                    onClick={() => handleOptionClick(item.value)}
                                  >
                                    {item.value}
                                  </button>
                                );
                              }
                              return null;
                            })}
                          </div>
                        );
                      } catch (error) {
                        console.error("Failed to parse message content:", error);
                        return <div>{message.content}</div>;
                      }
                    }
                    return <div>{message.content}</div>;
                  })()}
                  

                </div>
              </>
            ) : (
              <div className="flex w-max max-w-[90%] flex-col items-center justify-center font-medium gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm ml-auto bg-[#0C8CE9] text-primary-foreground">
                {message.content}
              </div>
            )}
          </div>
        ))}

        {isLoading && !curation && (
          <div className="flex items-center space-x-4 mx-1">
            <GeneralLoader mode="dark" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <footer
        className={`right-0 bottom-0 absolute w-[100%] h-[90px] flex justify-center overflow-hidden p-3 z-[9999] bg-[#202222]`}
      >
        <div
          className={`flex flex-col gap-[2px] w-full lg:w-[100%] bg-[#2e2f2f] px-2 rounded-xl z-1200 relative`}
        >
          <div className="flex w-[100%]">
            <input
              type="text"
              placeholder="Type your message..."
              className="bg-[#242424] text-white transition border-none outline-none focus:outline-none focus:border-none rounded-xl font-semibold mt-2 mr-2 p-2 w-[100%] h-[50px]"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <button
              type="button"
              className="bg-[#2196F3] h-[50px] text-white px-4 py-2 mt-2 rounded-xl cursor-pointer hover:bg-[#568bf6]"
              onClick={handleClick}
              disabled={!userMessage.trim() || isLoading}
            >
              <div className="flex items-center justify-center mb-1 font-bold text-lg">
                &gt;
              </div>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
