import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useContentContext } from "@/ContentContext";

interface FollowupProps {
  containerWidth: number;
  followup: string[];
  isOpen: boolean;
  setUserMessage: (message: string) => void;
  sendMessage: (message: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  mode:"dark"|"light";
}

const Followup: React.FC<FollowupProps> = ({ mode,containerWidth, followup, isOpen, setUserMessage, sendMessage, setIsOpen }) => {
 // const [isAccordionOpen, setIsAccordionOpen] = useState(!isOpen);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { 
    setIsChatOpen,
  } = useContentContext();
 {/*} const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isAccordionOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isAccordionOpen]);*/}

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen]);

  return (

    <div className="max-w-2xl w-[672px] pt-10 max-md:w-[380px]">
          {followup && followup.length > 0 && (
      <>
    <div className="text-2xl w-full font-bold text-white my-4"><h4>Know More</h4></div>
    <div className={`mb-[100px] m-2 relative max-w-2xl ${mode==="dark"?"bg-[#3c3b3b] text-white":"bg-white text-black"} p-1 rounded-lg`}>
      
      <>
        
        {/*<h3 className="text-left font-bold pl-4 pt-3">FAQ</h3>
        
        <div className="flex items-center">
          {isAccordionOpen ? (
            <FaChevronUp className="transition-transform duration-300 transform rotate-180" />
          ) : (
            <FaChevronDown className="transition-transform duration-300" />
          )}
        </div>*/}
        </>
      
      
       
        <div className={`relative ${mode==="dark"?"bg-[#3c3b3b] text-white":"bg-white text-black"} p-4 rounded-t-lg z-10 w-full transition`}>
          {followup && followup.map((ques, index) => (
            <div key={index}>
              <div className='flex justify-between items-center w-full cursor-pointer' onClick={() => { sendMessage(ques);setIsOpen(!isOpen); setIsChatOpen(true);}}>
                <div  className='p-1 cursor-pointer' key={index}><h4>{ques}</h4></div>
                <div className='font-semibold'><h4>+</h4></div>
              </div>
              {index !== followup.length - 1 &&
                <hr className="my-2 border-b-2 border-[#222222]" />}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
   
    </div>
    </>
    )}
    </div>

  );
};

export default Followup;
