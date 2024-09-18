import React, { FC, useState,useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useContentContext } from "@/ContentContext";
import { FaUser, FaSignOutAlt, FaBars } from "react-icons/fa";
import SidePanel from "../ConversationHistory"; // Use SidePanel instead of ConvHistory

interface NavbarProps {
  mode: "light" | "dark";
  onContentChange: (content: string) => void;
  activeContent: string;
}

const Navbar: FC<NavbarProps> = ({ mode, onContentChange, activeContent }) => {
  const { isChatStarted, setMessages, productsHistory, setIsChatStarted } =
    useContentContext();

  const { isContentAvailable } = useContentContext();

  const router = useRouter();
  const pathname = usePathname();

  const [isProfileBoxVisible, setIsProfileBoxVisible] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false); 
  const [buttonClicked, setButtonClicked] = useState(false);// State to control the side panel visibility

  useEffect(() => {
    const handleName = localStorage.getItem("handle_name");
    if (handleName) {
      setButtonClicked(true); // Set buttonClicked to true if handle_name is present in localStorage
    }
  }, []);

  const handleInputChange = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setMessages([]);
    if (pathname === "/") {
      e.preventDefault(); // Prevent default navigation
      router.push("/"); // Navigate to the homepage programmatically
      window.location.reload(); // Force a full page reload
    }
  };

  const isActive = (content: string) => activeContent === content;

  const handleLogout = () => {
    // Perform logout operation (e.g., clearing tokens, redirecting to login page)
    localStorage.removeItem("token");
    localStorage.removeItem("conversationId");
    router.push("/login"); // Redirect to the login page
  };

  const handleCreatorClick = () => {
    if (buttonClicked) {
      // Stop chat and remove handle_name from localStorage
      alert("Chat with the creator stopped!");
      localStorage.removeItem("handle_name");
    } else {
      // Start chat and set handle_name in localStorage
      alert("Chat with the creator started!");
      localStorage.setItem("handle_name", "@tech_wiser");
    }
    setButtonClicked(!buttonClicked);
  };

  const toggleSidePanel = () => {
    setIsSidePanelOpen((prev) => !prev); // Toggle the side panel visibility
  };

  return (
    <nav
      className={`sticky left-0 top-0 z-50 ${
        mode === "dark" ? "bg-[#2e2f2f]" : "bg-white"
      }`}
    >
      <div className="px-5 lg:px-[2%] flex justify-center">
        <div className="w-full flex h-max justify-between items-center">
          {/* Toggle Button */}
          <div className="flex gap-3">
          <button
              onClick={toggleSidePanel}
              className="p-2 text-lg cursor-pointer"
            >
              <FaBars
                className={`text-${mode === "dark" ? "white" : "black"} text-xl`}
              />
            </button>

          {/* Togethr Logo */}
          <Link
            href="/"
            onClick={handleInputChange}
            className="flex items-center py-1 lg:py-4 px-2"
          >
            <div className="w-6 lg:w-10">
              <Image
                src={`${mode === "dark" ? "/icon2.png" : "/favicon.png"}`}
                alt="togethr"
                width={40}
                height={40}
              />
            </div>
            <span
              className={`font-bold ${
                mode === "dark" ? "text-white" : "text-[#080808]"
              } rounded-md p-2 text-lg md:text-xl lg:text-2xl`}
            >
              Togethr
            </span>
          </Link>
          </div>

          {/* Other Navbar Elements */}
          {isChatStarted ? (
  (isContentAvailable || productsHistory.length > 0) && (
    <div className="items-center gap-x-4 hidden md:flex">
      <div
        className={`w-max text-lg font-semibold px-4 p-1 rounded-lg cursor-pointer
          ${isActive("discover") ? "bg-[#f5f5f58a] text-black" : "hover:bg-[#f5f5f58a] text-white transition-all duration-500"}`}
        onClick={() => (isContentAvailable || productsHistory.length > 0) && onContentChange("discover")}
      >
        Discover
      </div>
      <div
        className={`w-max text-lg font-semibold px-4 p-1 rounded-lg cursor-pointer
          ${isActive("guide") ? "bg-[#f5f5f58a] text-black" : "hover:bg-[#f5f5f58a] text-white transition-all duration-500"}`}
        onClick={() => (isContentAvailable || productsHistory.length > 0) && onContentChange("guide")}
      >
        Buying Guide
      </div>
      <div
        className={`w-max text-lg font-semibold px-4 p-1 rounded-lg cursor-pointer
          ${isActive("wishlist") ? "bg-[#f5f5f58a] text-black" : "hover:bg-[#f5f5f58a] text-white transition-all duration-500"}`}
        onClick={() => (isContentAvailable || productsHistory.length > 0) && onContentChange("wishlist")}
      >
        Wishlist
      </div>
    </div>
  )
) : (
  <div className="flex justify-center mt-4">
  <button
    className={`px-4 py-2 font-semibold rounded ${
      buttonClicked ? "bg-[#f5f5f58a] text-black" : "bg-[#2196F3] text-white"
    } hover:bg-[#1e7cd0] hover:text-white transition ease-in-out`}
    onClick={handleCreatorClick}
  >
    {buttonClicked ? "Stop Chatting with Creator" : "Chat with Creator"}
  </button>
</div>
)}
        </div>
      </div>

      {/* Side Panel */}
      {isSidePanelOpen && (
        <div className="">
          <SidePanel isOpen={isSidePanelOpen} setIsOpen={setIsSidePanelOpen} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
