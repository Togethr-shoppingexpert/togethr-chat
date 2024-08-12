import React, { Key } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ProductCarousel from "./ProductCarousel";
import { useContentContext } from "@/ContentContext";

export default function Chat() {
  const { conversationHistorydata, messages, productsHistory } = useContentContext();

  return (
    <div className="w-[100%] h-full overflow-y-scroll">
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
    </div>
  );
}
