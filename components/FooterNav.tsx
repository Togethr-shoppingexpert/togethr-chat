import React,{useState} from "react";
import BuyingGuideIcon from "@/public/icons/BuyingGuideIcon";
import DiscoverIcon from "@/public/icons/DiscoverIcon";
import Message from "@/public/icons/MessageIcon";
import ContentIcon from "@/public/icons/ContentIcon";
import Heart from "@/public/icons/HeartIcon";

interface FooterNavProps {
  onContentChange: (content: string) => void;
}


export default function FooterNav({ onContentChange }: FooterNavProps) {

    // State to track the active icon
    const [activeIcon, setActiveIcon] = useState<string>("discover");

    // Function to handle the click and set the active icon
    const handleIconClick = (content: string) => {
      setActiveIcon(content); // Set the clicked icon as active
      onContentChange(content); // Trigger the content change
    };
  
    // Helper function to check if an icon is active and apply the blue background
    const getIconClass = (iconName: string) =>
      activeIcon === iconName ? "bg-blue-600" : "bg-transparent";

  return (
    <div className="w-full fixed bottom-0 flex justify-between pt-4 py-2 px-8 bg-[#202222] lg:hidden z-[999999999]">
      <div onClick={() => handleIconClick("discover")} className={`p-2 flex justify-center items-center rounded-full ${getIconClass("discover")}`}>
        <DiscoverIcon width={24} height={24} color="white" />
      </div>
      <div onClick={() => handleIconClick("guide")} className={`p-2 flex justify-center items-center rounded-full ${getIconClass("guide")}`}>
        <BuyingGuideIcon width={24} height={24} color="white" />
      </div>
      <div onClick={() => handleIconClick("wishlist")} className={`p-2 flex justify-center items-center rounded-full ${getIconClass("wishlist")}`}>
        <Heart width={24} height={24} color="white" />
      </div>
      <div onClick={() => handleIconClick("content")} className={`p-2 flex justify-center items-center rounded-full ${getIconClass("content")}`}>
        <ContentIcon width={24} height={24} color="white" />
      </div>
    </div>
  );
}
