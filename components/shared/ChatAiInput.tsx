'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoIosArrowForward } from "react-icons/io";
// import Link from 'next/link';

interface ChatAiInputProps {
    initialText: string; // Define initialText prop
    onInputChange: (newValue: string) => void; // Define onInputChange prop
}

export function ChatAiInput({ initialText, onInputChange }: ChatAiInputProps) {
    // Define a state to manage the input value
    const [inputValue, setInputValue] = useState(initialText);
    const [disable , isDisabled] = useState(false);

    // Handle input change
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue); // Update input value state
        onInputChange(newValue); // Call the onInputChange callback with the new value
    };

    // const shouldDisableButton = () => {
    //     return inputValue.trim() === ''; // Disable button if input is empty or contains only whitespace
    // };

    return (
        <div className="flex w-full max-w-2xl h-[58px] items-center space-x-2">
            <Input
                type="email"
                placeholder="Find your product"
                className="transition border-pink-500 focus:border-pink-600 shadow-lg shadow-pink-200 rounded-xl h-full"
                value={initialText} // Bind input value to state
                onChange={handleInputChange} // Call handleInputChange function on input change
            />

            
            <Button type="submit" className="bg-[#FF58A8] hover:bg-pink-600 font-bold rounded-xl focus:border-pink-600 h-[58px]  w-[58px] md:w-[65px]">
                <IoIosArrowForward className='h-2/3'/>
            </Button>
           
        </div>
    );
}
