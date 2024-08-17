{/*
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Heart from "../../public/icons/HeartIcon";
import HeartFill from "../../public/icons/HeartFilledIcon";
import { config } from "../../constants";
import { useContentContext } from "@/ContentContext";

const API_ENDPOINT = config.url;

interface NavbarProps {
  mode: "light" | "dark";
}

const Navbar: React.FC<NavbarProps> = ({ mode }) => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userChatHistory, setUserChatHistory] = useState([]);
  const [discoverPath, setDiscoverPath] = useState("/discover");
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const { isChatStarted } = useContentContext();

  const handleNavigation = (path: string) => {
    console.log(path);
    const newPath = `/${path}`;
    console.log(newPath);
    router.push(newPath);
  };

  useEffect(() => {
    const discoverUrl = sessionStorage.getItem('currentPageUrl');
    if (discoverUrl) {
      const path = discoverUrl.substring(discoverUrl.indexOf("search"));
      setDiscoverPath(path);
    }
  }, []);

  return (
    <nav
      className={`sticky left-0 top-0 z-[999999999999999999999999] ${
        mode === "dark" ? "bg-[#2e2f2f]" : "bg-white"
      }`}
    >
      <div className="px-[4%] lg:px-[6%] flex justify-center">
        <div className="w-full flex h-max justify-between items-center">
        
          <Link href="/" className="flex items-center py-1 lg:py-4 px-2">
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
          {/* Other Navbar Elements 
          {isChatStarted && (
            <div className="items-center gap-x-4 hidden md:flex">
              <div
                className="w-max text-lg text-[#a7a7a7] hover:text-black cursor-pointer font-semibold px-4 p-1 rounded-lg hover:bg-[#f5f5f58a] transition-all duration-500"
                onClick={() => handleNavigation(discoverPath || "")}
              >
                Discover
              </div>
              <div
                className="w-max text-lg text-[#a7a7a7] hover:text-black cursor-pointer font-semibold px-4 p-1 rounded-lg hover:bg-[#f5f5f58a] transition-all dureation-500"
                onClick={() => handleNavigation("guide")}
              >
                Buying Guide
              </div>
              <div
                className="w-max text-lg text-[#a7a7a7] hover:text-black cursor-pointer font-semibold px-4 p-1 rounded-lg hover:bg-[#f5f5f58a] transition-all duration-500"
                onClick={() => handleNavigation("wishlist")}
              >
                Wishlist
              </div>
              <div
                className="w-max text-lg text-[#a7a7a7] hover:text-black cursor-pointer font-semibold px-4 p-1 rounded-lg hover:bg-[#f5f5f58a] transition-all duration-500"
                onClick={() => handleNavigation("content")}
              >
                Content
              </div>
            </div>
          )}
        </div>

        {/* Side Drawer */}
        {/* Add your drawer content here if needed */}

        {/* Searchbar - visible on small screens 
        <div className="mt-2 flex justify-center md:hidden relative">
        </div>
      </div>
    </nav>
  );
};
 
export default Navbar;

*/}


{/*import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Heart from "../../public/icons/HeartIcon";
import { config } from "../../constants";
import { useContentContext } from "@/ContentContext";

// Import your components
import BuyingGuide from "@/app/guide/page";
import Wishlist from "@/app/wishlist/page";
import Content from "@/app/content/page";

const API_ENDPOINT = config.url;

interface NavbarProps {
  mode: "light" | "dark";
}

const Navbar: React.FC<NavbarProps> = ({ mode }) => {
  const [activeContent, setActiveContent] = useState<string | null>(null);
  const { isChatStarted } = useContentContext();
  const [discoverPath, setDiscoverPath] = useState("/discover");

  const handleContentChange = (content: string) => {
    setActiveContent(content);
  };

  useEffect(() => {
    const discoverUrl = sessionStorage.getItem('currentPageUrl');
    if (discoverUrl) {
      const path = discoverUrl.substring(discoverUrl.indexOf("search"));
      setDiscoverPath(path);
    }
  }, []);

  useEffect(()=>{
    console.log('activeContent', activeContent);
  },[activeContent]);

  const renderContent = () => {
    switch (activeContent) {     
      case 'discover':
        return (discoverPath || "");
      case 'guide':
        console.log(activeContent, 'guide');
        return <BuyingGuide />;
      case 'wishlist':
        return <Wishlist />;
      case 'content':
        return <Content />;
      default:
        return <div>Default Content</div>;
    }
  };

  return (
    <nav
      className={`sticky left-0 top-0 z-[999999999999999999999999] ${
        mode === "dark" ? "bg-[#2e2f2f]" : "bg-white"
      }`}
    >
      <div className="px-[4%] lg:px-[6%] flex justify-center">
        <div className="w-full flex h-max justify-between items-center">
          
          <Link href="/" className="flex items-center py-1 lg:py-4 px-2">
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
        
          {isChatStarted && (
            <div className="items-center gap-x-4 hidden md:flex">
              <div
                className="w-max text-lg text-[#a7a7a7] hover:text-black cursor-pointer font-semibold px-4 p-1 rounded-lg hover:bg-[#f5f5f58a] transition-all duration-500"
                onClick={() => handleContentChange('discover')}
              >
                Discover
              </div>
              <div
                className="w-max text-lg text-[#a7a7a7] hover:text-black cursor-pointer font-semibold px-4 p-1 rounded-lg hover:bg-[#f5f5f58a] transition-all duration-500"
                onClick={() => handleContentChange('guide')}
              >
                Buying Guide
              </div>
              <div
                className="w-max text-lg text-[#a7a7a7] hover:text-black cursor-pointer font-semibold px-4 p-1 rounded-lg hover:bg-[#f5f5f58a] transition-all duration-500"
                onClick={() => handleContentChange('wishlist')}
              >
                Wishlist
              </div>
              <div
                className="w-max text-lg text-[#a7a7a7] hover:text-black cursor-pointer font-semibold px-4 p-1 rounded-lg hover:bg-[#f5f5f58a] transition-all duration-500"
                onClick={() => handleContentChange('content')}
              >
                Content
              </div>
            </div>
          )}
        </div>

        {/* Content Display
        <div className="content-area">
          {renderContent()}
        </div>

        {/* Searchbar - visible on small screens 
        <div className="mt-2 flex justify-center md:hidden relative">
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

*/}

// components/Navbar.tsx
import { FC,useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Heart from "../../public/icons/HeartIcon";
import { useContentContext } from "@/ContentContext";

interface NavbarProps {
  mode: "light" | "dark";
  onContentChange: (content: string) => void;
}

const Navbar: FC<NavbarProps> = ({ mode, onContentChange }) => {
  const { isChatStarted } = useContentContext();
  const router = useRouter();
  const [discoverPath, setDiscoverPath] = useState("/discover");

  const handleNavigation = (path: string) => {
    console.log(path);
    const newPath = `/${path}`;
    console.log(newPath);
    router.push(newPath);
  };

  useEffect(() => {
    const discoverUrl = sessionStorage.getItem('currentPageUrl');
    if (discoverUrl) {
      const path = discoverUrl.substring(discoverUrl.indexOf("search"));
      setDiscoverPath(path);
    }
  }, []);

  return (
    <nav
      className={`sticky left-0 top-0 z-50 ${
        mode === "dark" ? "bg-[#2e2f2f]" : "bg-white"
      }`}
    >
      <div className="px-[4%] lg:px-[6%] flex justify-center">
        <div className="w-full flex h-max justify-between items-center">
        
          <Link href="/" className="flex items-center py-1 lg:py-4 px-2">
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
              <div
                className="w-max text-lg text-[#a7a7a7] hover:text-black cursor-pointer font-semibold px-4 p-1 rounded-lg hover:bg-[#f5f5f58a] transition-all duration-500"
                onClick={() => onContentChange('discover')}
              >
                Discover
              </div>
              <div
                className="w-max text-lg text-[#a7a7a7] hover:text-black cursor-pointer font-semibold px-4 p-1 rounded-lg hover:bg-[#f5f5f58a] transition-all duration-500"
                onClick={() => onContentChange('guide')}
              >
                Buying Guide
              </div>
              <div
                className="w-max text-lg text-[#a7a7a7] hover:text-black cursor-pointer font-semibold px-4 p-1 rounded-lg hover:bg-[#f5f5f58a] transition-all duration-500"
                onClick={() => onContentChange('wishlist')}
              >
                Wishlist
              </div>
              <div
                className="w-max text-lg text-[#a7a7a7] hover:text-black cursor-pointer font-semibold px-4 p-1 rounded-lg hover:bg-[#f5f5f58a] transition-all duration-500"
                onClick={() => onContentChange('content')}
              >
                Content
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

