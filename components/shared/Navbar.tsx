"use client";
import { FC,useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Heart from "../../public/icons/HeartIcon";
import { useContentContext } from "@/ContentContext";

interface NavbarProps {
  mode: "light" | "dark";
  onContentChange: (content: string) => void;
}

const Navbar: FC<NavbarProps> = ({ mode, onContentChange  }) => {
  const { isChatStarted, setMessages, productsHistory, guideTextHistory } = useContentContext();

  const { isContentAvailable} = useContentContext();
  const router = useRouter();
  const pathname = usePathname();  // Use the usePathname hook
  console.log('paath name', pathname);

  const handleInputChange = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setMessages([]);
    if (pathname === "/") {
      e.preventDefault();  // Prevent default navigation
      router.push('/');    // Navigate to the homepage programmatically
      window.location.reload(); // Force a full page reload
    }
  };


  return (
    <nav
      className={`sticky left-0 top-0 z-50 ${
        mode === "dark" ? "bg-[#2e2f2f]" : "bg-white"
      }`}
    >
      <div className="px-[4%] lg:px-[6%] flex justify-center">
        <div className="w-full flex h-max justify-between items-center">
        
          <Link href="/" onClick={handleInputChange} className="flex items-center py-1 lg:py-4 px-2">
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
          <div className="lg:hidden">
            <Heart width={24} height={24} color="currentColor" />
          </div>
          {/* Other Navbar Elements */}
          {isChatStarted && (
            <div className="items-center gap-x-4 hidden md:flex">
              {isContentAvailable}
              <div
                className={`w-max text-lg ${(isContentAvailable || productsHistory.length >0) ? "text-white hover:text-black cursor-pointer" : "text-[#a7a7a7] opacity-50 cursor-not-allowed"}  font-semibold px-4 p-1 rounded-lg ${
                  (isContentAvailable || productsHistory.length >0) ? "hover:bg-[#f5f5f58a] transition-all duration-500" : ""
                }`}
                onClick={() => (isContentAvailable || productsHistory.length >0) && onContentChange("discover")}
              >
                Discover  
              </div>
              <div
                className={`w-max text-lg ${(isContentAvailable || guideTextHistory) ? "text-white hover:text-black cursor-pointer" : "text-[#a7a7a7] opacity-50 cursor-not-allowed"}  font-semibold px-4 p-1 rounded-lg ${
                  (isContentAvailable || guideTextHistory )? "hover:bg-[#f5f5f58a] transition-all duration-500" : ""
                }`}
                onClick={() =>( guideTextHistory || isContentAvailable) && onContentChange("guide")}
              >
                Buying Guide
              </div>
              <div
                className={`w-max text-lg ${(isContentAvailable || productsHistory.length >0) ? "text-white hover:text-black cursor-pointer" : "text-[#a7a7a7] opacity-50 cursor-not-allowed"}  font-semibold px-4 p-1 rounded-lg ${
                  (isContentAvailable || productsHistory.length >0 )? "hover:bg-[#f5f5f58a] transition-all duration-500" : ""
                }`}
                onClick={() => (isContentAvailable  || productsHistory.length >0) && onContentChange("wishlist")}
              >
                Wishlist
              </div>
              {/*<div
                className={`w-max text-lg ${isContentAvailable ? "text-white hover:text-black cursor-pointer" : "text-[#a7a7a7] opacity-50 cursor-not-allowed"}  font-semibold px-4 p-1 rounded-lg ${
                  isContentAvailable ? "hover:bg-[#f5f5f58a] transition-all duration-500" : ""
                }`}
                onClick={() => isContentAvailable && onContentChange("content")}
              >
                Content
              </div> */}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

