'use client'
import { useState } from 'react';
import Navbar from "../components/shared/Navbar";
import { ChatInput } from "@/components/shared/ChatInput";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [selectedText, setSelectedText] = useState("");

  const handleInputChange = (newValue: string) => {
    setSelectedText(newValue);
  };

  const buttons = [
    "Best Performance laptop?",
    "Best headphones in 2024?",
    "Compare iphone 14 and Iphone 15",
    "Electronics",
    "Fashion",
    "Sports gears"
  ];

  const handleBadgeClick = (text: string) => {
    setSelectedText(text);
  };

  return (
    <>
      <main className="bg-[#F4F7FE]">
        <Navbar />
        <div className="flex flex-col items-center justify-center my-28 ">
          <h1 className="font-bold sm:text-3xl md:text-3xl lg:text-4xl my-6 text-[#1B2559]">Lets Shop Togethr</h1>
          <ChatInput initialText={selectedText} onInputChange={handleInputChange} />
          <div className="grid grid-cols-3 my-6 gap-2">
            {buttons.map((text, index) => (
              <Badge
                key={index}
                className="text-xs hover:cursor-pointer bg-white text-black font-medium hover:bg-[#2D29F8] hover:text-white py-1 shadow-md flex items-center justify-center transition ease-in-out"
                onClick={() => handleBadgeClick(text)}
              >
                {text}
              </Badge>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
