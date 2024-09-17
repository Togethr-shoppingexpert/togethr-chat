'use client'
import { useState , useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoIosArrowForward } from "react-icons/io";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContentContext } from "@/ContentContext";

interface ChatInputProps {
    initialText: string; // Define initialText prop
    onInputChange: (newValue: string) => void; // Define onInputChange prop
    searchQuery : string;
    convnId:string;
    handleName:string;
    mode:"light"|"dark"
}


export function ChatInput({ initialText, onInputChange , searchQuery,convnId, mode, handleName }: ChatInputProps) {
    // Define a state to manage the input value
    const [inputValue, setInputValue] = useState(initialText);
    const router = useRouter();

    const { 
        setIsChatOpen,
      } = useContentContext();
    

    // Handle input change
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue); // Update input value state
        onInputChange(newValue); // Call the onInputChange callback with the new value
    };
    
    const handleClick = () => {
        console.log("Button clicked");
        router.push(`/search/${searchQuery}/${initialText}?convid=${convnId}/${handleName}`);
        setIsChatOpen(true);
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
        <div className={`w-full md:max-w-2xl xl:max-w-2xl lg:max-w-2xl sm:max-w-2xl  ${mode==="dark"?"h-[60px]":"h-[56px]"} flex justify-center items-center space-x-2 ${mode === "dark" ? "bg-[#2e2f2f]" : "bg-white"} px-[6px]  rounded-lg `}>
            <div className={`flex w-full max-w-2xl justify-between  h-[49px] ${mode === "dark" ? "bg-[#242424]" : "bg-white"}    items-center space-x-2  px-[6px]  rounded-xl`}>
            <Input
                type="email"
                placeholder="Find your product"
                className={`${mode === "dark" ? "bg-[#242424] text-white" : "bg-white text-black"} transition  border-none outline-none focus:outline-none focus:border-none   rounded-xl  font-semibold `}
                value={initialText} // Bind input value to state
                onChange={handleInputChange} // Call handleInputChange function on input change
                
            />

            <Button
                type="button"
                className="bg-[#2196F3] flex justify-center items-center opacity-100 cursor-pointer text-2xl h-[45px] md:text-2xl lg:text-3xl hover:bg-[#568bf6]  rounded-xl border-none  w-[45px] md:w-[45px]"
                onClick={handleClick}
                disabled={!initialText.trim()}
            >
                <div className='flex items-center justify-center mb-1' >
                          &gt;
                          </div>
            </Button>
            </div>
        </div>
    );
}
