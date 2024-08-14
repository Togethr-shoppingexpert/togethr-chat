import React, { Key, useState,useEffect, SetStateAction, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useSmoothScrollIntoView from "@/hooks/autoscroll";
import ProductCarousel from "./ProductCarousel";
import GeneralLoader from "./shared/GeneralLoader";
import { useContentContext } from "@/ContentContext";


export default function Chat() {
  const { conversationHistorydata, 
          messages, 
          productsHistory, 
          isLoading, 
          userMessage, 
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
    // Set options text in the input box when options change
    // setUserMessage(currentOptions.join(', '));
    setSelectedOptions([]);
    setUserMessage("");
  }, [currentOptions]);

  const handleOptionClick = (option: string) => {
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
  };

  useEffect(() => {
    // Logic to handle the clicked options
    console.log("Selected Options:", selectedOptions);

    // Update the currentOptions based on selectedOptions or any other logic
    // setCurrentOptions(selectedOptions);
  }, [selectedOptions]);

  return (
    <div className="w-[100%] h-full overflow-y-scroll pb-[100px]">
      <div>
      { false &&
          <>
      {conversationHistorydata.map((message, index) => {
          console.log('Historymessage', message);
          function isJSON(str: string): boolean {
            try {
              JSON.parse(str);
            } catch (e) {
              return false;
            }
            return true;
          }
          if (isJSON(message.MessageBody)) {
            return null;
          }
          let productIndex = 0;
          return (
            <div
              key={index}
              className={`flex flex-row gap-4 mx-1 md:mx-3 my-5 ${
                message.role === "AI" ? "justify-start" : "justify-end"
              }`}
            >
              {message.role === "AI" ? (
                <>
                  <Avatar className="shadow-md z-10">
                    <AvatarImage src="/icon2.png"  className="w-7 h-7" />
                    <AvatarFallback>bot</AvatarFallback>
                  </Avatar>
                  <div
                    className={`flex max-w-[100%] font-medium flex-col gap-2 rounded-xl px-3 py-2 text-xs md:text-sm bg-[#3c3b3b] text-white`}
                  >
                    <div className="response-content">
                      {typeof message.MessageBody === "string" ? (
                        <div>
                          {message.MessageBody.split("\n").map((paragraph: string, i: Key | null | undefined) => (
                            <div key={i}>
                              {paragraph.split("\n").map((line, idx) => {
                                const boldRegex = /\*\*([^*]*)\*\*/g;
                                let parts = line.split(boldRegex);
                                parts = parts.filter(Boolean);

                                return (
                                  <span key={idx}>
                                    {parts.map((part, index) => (
                                      boldRegex.test(`**${part}**`) ? (
                                        <span key={index}>{part}</span>
                                      ) : (
                                        <strong key={index} className="font-bold">
                                          {part}
                                        </strong>
                                      )
                                    ))}
                                    <br />
                                  </span>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div>{message.MessageBody}</div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex w-max max-w-[100%] flex-col items-center justify-center font-medium gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm ml-auto bg-[#0C8CE9] text-primary-foreground">
                    {message.MessageBody}
                  </div>
                  <Avatar className="shadow-lg z-10">
                    <AvatarImage src="/user.png" className="z-10 " />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </>
              )}
            </div>
          );
        })}  </>}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-row gap-3 mx-1 md:mx-3 my-5 ${
              message.sender === "AI" ? "justify-start" : "justify-end"
            }`}
          >
            {message.sender === "AI" ? (
              <>
                {/*<Avatar className="shadow-md z-10">
                  <AvatarImage src="/icon2.png" className="w-7 h-7"/>
                  <AvatarFallback>bot</AvatarFallback>
                </Avatar>*/}
                <div
                  className={`flex w-max max-w-[100%] font-medium flex-col gap-2 rounded-xl px-3 py-2 text-xs md:text-sm bg-[#3c3b3b] text-white`}
                >
                  {typeof message.content === "string" ? (
                    <div className="response-content">
                      {message.content.split("\n").map((paragraph, i) => (
                        <div key={i}>
                          {paragraph.split("\n").map((line, idx) => {
                            const boldRegex = /\*\*([^*]*)\*\*/g;
                            let parts = line.split(boldRegex);
                            parts = parts.filter(Boolean);

                            return (
                              <span key={idx}>
                                {parts.map((part, index) => (
                                  boldRegex.test(`**${part}**`) ? (
                                    <span key={index}>{part}</span>
                                  ) : (
                                    <strong key={index} className="font-bold">
                                      {part}
                                    </strong>
                                  )
                                ))}
                                <br />
                              </span>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {Array.isArray(message.content) && message.content.length > 0 ? (
                        <div>{message.content}</div>
                      ) : (
                        <div>{message.content}</div>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex w-max max-w-[100%] flex-col items-center justify-center font-medium gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm ml-auto bg-[#0C8CE9] text-primary-foreground">
                  {message.content}
                </div>
                {/*<Avatar className="shadow-lg z-10">
                  <AvatarImage src="/user.png" className="z-10" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>*/}
              </>
            )}
          </div>
        ))}
       
       {isLoading && !curation && (
          <div className="flex items-center space-x-4 mx-1 md:mx-6">
            <GeneralLoader mode="dark" />
          </div>
        )}</div>
        <footer
          className={` right-0 bottom-0 absolute w-[100%] h-[100px] flex justify-center overflow-hidden mt-5 p-3 z-[9999]  bg-[#202222]`}
        >
          <div
            className={`flex flex-col w-full lg:w-[100%] bg-[#2e2f2f] px-2 rounded-xl z-1200 relative`}
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
                onClick={handleClick}
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
    </div>
  );
}
