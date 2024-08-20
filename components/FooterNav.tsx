{/*import React from "react";
import Link from "next/link";
import BuyingGuideIcon from "@/public/icons/BuyingGuideIcon";
import DiscoverIcon from "@/public/icons/DiscoverIcon";
import Message from "@/public/icons/MessageIcon";
import ContentIcon from "@/public/icons/ContentIcon";
import Heart from "@/public/icons/HeartIcon";

export default function FooterNav() {
  return (
    <div className="w-full fixed bottom-0 flex justify-between pt-4 py-2 px-8 bg-[#202222] lg:hidden z-[999999999]">
      <Link href="/discover"> 
        <div>
          <DiscoverIcon width={24} height={24} color="currentColor" />
        </div>
      </Link> 
      <Link href="/guide">
        <div>
          <BuyingGuideIcon width={24} height={24} color="currentColor" />
        </div>
      </Link>
      <Link href="/wishlist">
        <div>
          <Heart width={24} height={24} color="currentColor" />
        </div>
      </Link>
      <Link href="/content">
        <div>
          <ContentIcon width={24} height={24} color="currentColor" />
        </div>
      </Link>
    </div>
  );
}
*/}

import React from "react";
import BuyingGuideIcon from "@/public/icons/BuyingGuideIcon";
import DiscoverIcon from "@/public/icons/DiscoverIcon";
import Message from "@/public/icons/MessageIcon";
import ContentIcon from "@/public/icons/ContentIcon";
import Heart from "@/public/icons/HeartIcon";

interface FooterNavProps {
  onContentChange: (content: string) => void;
}

export default function FooterNav({ onContentChange }: FooterNavProps) {
  return (
    <div className="w-full fixed bottom-0 flex justify-between pt-4 py-2 px-8 bg-[#202222] lg:hidden z-[999999999]">
      <div onClick={() => onContentChange("discover")}>
        <DiscoverIcon width={24} height={24} color="currentColor" />
      </div>
      <div onClick={() => onContentChange("guide")}>
        <BuyingGuideIcon width={24} height={24} color="currentColor" />
      </div>
      <div onClick={() => onContentChange("wishlist")}>
        <Heart width={24} height={24} color="currentColor" />
      </div>
      <div onClick={() => onContentChange("content")}>
        <ContentIcon width={24} height={24} color="currentColor" />
      </div>
    </div>
  );
}
