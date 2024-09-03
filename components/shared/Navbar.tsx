import { FC } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useContentContext } from "@/ContentContext";

interface NavbarProps {
  mode: "light" | "dark";
  onContentChange: (content: string) => void;
  activeContent: string;
}

const Navbar: FC<NavbarProps> = ({ mode, onContentChange, activeContent }) => {
  const { isChatStarted, setMessages, productsHistory, guideTextHistory } =
    useContentContext();

  const { isContentAvailable } = useContentContext();
  const router = useRouter();
  const pathname = usePathname();

  const handleInputChange = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setMessages([]);
    if (pathname === "/") {
      e.preventDefault(); // Prevent default navigation
      router.push("/"); // Navigate to the homepage programmatically
      window.location.reload(); // Force a full page reload
    }
  };

  const isActive = (content: string) => activeContent === content;

  return (
    <nav
      className={`sticky left-0 top-0 z-50 ${
        mode === "dark" ? "bg-[#2e2f2f]" : "bg-white"
      }`}
    >
      <div className="px-[4%] lg:px-[6%] flex justify-center">
        <div className="w-full flex h-max justify-between items-center">
          <Link
            href="/"
            onClick={handleInputChange}
            className="flex items-center py-1 lg:py-4 px-2"
          >
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

          {/* Other Navbar Elements */}
          {isChatStarted && (isContentAvailable || productsHistory.length > 0) && (
            <div className="items-center gap-x-4 hidden md:flex">
              {isContentAvailable}
              <div
                className={`w-max text-lg  font-semibold px-4 p-1 rounded-lg  cursor-pointer
                  ${isActive("discover") ? "bg-[#f5f5f58a] text-black" : "hover:bg-[#f5f5f58a] text-white transition-all duration-500"}
                  `}
                onClick={() =>
                  (isContentAvailable || productsHistory.length > 0) &&
                  onContentChange("discover")
                }
              >
                Discover
              </div>
              <div
                className={`w-max text-lg  font-semibold px-4 p-1 rounded-lg  cursor-pointer
                 ${isActive("guide") ? "bg-[#f5f5f58a] text-black" : "hover:bg-[#f5f5f58a] text-white transition-all duration-500"}
                 `}
                onClick={() =>
                  productsHistory.length > 0 ||
                  (isContentAvailable && onContentChange("guide"))
                }
              >
                Buying Guide
              </div>
              <div
                className={`w-max text-lg  font-semibold px-4 p-1 rounded-lg  cursor-pointer
                  ${isActive("wishlist") ? "bg-[#f5f5f58a] text-black" : "hover:bg-[#f5f5f58a] text-white transition-all duration-500"}
                  `}
                onClick={() =>
                  (isContentAvailable || productsHistory.length > 0) &&
                  onContentChange("wishlist")
                }
              >
                Wishlist
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
