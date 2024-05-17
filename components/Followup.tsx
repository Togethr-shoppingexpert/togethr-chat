import React, { useState } from 'react';
import { FaRegLightbulb } from "react-icons/fa";
import { Button } from './ui/button';

interface FollowupProps {
  containerWidth: number;
  followup: string[];
  isOpen:boolean;
  setUserMessage: (message: string) => void;
  sendMessage: (message: string) => void;
  setIsOpen: (isOpen: boolean) => void;

}

const Followup: React.FC<FollowupProps> = ({ containerWidth, followup, isOpen, setUserMessage,sendMessage,setIsOpen }) => {
  return (
    <div className="relative w-full">
      
    {isOpen && (
      <div className="relative bg-black text-white p-4 rounded-t-lg shadow-lg z-10 w-full transition ">
        <h3 className="text-left font-bold mb-5">Related</h3>
        
        {/* <ul className="list-disc list-inside"> */}
          {followup.map((ques, index) => (
            <div key={index}>
            <div onClick={()=>{sendMessage(ques);setIsOpen(!isOpen);}}  className='my-1 p-1 cursor-pointer' key={index}><h4>{ques}</h4></div>
            {index!=followup.length-1&&
            <hr className="my-2 border-b-2 border-[#222222]" />
}
            </div>
          ))}
        {/* </ul> */}
      </div>
    )}
  </div>
  )
};

export default Followup;