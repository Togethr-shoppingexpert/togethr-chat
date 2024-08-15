"use client";
import FooterNav from "@/components/FooterNav";
import HeroResult from "@/components/HeroResult";
import NameCards from "@/components/NameCards";
import WishlistUI from "@/components/WishlistUI";
import Navbar from "@/components/shared/Navbar";
import Followup from "@/components/Followup";
import React, { useRef, useState } from "react";
import { useContentContext } from "@/ContentContext";

export default function page() {
    const [containerWidth, setContainerWidth] = useState<number>(0);

    const { followupSourcesVisible, 
        followup, 
        isOpen, 
        setIsOpen, 
        followupQues, 
        setUserMessage,
      } = useContentContext();
    
      const messagesEndRef = useRef<HTMLDivElement>(null);





  console.log("wishlist");
  return (
    <>
      <div className="w-[100%] h-full overflow-y-scroll pt-0 p-4 order-1 flex flex-col items-center justify-end">
               
              <HeroResult />
              console.log('upper followup questions in discover', {followup});
              console.log({followupSourcesVisible});
              console.log({followupQues});
              <div ref={messagesEndRef} />
              {true && followup && followup.length > 0 && (
                <div>
                    console.log('followup questions in discover', followupQues);
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
