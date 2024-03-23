'use client'
import { useState, useEffect , useRef } from 'react';
import Navbar from "../components/shared/Navbar";
import { ChatInput } from "@/components/shared/ChatInput";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [selectedText, setSelectedText] = useState("");
  const [guestID, setGuestID] = useState("");
  const [token, setToken] = useState("");
  const [sessionID, setSessionID] = useState(""); // State to hold session ID
  const authTokenRef = useRef<string | null>(null); // Ref to hold the authentication token



  // guestsignup and localstorage logic
  useEffect(() => {
    const storedGuestID = localStorage.getItem('UserID');
    const storedToken = localStorage.getItem('token');
    
    if (storedGuestID && storedToken) {
      setGuestID(storedGuestID);
      setToken(storedToken);
    } else {
      // Fetch API only if guestID and token are not stored in local storage
      fetchGuestAuthSignup();
    }
  }, []);

  const fetchGuestAuthSignup = async () => {
    try {
      const response = await fetch('https://govoyr.com/api/guest-auth/signup');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      //.guest ---> .User
      //.guestId ---> UserId
      // setGuestID(data.guest.GuestId);
      // setToken(data.token);

      setGuestID(data.User.UserId);
      setToken(data.token);
      // Store guestID and token in local storage
      // localStorage.setItem('guestID', data.guest.GuestId);
      localStorage.setItem('UserID', data.User.UserId);

      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (newValue: string) => {
    setSelectedText(newValue);
  };



// fetch authtoken from localstorage. 
useEffect(() => {
  const fetchAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      authTokenRef.current = token;
    } else {
      console.log("token not found");
    }
  };
fetchAuthToken();
}, []);



//session id logic
//to get conversation ID 
useEffect(() => {
  const getSessionId = async () => {
    try {
      const response = await fetch('https://govoyr.com/api/WebChatbot/conversationId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokenRef.current}`,
        },
        body: JSON.stringify({
          platform: "web",
        })
      });
      if (response.ok) {
        const data = await response.json();
        const newConversationId = data.ConversationId;
        sessionStorage.setItem('conversationId', newConversationId); // Store conversation ID in local storage
      }else {
        console.error('Failed to fetch conversation ID:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching conversation ID:', error);
    }
  }

  getSessionId();
}, []);

  const buttons = [
    "bluetooth earbuds for running",
    "phones with great camera",
    "massager for neck pain",
    "air purifier to combat pollution",
    "ergonomic chair for home office",
    "bicycle for city rides"
  ];

  const handleBadgeClick = (text: string) => {
    setSelectedText(text);
  };

  const userId = guestID;


  return (
    <>
      <main className="bg-[#111111]">
        <Navbar />
        <div className="flex flex-col items-center justify-center my-28">
          <div className='w-full md:w-2/3 flex justify-start md:justify-center mb-4 px-4'>
            
          <h1 className="font-semibold text-[35px] md:text-3xl lg:text-4xl text-white">Let's Shop Togethr</h1>
          {/* <span className='text-white'>preview</span> */}
          </div>
          
          <div className='w-full flex justify-center mx-18 px-[15px]'>
            <ChatInput initialText={selectedText} onInputChange={handleInputChange} searchQuery={userId} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3  md:w-1/2  my-6 gap-2">
            {buttons.map((text, index) => (
              <Badge
                key={index}
                className="text-[10px] sm:text-[10px] md:text-[12px] hover:cursor-pointer bg-[#1A1A1A] text-[#999999] font-medium hover:bg-[#0C8CE9] hover:text-white py-1 flex items-center justify-center transition ease-in-out shadow-sm"
                onClick={() => handleBadgeClick(text)}
              >
                {text}
              </Badge>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
