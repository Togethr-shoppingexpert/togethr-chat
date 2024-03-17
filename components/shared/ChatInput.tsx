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
}


export function ChatInput({ initialText, onInputChange , searchQuery }: ChatInputProps) {
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
        router.push(`/search/${searchQuery}/${initialText}`);
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
        <div className="flex w-full max-w-2xl h-[64px] items-center space-x-2 bg-[#1A1A1A] px-[6px] py-1 rounded-xl ">
            <Input
                type="email"
                placeholder="Find your product"
                className="transition border-[#141414] bg-black shadow-lg rounded-xl text-white h-full"
                value={initialText} // Bind input value to state
                onChange={handleInputChange} // Call handleInputChange function on input change
            />

            <Button
                type="button"
                className="bg-[#0C8CE9] hover:bg-[#0c8de99a] font-bold rounded-xl focus:border-pink-600 h-[58px]  w-[58px] md:w-[65px]"
                onClick={handleClick}
            >
                <IoIosArrowForward className='h-2/3'/>
            </Button>
        </div>
    );
}
