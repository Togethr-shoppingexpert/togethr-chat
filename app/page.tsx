"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "../components/shared/Navbar";
import { ChatInput } from "@/components/shared/ChatInput";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { config } from "../constants";
const API_ENDPOINT = config.url;
console.log("API_ENDPOINT: ", API_ENDPOINT);

export default function Home() {
  const [selectedText, setSelectedText] = useState("");
  const [guestID, setGuestID] = useState("");
  const [token, setToken] = useState("");
  const [sessionID, setSessionID] = useState(""); // State to hold session ID
  const [convnId, setConversationId] = useState("");

  const authTokenRef = useRef<string | null>(null); // Ref to hold the authentication token

  // guestsignup and localstorage logic
  useEffect(() => {
    const storedGuestID = localStorage.getItem("UserID");
    const storedToken = localStorage.getItem("token");

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
      const response = await fetch(
        `https://${API_ENDPOINT}/api/guest-auth/signup`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
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
      localStorage.setItem("UserID", data.User.UserId);

      localStorage.setItem("token", data.token);
      authTokenRef.current = data.token;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (newValue: string) => {
    setSelectedText(newValue);
  };

  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        const authToken = localStorage.getItem("token");
        console.log("Retrieved token:", authToken);
        if (authToken) {
          authTokenRef.current = authToken;
        } else {
          console.log("Token not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchAuthToken();
  }, []);

  useEffect(() => {
    const getSessionId = async () => {
      try {
        const response = await fetch(
          `https://${API_ENDPOINT}/api/WebChatbot/conversationId`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokenRef.current}`,
            },
            body: JSON.stringify({
              platform: "web",
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          const newConversationId = data.ConversationId;
          sessionStorage.setItem("conversationId", newConversationId); // Store conversation ID in local storage
          sessionStorage.removeItem("chatstarted");
          localStorage.setItem("conversationId", newConversationId); // Store conversation ID in local storage
          localStorage.removeItem("chatstarted");
          setConversationId(newConversationId);
        } else {
          console.error(
            "Failed to fetch conversation ID:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching conversation ID:", error);
      }
    };

    getSessionId();
  }, []);

  console.log(token);

  const buttons = [
    "Bluetooth earbuds",
    "Phones with great camera",
    "Air purifier for office",
    "Massager for neck pain",
    "Gaming chair for home ",
    "Bicycle for city rides",
  ];

  const handleBadgeClick = (text: string) => {
    setSelectedText(text);
  };

  const userId = guestID;

  return (
    <>
      <main className="bg-[#111111]">
        <Navbar />
        <div className="flex flex-col w-[70%] items-center mt-28 h-screen mx-auto">
          <div className="w-full flex flex-col items-center mb-4 px-4 text-center ">
            <h1 className="font-semibold text-xl md:text-4xl sm:text-2xl lg:text-4xl text-white mb-2">
              Let's Shop Togethr
            </h1>
          </div>

          <div className="w-[100%] flex justify-center mb-4">
            <ChatInput
              initialText={selectedText}
              onInputChange={handleInputChange}
              searchQuery={userId}
              convnId={convnId}
            />
          </div>
          <div className="w-[100%] md:max-w-2xl sm:max-w-2xl lg:max-w-2xl xl:max-w-2xl">
            <div className="grid  grid-cols-2 xl:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-3 w-[100%] gap-2">
              {buttons.map((text, index) => (
                <Badge
                  key={index}
                  className="text-[8px] md:text-[11px]  lg:text-[12px] xl:text-[14px] sm:text-[9px] hover:cursor-pointer bg-[#1A1A1A] text-[#999999] font-medium hover:bg-[#0C8CE9] hover:text-white py-1  transition ease-in-out shadow-sm"
                  onClick={() => handleBadgeClick(text)}
                >
                  {text}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
