'use client'
import { useState , useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoIosArrowForward } from "react-icons/io";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ChatInputProps {
    initialText: string; // Define initialText prop
    onInputChange: (newValue: string) => void; // Define onInputChange prop
    searchQuery : string;
    convnId:string;
}


export function ChatInput({ initialText, onInputChange , searchQuery,convnId }: ChatInputProps) {
    // Define a state to manage the input value
    const [inputValue, setInputValue] = useState(initialText);
    const router = useRouter();

    // Handle input change
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue); // Update input value state
        onInputChange(newValue); // Call the onInputChange callback with the new value
    };

    const handleClick = () => {
        console.log("Button clicked");
        router.push(`/search/${searchQuery}/${initialText}?convid=${convnId}`);
    }

    const handleKeyDown = (event : KeyboardEvent) => {
        if (event.key === "Enter") {
            handleClick();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [initialText, searchQuery]); // Add initialText and searchQuery as dependencies

    return (
        <div className="w-full max-w-2xl h-[65px] items-center space-x-2 bg-[#1A1A1A] px-[6px] py-1 rounded-xl ">
            <div className="flex w-full max-w-2xl  h-[56px] bg-black items-center space-x-2  px-[6px] py-2 rounded-xl">
            <Input
                type="email"
                placeholder="Find your product"
                className="transition border-none bg-black shadow-lg rounded-xl text-white h-full"
                value={initialText} // Bind input value to state
                onChange={handleInputChange} // Call handleInputChange function on input change
                
            />

            <Button
                type="button"
                className="bg-[#0C8CE9] cursor-pointer text-2xl h-[50px] md:text-2xl lg:text-3xl hover:bg-[#0f7dcb]  rounded-xl focus:border-pink-600   w-[58px] md:w-[58px]"
                onClick={handleClick}
                disabled={!initialText.trim()}
            >
                          &gt;

            </Button>
            </div>
        </div>
    );
}
