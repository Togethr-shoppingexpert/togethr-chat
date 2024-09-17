"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "../components/shared/Navbar";
import { ChatInput } from "@/components/shared/ChatInput";
import FeedbackPopup from "@/components/Feedback";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { FaSun, FaMoon } from "react-icons/fa"; 
import { config } from "../constants";
import { useContentContext } from "@/ContentContext";
const API_ENDPOINT = config.url;
console.log("API_ENDPOINT: ", API_ENDPOINT);


export default function Home() {
  const [selectedText, setSelectedText] = useState("");
  const [guestID, setGuestID] = useState("");
  const [token, setToken] = useState("");
  const [sessionID, setSessionID] = useState(""); // State to hold session ID
  const [convnId, setConversationId] = useState("");
  // const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return getThemeFromLocalStorage();
  });

  const defaultBuyingGuide = {
    buying_guide_text: "",
    buying_guide_starting_text: "",
    buying_guide_factors_options: [],
    buying_guide_specs_text: "",
    buying_guide_ending_text: "",
  };

  


  const {
    setVideoContent,
    setBlogsContent,
    setBuyingGuide,
    setIsChatStarted,
    setBestProducts,
    setShowFeedbackPopup,
    showFeedbackPopup
  } = useContentContext();


  const authTokenRef = useRef<string | null>(null); // Ref to hold the authentication token

  // guestsignup and localstorage logic
  useEffect(() => {
    const storedGuestID = localStorage.getItem("UserID");
    const storedToken = localStorage.getItem("token");
    // const storedConvid = sessionStorage.getItem("conversationId");
    setIsChatStarted(false);
    setBuyingGuide(defaultBuyingGuide);
    setBlogsContent([]);
    setVideoContent([]);
    setBestProducts([]);
    if (storedGuestID && storedToken) {
      setGuestID(storedGuestID);
      setToken(storedToken);
      authTokenRef.current = storedToken;
      // if (!storedConvid) {
        getSessionId(storedToken);
      // } else {
        // setConversationId(storedConvid);
      // }
    } else {
      fetchGuestAuthSignup();
    }
  }, []);

  const fetchGuestAuthSignup = async () => {
    try {
      const response = await fetch(`https://${API_ENDPOINT}/api/guest-auth/signup`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setGuestID(data.User.UserId);
      setToken(data.token);
      authTokenRef.current = data.token;
      localStorage.setItem("UserID", data.User.UserId);
      localStorage.setItem("token", data.token);
      getSessionId(data.token);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (newValue: string) => {
    setSelectedText(newValue);
  };

  const getSessionId = async (authToken: string) => {
    try {
      const response = await fetch(
        `https://${API_ENDPOINT}/api/WebChatbot/conversationId`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
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
        sessionStorage.removeItem("currentPageUrl");
        localStorage.setItem("conversationId", newConversationId); // Store conversation ID in local storage
        localStorage.removeItem("chatstarted");
        setConversationId(newConversationId);
      } else {
        console.error("Failed to fetch conversation ID:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching conversation ID:", error);
    }
  };

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

  // Toggle dark mode
  // function getThemeFromLocalStorage() {
	// 	const savedTheme = localStorage.getItem("darkmode");
	// 	if (savedTheme) {
	// 		setIsDarkMode(savedTheme);
	// 	}
	// }

	// function toggleDarkMode() {
	// 	setIsDarkMode((prevTheme) => {
	// 		const newTheme = prevTheme === "light" ? "dark" : "light";
	// 		localStorage.setItem("darkmode", newTheme);
	// 		return newTheme;
	// 	});
	// }

	// useEffect(() => {
	// 	getThemeFromLocalStorage();
	// }, [isDarkMode]);
  function getThemeFromLocalStorage() {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("darkmode");
      return savedTheme ? savedTheme === "dark" : true; // Default to dark mode
    }
    return true; // Default to dark mode
  }
  const toggleDarkMode = () => {
    setIsDarkMode((prevTheme) => {
      const newTheme = !prevTheme; // Toggle between true (dark) and false (light)
      localStorage.setItem("darkmode", newTheme ? "dark" : "light");
      return newTheme;
    });
  };
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkmode")||"dark";
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }

    window.addEventListener("storage", () => {
      setIsDarkMode(getThemeFromLocalStorage());
    });

    return () => {
      window.removeEventListener("storage", () => {
        setIsDarkMode(getThemeFromLocalStorage());
      });
    };
  }, []);

  const handleContentChange = (content: string) => {
    // No operation
  };

  return (
    <>
      <main className={`${isDarkMode ? "bg-[#202222]" : "bg-[#dde7eb]"} overflow-hidden`}>
        <Navbar mode={isDarkMode? "dark" : "light"} onContentChange={handleContentChange} activeContent=""/>
        {showFeedbackPopup && (
      <FeedbackPopup
        setShowFeedbackPopup={setShowFeedbackPopup}
      />
    )}
        <div className="flex flex-col w-[70%] items-center mt-28 h-screen mx-auto">
          <div className="w-full flex flex-col items-center mb-4 px-4 text-center ">
            <h1 className={`font-semibold text-xl md:text-4xl sm:text-2xl lg:text-4xl mb-2 ${isDarkMode ? "text-white" : "text-[#080808]"}`}>
              Let's Shop Togethr
            </h1>
          </div>

          <div className="w-[100%] flex justify-center mb-4">
            <ChatInput
              initialText={selectedText}
              onInputChange={handleInputChange}
              searchQuery={userId}
              convnId={convnId}
              mode={isDarkMode? "dark" : "light"}
            />
          </div>
          <div className="w-[100%] md:max-w-2xl sm:max-w-2xl lg:max-w-2xl xl:max-w-2xl">
            <div className="grid  grid-cols-2 xl:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-3 w-[100%] gap-2">
              {buttons.map((text, index) => (
                <Badge
                  key={index}
                  className={`text-[7px] md:text-[8px] lg:text-[9px] xl:text-[11px] sm:text-[8px] hover:cursor-pointer ${isDarkMode ? "bg-[#2e2f2f] text-white" : "bg-white text-black"}  font-medium hover:bg-[#2196F3] hover:text-white py-1 transition ease-in-out shadow-sm`}
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