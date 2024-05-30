import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

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
  const [isAccordionOpen, setIsAccordionOpen] = useState(!isOpen);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
    setIsOpen(!isOpen);
  };

  // useEffect(() => {
  //   if (isAccordionOpen && messagesEndRef.current) {
  //     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [isAccordionOpen, followup]);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen]);

  return (
    <div className={`relative w-full ${mode==="dark"?"bg-[#3c3b3b] text-white":"bg-white text-black"} p-1 rounded-lg`}>
      <div className={`flex justify-between items-center cursor-pointer p-2 ${mode==="dark"?"bg-[#3c3b3b] text-white":"bg-white text-black"}`} onClick={toggleAccordion}>
        <div>
        <h3 className="text-left font-bold ">FAQ</h3>
        </div>
        <div className="flex items-center">
          {isAccordionOpen ? (
            <FaChevronUp className="transition-transform duration-300 transform rotate-180" />
          ) : (
            <FaChevronDown className="transition-transform duration-300" />
          )}
        </div>
      </div>
      
      {isAccordionOpen && (
        <div className={`relative ${mode==="dark"?"bg-[#3c3b3b] text-white":"bg-white text-black"} p-4 rounded-t-lg z-10 w-full transition`}>
          {followup && followup.map((ques, index) => (
            <div key={index}>
              <div className='flex justify-between items-center w-full cursor-pointer' onClick={() => { sendMessage(ques);setIsOpen(!isOpen);  setIsAccordionOpen(!isAccordionOpen)}}>
                <div  className=' p-1 cursor-pointer' key={index}><h4>{ques}</h4></div>
                <div className='font-semibold'><h4>+</h4></div>
              </div>
              {index !== followup.length - 1 &&
                <hr className="my-2 border-b-2 border-[#222222]" />}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default Followup;
