'use client'
import { useState } from 'react';
import Navbar from "@/components/shared/Navbar";
import { ChatAiInput } from "@/components/shared/ChatAiInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import QueryForm from "@/components/QueryForm";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IoIosArrowForward } from "react-icons/io";


export default function page() {
  const [selectedText, setSelectedText] = useState("");

  const handleInputChange = (newValue: string) => {
    setSelectedText(newValue);
  };

  // Example data for checkbox options
const options = [
  { id: 1, label: 'Option 1' },
  { id: 2, label: 'Option 2' },
  { id: 3, label: 'Option 3' },
  { id: 4, label: 'Option 4' },
  { id: 5, label: 'Option 4' },
  { id: 6, label: 'Option 4' },
  { id: 7, label: 'Option 4' },
  { id: 8, label: 'Option 4' },
  { id: 9, label: 'Option 4' },
  { id: 10, label: 'Option 4' },
  { id:11, label: 'Option 4' },
  { id: 12, label: 'Option 4' },
  { id: 13, label: 'Option 4' },
  { id: 14, label: 'Option 4' },
  { id:15, label: 'Option 4' },
  { id: 16, label: 'Option 4' },
  { id: 17, label: 'Option 4' },
];

const steps = [
  {
    question: 'Question 1 ?',
    options: [
      { id: 1, label: 'Option 1' },
      { id: 2, label: 'Option 2' },
      { id: 3, label: 'Option 3' },
      { id: 4, label: 'Option 4' }
    ]
  },
  {
    question: 'Question 2 ?',
    options: [
      { id: 5, label: 'Option 5' },
      { id: 6, label: 'Option 6' },
      { id: 7, label: 'Option 7' },
      { id: 8, label: 'Option 8' },
    ]
  },
  {
    question: 'Question 3 ?',
    options: [
      { id: 9, label: 'Option 8' },
      { id: 10, label: 'Option 10' },
      { id: 11, label: 'Option 11' },
      { id: 12, label: 'Option 12' }
    ]
  },
  {
    question: 'Question 4 ?',
    options: [
      { id: 13, label: 'Option 13' },
      { id: 14, label: 'Option 14' },
      { id: 15, label: 'Option 15' },
      { id: 16, label: 'Option 16' }
    ]
  },
  {
    question: 'Question 5 ?',
    options: [
      { id: 17, label: 'Option 17' },
      { id: 18, label: 'Option 18' },
      { id: 19, label: 'Option 19' },
      { id: 20, label: 'Option 20' }
    ]
  }
    // Add more steps as needed
  ];


  
  return (
    <main className="bg-[#F4F7FE]">
      <Navbar />

      <section className="flex justify-center h-full mb-5 bp-0 ">
        <div className="md:max-w-2xl max-w-sm mt-5 mb-10 h-full p-0 ">

        <div className="flex flex-row gap-4 mx-1 md:mx-6 my-5">
            <div className="flex w-max max-w-[75%] flex-col font-medium gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm ml-auto bg-[#2D29F8] text-primary-foreground">Hey, I'm having trouble with my account.</div>
            <Avatar className="shadow-lg">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>


          <div className="flex flex-row gap-4 mx-1 md:mx-6 my-5">
            <Avatar className="shadow-md z-10">
              <AvatarImage src="/ai.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex w-max max-w-[75%] font-medium flex-col gap-2 text-[#94A3B8] rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm bg-[#FFFFFF]">Great! I'd be happy to help you find a road bicycle. To start off, could you let me know what are your preferences, by answering following questions.</div>
          </div>

          {/* <div className="flex flex-row gap-4 mx-6 my-5">
            <div className="flex w-max max-w-[75%] flex-col font-medium gap-2 rounded-xl shadow-lg px-3 py-2 text-sm ml-auto bg-[#2D29F8] text-primary-foreground">Hey, I'm having trouble with my account.</div>
            <Avatar className="shadow-lg">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div> */}

{/* <div className='w-full  p-5'>
<QueryForm steps={steps}/>
</div>
   */}
          
          <div className="flex flex-row gap-4 mx-1 md:mx-6 my-5">
            <div className="flex w-max max-w-[75%] flex-col font-medium gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm ml-auto bg-[#2D29F8] text-primary-foreground">Hey, I'm having trouble with my account.</div>
            <Avatar className="shadow-lg">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>


          
          <div className="flex flex-row gap-4 mx-1 md:mx-6 my-5">
            <div className="flex w-max max-w-[75%] flex-col font-medium gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm ml-auto bg-[#2D29F8] text-primary-foreground">Hey, I'm having trouble with my account.</div>
            <Avatar className="shadow-lg">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>


          
          <div className="flex flex-row gap-4 mx-1 md:mx-6 my-5">
            <div className="flex w-max max-w-[75%] flex-col font-medium gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm ml-auto bg-[#2D29F8] text-primary-foreground">Hey, I'm having trouble with my account.</div>
            <Avatar className="shadow-lg">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-row gap-4 mx-1 md:mx-6 my-5">
            <div className="flex w-max max-w-[75%] flex-col font-medium gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm ml-auto bg-[#2D29F8] text-primary-foreground">Hey, I'm having trouble with my account.</div>
            <Avatar className="shadow-lg">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>



          <div className="flex flex-row gap-4 mx-1 md:mx-6 my-5">
            <div className="flex w-max max-w-[75%] flex-col font-medium gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm ml-auto bg-[#2D29F8] text-primary-foreground">Hey, I'm having trouble with my account.</div>
            <Avatar className="shadow-lg">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>


          <div className="flex flex-row gap-4 mx-1 md:mx-6 my-5">
            <div className="flex w-max max-w-[75%] flex-col font-medium gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm ml-auto bg-[#2D29F8] text-primary-foreground">Hey, I'm having trouble with my account.</div>
            <Avatar className="shadow-lg">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>


          
          <div className="flex flex-row gap-4 mx-1 md:mx-6 my-5">
            <div className="flex w-max max-w-[75%] flex-col font-medium gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm ml-auto bg-[#2D29F8] text-primary-foreground">Hey, I'm having trouble with my account.</div>
            <Avatar className="shadow-lg">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-row gap-4 mx-1 md:mx-6 my-5">
            <Avatar className="shadow-md">
              <AvatarImage src="/ai.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex w-max max-w-[75%] font-medium flex-col gap-2 text-[#94A3B8] rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm bg-[#FFFFFF]">Great! I'd be happy to help you find a road bicycle. To start off, could you let me know what are your preferences, by answering following questions.</div>
          </div>


          <div className="flex flex-row gap-4 mx-1 md:mx-6 my-5">
            <Avatar className="shadow-md">
              <AvatarImage src="/ai.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex w-max max-w-[75%] font-medium flex-col gap-2 text-[#94A3B8] rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm bg-[#FFFFFF]">Great! I'd be happy to help you find a road bicycle. To start off, could you let me know what are your preferences, by answering following questions.</div>
          </div>



        </div>
      </section>

      <footer className="fixed bottom-0 w-full flex justify-center mt-5  p-5 bg-[#F4F7FE]">
        {/* <ChatAiInput initialText={selectedText} onInputChange={handleInputChange} /> */}
        <div className="flex w-full max-w-2xl h-[58px] items-center space-x-2">
            <Input
                type="email"
                placeholder="Find your product"
                className="transition border-pink-500 focus:border-pink-600 shadow-lg shadow-pink-200 rounded-xl h-full"
            />

            
            <Button type="submit" className="bg-[#FF58A8] hover:bg-pink-600 font-bold rounded-xl focus:border-pink-600 h-[58px]  w-[58px] md:w-[65px]">
                <IoIosArrowForward className='h-2/3'/>
            </Button>
           
        </div>
      </footer>
    </main>
  );
}
