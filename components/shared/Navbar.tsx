import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import icon2 from "@/public/icon2.png";
import { Button } from "../ui/button";
import { config } from "../../constants";
const API_ENDPOINT = config.url;
const chat = [
  "Wireless Bluetooth",
  "Gaming Chair for Ofiice/Home",
  "Bicycle Under 20k",
  "Best Water Purifier for house",
  "Latest G-Shock Wrist Watch",
  "Keyboard for mac",
  "Laptops for Coding",
];
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
          <button
            className="text-white rounded-lg bg-[#0C8CE9] p-2 md:text-[12px]  text-[10px]"
            onClick={toggleDrawer}
          >
            My Searched Products
          </button>
        </div>

        {/* Side Drawer */}
        {isDrawerOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-100">
            <div className="absolute flex flex-col top-0 right-0 bg-[#262626] h-full md:w-[30%] sm:w-[50%] w-[75%]">
              {/* Drawer Content */}
              <div className="w-[100%] h-[10%] flex flex-row justify-between p-5">
                <div>
                  <img src="/icon2.png" className="w-[40px] h-[40px]"></img>
                </div>
                <div>
                  <button className="" onClick={toggleDrawer}>
                    <h1 className="text-[#0C8CE9] font-bold">X</h1>
                  </button>
                </div>
              </div>
              {/* Add your drawer content here */}
              <div className="w-[100%] text-white p-5 overflow-y-auto ">
                {chat.map((item) => (
                  <div className="mt-2 cursor-pointer hover:bg-[#353434] p-2 rounded-lg">
                    {item}
                  </div>
                ))}
                {chat.map((item) => (
                  <div className="mt-2 cursor-pointer hover:bg-[#353434] p-2 rounded-lg">
                    {item}
                  </div>
                ))}
                {chat.map((item) => (
                  <div className="mt-2 cursor-pointer hover:bg-[#353434] p-2 rounded-lg">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Searchbar - visible on small screens */}
        <div className="mt-2 flex justify-center md:hidden relative">
          {/* <Search color="#2563eb" className="mx-4"/> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
