'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoIosArrowForward } from "react-icons/io";
import Link from 'next/link';

interface ChatInputProps {
    initialText: string; // Define initialText prop
    onInputChange: (newValue: string) => void; // Define onInputChange prop
}

export function ChatInput({ initialText, onInputChange }: ChatInputProps) {
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
        <div className="flex w-full max-w-lg items-center space-x-2">
            <Input
                type="email"
                placeholder="Find your product"
                className="transition border-pink-500 focus:border-pink-600 shadow-lg shadow-pink-200"
                value={initialText} // Bind input value to state
                onChange={handleInputChange} // Call handleInputChange function on input change
            />

            <Link  href={`/search/${initialText}`}>
            <Button type="submit" className="bg-pink-400 hover:bg-pink-600 font-bold rounded-lg focus:border-pink-600">
                <IoIosArrowForward />
            </Button>
            </Link>
        </div>
    );
}
