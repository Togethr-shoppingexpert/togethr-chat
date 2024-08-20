"use client";
import FooterNav from "@/components/FooterNav";
import HeroResult from "@/components/HeroResult";
import NameCards from "@/components/NameCards";
import WishlistUI from "@/components/WishlistUI";
import Navbar from "@/components/shared/Navbar";
import Followup from "@/components/Followup";
import React, { useRef, useState, useEffect } from "react";
import { useContentContext } from "@/ContentContext";

export default function page({ sendMessage }: { sendMessage: (message: string) =>void}) {
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [isContentAvailable, setIsContentAvailable] = useState<boolean>(false);

    const { followupSourcesVisible, 
        followup, 
        isOpen, 
        setIsOpen, 
        followupQues, 
        setUserMessage,
      } = useContentContext();
    
      const messagesEndRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        // Assuming that content availability depends on whether followup is present and has length > 0
        if (followup && followup.length > 0) {
          setIsContentAvailable(true);
        } else {
          setIsContentAvailable(false);
        }
      }, [followup]);



  console.log("wishlist");
  return (
    <>
      <div className="w-[100%]  h-full  pt-0 p-4 order-1 flex flex-col items-center justify-end">
               
              <HeroResult />
              <div ref={messagesEndRef} />
            {/*}  {true && followup && followup.length > 0 && (
                <div>
                  <Followup
                    containerWidth={containerWidth}
                    followup={followupQues}
                    isOpen={isOpen}
                    setUserMessage={setUserMessage}
                    sendMessage={sendMessage} 
                    setIsOpen={setIsOpen}
                    mode="dark" 
                  />
                </div>
              )} */}
              {isContentAvailable && (
          <div>
            <Followup
              containerWidth={containerWidth}
              followup={followupQues}
              isOpen={isOpen}
              setUserMessage={setUserMessage}
              sendMessage={sendMessage}
              setIsOpen={setIsOpen}
              mode="dark"
            />
          </div>
        )}
            </div>
    </>
  );
}
