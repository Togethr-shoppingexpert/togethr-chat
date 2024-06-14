import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Link } from 'lucide-react';

interface FollowupProps {
  containerWidth: number;
  followup: string[];
  isOpen: boolean;
  setUserMessage: (message: string) => void;
  sendMessage: (message: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  mode:"dark"|"light"

}

const Sources: React.FC<FollowupProps> = ({mode, containerWidth, followup, isOpen, setUserMessage, sendMessage, setIsOpen }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(!isOpen);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
    setIsOpen(!isOpen);
  };

  // useEffect(() => {
  //   if (isAccordionOpen && messagesEndRef.current) {
  //     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [isAccordionOpen, followup]);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen]);

  return (
    <div className={`relative w-full  p-1 rounded-lg mb-2 ${mode==="dark"?"bg-[#3c3b3b] text-white":"bg-white text-black"}`}>
      <div className={` ${mode==="dark"?"bg-[#3c3b3b] text-white":"bg-white text-black"} flex justify-between items-center cursor-pointer p-2 `} onClick={toggleAccordion}>
        <div>
        <h3 className="text-left font-bold ">Sources</h3>
        </div>
        <div className="flex items-center">
          {isAccordionOpen ? (
            <FaChevronUp className="transition-transform duration-300 transform rotate-180" />
          ) : (
            <FaChevronDown className="transition-transform duration-300" />
          )}
        </div>
      </div>
      
      {isAccordionOpen && (
        <div className={`relative ${mode==="dark"?"bg-[#3c3b3b] text-white":"bg-white text-black"} p-4 rounded-t-lg z-10 w-full transition`}>
          <Link  target="_blank">
                  <Card className="w-full max-w-xs rounded-xl border-0 bg-white text-black my-1 p-2 flex-shrink-0 transition-transform">
                    <div className="flex aspect-video-container rounded-t-xl">
                      <img
                        alt="Thumbnail"
                        className="aspect-video object-cover h-full rounded-md"
                        src="/icon2.png"
                      />
                    </div>
                    <CardHeader className="p-4 pb-1">
                      <p className="font-semibold overflow-hidden mt-3 text-base md:text-lg truncate">
                        source1
                      </p>
                      <div className="font-semibold text-base"> Price : 2000</div>
                    </CardHeader>
                    <CardContent className="p-4 text-sm">
                      Views:200k
                     
                    </CardContent>
                  </Card>
                </Link>

                <Link  target="_blank">
                  <Card className="w-full max-w-xs rounded-xl border-0 bg-white text-black my-1 p-2 flex-shrink-0 transition-transform">
                    <div className="flex aspect-video-container rounded-t-xl">
                      <img
                        alt="Thumbnail"
                        className="aspect-video object-cover h-full rounded-md"
                        src="/icon2.png"
                      />
                    </div>
                    <CardHeader className="p-4 pb-1">
                      <p className="font-semibold overflow-hidden mt-3 text-base md:text-lg truncate">
                        source1
                      </p>
                      <div className="font-semibold text-base"> Price : 1000</div>
                    </CardHeader>
                    <CardContent className="p-4 text-sm">
                      Views:200k
                     
                    </CardContent>
                  </Card>
                </Link>

                <Link  target="_blank">
                  <Card className="w-full max-w-xs rounded-xl border-0 bg-white text-black my-1 p-2 flex-shrink-0 transition-transform">
                    <div className="flex aspect-video-container rounded-t-xl">
                      <img
                        alt="Thumbnail"
                        className="aspect-video object-cover h-full rounded-md"
                        src="/icon2.png"
                      />
                    </div>
                    <CardHeader className="p-4 pb-1">
                      <p className="font-semibold overflow-hidden mt-3 text-base md:text-lg truncate">
                        source1
                      </p>
                      <div className="font-semibold text-base"> Price : 500</div>
                    </CardHeader>
                    <CardContent className="p-4 text-sm">
                      Views:200k
                     
                    </CardContent>
                  </Card>
                </Link>
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default Sources;
