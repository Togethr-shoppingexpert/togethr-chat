import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import icon2 from "@/public/icon2.png";
import { Button } from "../ui/button";
import { config } from "../../constants";
const API_ENDPOINT = config.url;

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userChatHistory, setUserChatHistory] = useState([]);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <nav className="bg-[#262626] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Website Logo */}
          <Link href="/" className="flex items-center py-4 px-2">
            <Image src={icon2} alt="togethr" width={40} height={40} />
            <span className="font-bold text-white rounded-md p-2 text-lg md:text-xl lg:text-2xl">
              Togethr
            </span>
          </Link>

          {/* Searchbar */}

          {/* Buttons */}
          
        </div>

        {/* Side Drawer */}
        

        {/* Searchbar - visible on small screens */}
        <div className="mt-2 flex justify-center md:hidden relative">
          {/* <Search color="#2563eb" className="mx-4"/> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
