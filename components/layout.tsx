// components/Layout.tsx
import { ReactNode } from "react";
import { useState } from "react";
import Navbar from "../components/shared/Navbar";
import BuyingGuide from "@/app/guide/page";
import Wishlist from "@/app/wishlist/page";
import Content from "@/app/content/page";
import Discover from "@/app/discover/discover";
import Chat from "./Chat";

interface LayoutProps {
  sendMessage: (message: string) => void;
  children: ReactNode;
}

export default function Layout({ sendMessage, children }: LayoutProps) {
  const [activeContent, setActiveContent] = useState<string | null>(null);

  const handleContentChange = (content: string) => {
    console.log('activeContent', content);
    setActiveContent(content);
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
    <div className="w-full">
      <Navbar mode="dark" onContentChange={handleContentChange} />
      <div className="flex flex-col">
        <main className="pt-16 w-[70%]">
          {renderContent()}
          {children}
        </main>
        <div className="fixed right-0 top-0 w-[400px] overflow-y-scroll order-2 products-height border-l-2 border-gray-300">
          <Chat sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}
