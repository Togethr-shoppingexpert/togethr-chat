import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";


import { config } from "../../constants";
const API_ENDPOINT = config.url;
interface NavbarProps {
  mode: "light" | "dark";
}
const Navbar: React.FC<NavbarProps> = ({ mode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userChatHistory, setUserChatHistory] = useState([]);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <nav className={`sticky left-0 top-0 z-50 ${mode === "dark" ? "bg-[#2e2f2f]" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Website Logo */}
          <Link href="/" className="flex items-center py-4 px-2">
            <Image src={`${mode==="dark"?"/icon2.png":"/favicon.png"}`} alt="togethr" width={40} height={40} />
            <span className={`font-bold ${mode === "dark" ? "text-white" : "text-[#080808]"} rounded-md p-2 text-lg md:text-xl lg:text-2xl`}>
              Togethr
            </span>
          </Link>
          
          {/* Other Navbar Elements */}
        </div>

        {/* Side Drawer */}
        {/* Add your drawer content here if needed */}

        {/* Searchbar - visible on small screens */}
        <div className="mt-2 flex justify-center md:hidden relative">
          {/* <Search color="#2563eb" className="mx-4"/> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
