import { ReactNode, useState, useEffect } from "react";
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
  const [activeContent, setActiveContent] = useState<string>("discover");
  const [visibleFactors, setVisibleFactors] = useState<number[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isTabletScreen, setIsTabletScreen] = useState(false);
  const [isLargerScreen, setIsLargerScreen] = useState(false);

  const { isContentAvailable, isContentLoading, isChatOpen, setIsChatOpen , initalbuyingGuide, productsHistory} =
    useContentContext();

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
    console.log("activeContent", content);
    setActiveContent(content);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const toggleDetails = (index: number) => {
    if (visibleFactors.includes(index)) {
      setVisibleFactors(visibleFactors.filter((i) => i !== index));
    } else {
      setVisibleFactors([...visibleFactors, index]);
    }
  };

  const renderContent = () => {
    if (isContentLoading && initalbuyingGuide.options.length > 0) {
      return (
        <div className="bg-[#202222] px-6 lg:px-[6%] flex flex-col items-center p-10 max-md:p-0">
                  <div className="max-w-2xl w-[700px] max-md:w-[100%] max-md:p-4">
          <div className="text-2xl w-full font-bold text-white my-4">
            <h4>Important factors</h4>
          </div>
          <div className="relative bg-[#3c3b3b] text-white py-2 px-4 rounded-t-lg z-10 w-full transition mb-5">
        {initalbuyingGuide.options.length > 0 ? (
          initalbuyingGuide.options.map((option, index) => (
            <div key={index}>
              <div
                className="flex justify-between items-center w-full cursor-pointer"
                onClick={() => toggleDetails(index)}
              >
                <div className="p-1 cursor-pointer">
                  <h4>{option}</h4>
                </div>
                <div className="font-semibold">
                  <h4>{visibleFactors.includes(index) ? "-" : "+"}</h4>
                </div>
                
              </div>
              {visibleFactors.includes(index) && (
                <p className="mt-2 whitespace-pre-wrap text-sm pl-4">
                  {initalbuyingGuide.explainations[index] || "No explanation provided."}
                </p>
              )}
              {index !== initalbuyingGuide.options.length &&
                                  <hr className="my-2 border-b-2 border-[#222222]" />}
            </div>
          ))
        ) : (
          <p>No options available.</p>
        )}
        </div>
        </div>
      </div>
      );
    }

    switch (activeContent) {
      case "discover":
        return <Discover sendMessage={sendMessage} />;
      case "guide":
        return <BuyingGuide />;
      case "wishlist":
        return <Wishlist />;
      case "content":
        return <Content />;
      default:
        return <Discover sendMessage={sendMessage} />; // Default to Discover if no other content is selected
    }
  };

  return (
    <div className="w-full ">
      <Navbar
        mode="dark"
        activeContent={activeContent}
        onContentChange={handleContentChange}
      />
      <div className="flex flex-col">
        <main
          className={` pt-10 ${isLargerScreen ? 'w-[70%]' : 'w-[100%] p-4'} `}
        >
          {renderContent()}
        </main>
        {isSmallScreen ? (
          <FooterNav onContentChange={handleContentChange} />
        ) : null}

        {!isSmallScreen && !isTabletScreen ? (
          <div className="fixed right-0 top-0 w-[400px] z-10 bg-[#202222] overflow-y-scroll products-height border-l-8 border-[#2e2f2f]">
            <Chat sendMessage={sendMessage} />
          </div>
        ) : (
          <>
            {isChatOpen ? (
              <div
                className={`fixed bottom-[66px]  ${
                  isTabletScreen ? "right-0 w-[60%]" : "left-0 w-full"
                } h-[80%] bg-white shadow-lg rounded-lg z-50`}
              >
                <div className="flex justify-between p-4 border-b bg-[#2e2f2f] rounded-t-lg">
                  <h2 className="text-lg font-bold text-white">Chat</h2>
                  <button className="text-[#a7a7a7]" onClick={toggleChat}>
                    Close
                  </button>
                </div>
                <div className="overflow-y-scroll h-[calc(100%-80px)] bg-[#202222]">
                  <Chat sendMessage={sendMessage} />
                </div>
              </div>
            ) : (
              <div className="fixed bottom-[66px] w-full flex justify-center z-30">
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
