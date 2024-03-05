'use client'
import { useState , useEffect } from 'react';
import Navbar from "@/components/shared/Navbar";
import { ChatAiInput } from "@/components/shared/ChatAiInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import QueryForm from "@/components/QueryForm";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";

interface Params {
  slug: string[];
}

export default function page({params} : {params:Params}) {

  const [userMessage, setUserMessage] = useState("");

  let { slug } = params;
  let userId = slug[0];
  console.log(slug);
  console.log(userId); 

  useEffect(() => {
    // Fetch token from local storage when component mounts
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const [authToken, setAuthToken] = useState<string | null>(null);
  console.log(authToken);


  const handleInputChange = (newValue: string) => {
    setUserMessage(newValue);  
  };

  const sendMessage = async () => {
    try {
      const response = await fetch('http://43.205.216.141/api/WebChatbot/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include bearer token in the request headers
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          userMessage,
          id: userId
        })
      });

      if (response.ok) {
        console.log(await response.json());
      } else {
        console.error('Failed to send message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };



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

  

{/* <div className='w-full  p-5'>
<QueryForm steps={steps}/>
</div>
   */}
        



        </div>
      </section>

      <footer className="fixed bottom-0 w-full flex justify-center mt-5  p-5 bg-[#F4F7FE]">
        {/* <ChatAiInput initialText={selectedText} onInputChange={handleInputChange} /> */}
        <div className="flex w-full max-w-2xl h-[58px] items-center space-x-2">
        <Input
              type="email"
              placeholder="Find your product"
              className="transition border-pink-500 focus:border-pink-600 shadow-lg shadow-pink-200 rounded-xl h-full"
              value={userMessage}
              onChange={(e) => handleInputChange(e.target.value)}
            />

            
     <Button type="submit" className="bg-[#FF58A8] hover:bg-pink-600 font-bold rounded-xl focus:border-pink-600 h-[58px]  w-[58px] md:w-[65px]" onClick={sendMessage}>
       <IoIosArrowForward className='h-2/3'/>
     </Button>
           
        </div>
      </footer>
    </main>
  );
}
