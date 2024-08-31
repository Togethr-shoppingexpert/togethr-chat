// components/Layout.tsx
import { ReactNode } from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/shared/Navbar";
import BuyingGuide from "@/app/guide/page";
import Wishlist from "@/app/wishlist/page";
import Content from "@/app/content/page";
import Discover from "@/app/discover/discover";
import Chat from "./Chat";
import FooterNav from "./FooterNav";
import { useContentContext } from "@/ContentContext";

interface LayoutProps {
  sendMessage: (message: string) => void;

}

export default function Layout({ sendMessage }: LayoutProps) {
  const [activeContent, setActiveContent] = useState<string | null>(null);

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isTabletScreen, setIsTabletScreen] = useState(false);
  const [isLargerScreen, setIsLargerScreen] = useState(false);

  const { 
    isContentAvailable,
    isChatOpen,
    setIsChatOpen
  } = useContentContext();


  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsSmallScreen(screenWidth <= 768);
      setIsTabletScreen(screenWidth > 768 && screenWidth <= 1024);
      setIsLargerScreen(screenWidth > 1024);
    };

  

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleContentChange = (content: string) => {
    console.log('activeContent', content);
    setActiveContent(content);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const renderContent = () => {
    switch (activeContent) {
      case 'discover':
        return <Discover sendMessage={sendMessage} />;
      case 'guide':
        return <BuyingGuide />;
      case 'wishlist':
        return <Wishlist />;
      case 'content':
        return <Content />;
      default:
        return <Discover sendMessage={sendMessage} />; // Default to Discover if no other content is selected
    }
  };

  return (
    <div className="w-full ">
      <Navbar mode="dark" onContentChange={handleContentChange} />
      <div className="flex flex-col">
        <main className={`pt-10 ${isLargerScreen ? 'w-[70%]' : 'w-[100%] p-4'}`}>
          {renderContent()}         
        </main>
        {/*<div className="fixed right-0 top-0 w-[400px] overflow-y-scroll order-2 products-height border-l-8 border-[#2e2f2f]">
          <Chat sendMessage={sendMessage} />
        </div>*/}
        {isSmallScreen ? (
          <FooterNav onContentChange={handleContentChange} />
        ) : null}

        {!isSmallScreen && !isTabletScreen ? (
          <div className="fixed right-0 top-0 w-[400px] overflow-y-scroll products-height border-l-8 border-[#2e2f2f]">
            <Chat sendMessage={sendMessage} />
          </div>
        ) : (
          <>
            {isChatOpen ? (
              <div className={`fixed bottom-[66px]  ${isTabletScreen ? 'right-0 w-[60%]' : 'left-0 w-full'} h-[80%] bg-white shadow-lg rounded-lg z-50`}>
                <div className="flex justify-between p-4 border-b bg-[#2e2f2f] rounded-t-lg">
                  <h2 className="text-lg font-bold text-white">Chat</h2>
                  <button className="text-[#a7a7a7]" onClick={toggleChat}>Close</button>
                </div>
                <div className="overflow-y-scroll h-[calc(100%-80px)] bg-[#202222]">
                  <Chat sendMessage={sendMessage} />
                </div>
              </div>
            ) : (
              <div className="fixed bottom-[66px] w-full flex justify-center z-50">
                <button
                  className="p-3 bg-blue-600 text-white rounded-full shadow-lg"
                  onClick={toggleChat}
                >
                  Ask Anything
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
