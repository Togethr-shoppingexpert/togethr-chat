"use client";
{/*import Blogs from "@/components/Blogs";
import FooterNav from "@/components/FooterNav";
import Videos from "@/components/Videos";
import Navbar from "@/components/shared/Navbar";
import React from "react";
import { useContentContext } from "@/ContentContext";

export default function Page() {
  // const {videoContent}=useContentContext();
  // const {blogsContent}=useContentContext();
  const { buyingGuide } = useContentContext();
  {/*const formattedBuyingGuide = buyingGuide.split('\n').map((paragraph, index) => (
    <p key={index} className="mb-4">
      {paragraph}
    </p>
  ));
  
  return (
    <>
      <div className="bg-[#202222] px-6 lg:px-[6%] flex flex-col items-center p-10 ">
        <div className="text-white text-left max-w-[60vw] mb-6">
          {buyingGuide}
        </div>
        <div className="lg:px-[6%] bg-[#202222] w-full">
          <Videos />
        </div>
        <div className="lg:px-[6%] bg-[#202222] w-full">
          <Blogs />
        </div>
      </div>
      <FooterNav />
    </>
  );
} */}

//"use client";
import FooterNav from "@/components/FooterNav";
import Blogs from "@/components/Blogs";
import Videos from "@/components/Videos";
import Navbar from "@/components/shared/Navbar";
import React,{useState} from "react";
import { useContentContext } from "@/ContentContext";

interface GuideItem {
  point: string;
  details: string[];
  showDetails: boolean;
}

export default function Page() {
  const { buyingGuide, guideBlogs, guideVideos } = useContentContext();

  const guideLines = buyingGuide.split("\n");
  const [formattedGuide, setFormattedGuide] = useState<GuideItem[]>([]);

  // Parse the guide lines
  React.useEffect(() => {
    const parsedGuide: GuideItem[] = [];
    let currentItem: GuideItem | null = null;

    guideLines.forEach((line) => {
      line = line.trim();

      // Check if the line starts with a number followed by a period (e.g., "1.", "2.")
      if (/^\d+\./.test(line)) {
        if (currentItem) {
          parsedGuide.push(currentItem);
        }
        currentItem = { point: line, details: [], showDetails: false };
      } else if (/^[a-z]\./.test(line)) {
        if (currentItem) {
          currentItem.details.push(line);
        }
      } else if (line) {
        if (currentItem) {
          parsedGuide.push(currentItem);
          currentItem = null; // Finish the current numbered item
        }
        parsedGuide.push({ point: line, details: [], showDetails: false });
      }
    });

    if (currentItem) {
      parsedGuide.push(currentItem);
    }

    setFormattedGuide(parsedGuide);
  }, [buyingGuide]);

  const toggleDetails = (index: number) => {
    setFormattedGuide((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, showDetails: !item.showDetails } : item
      )
    );
  };

  return (
    <>
    <div className="bg-[#202222]  px-6 lg:px-[6%] flex flex-col items-center p-10 ">
      <div className="text-white bg-[#3c3b3b] p-5 text-left max-w-2xl mb-6">
        {formattedGuide.map((item, index) => (
          <div key={index} className="guide-item">
            <p className="flex justify-between items-center cursor-pointer item-point " onClick={() => toggleDetails(index)}>
              {item.point}
              {item.details.length > 0 && /^\d+\./.test(item.point) && (
                <button
                  className="toggle-details-btn"
                  
                >
                  {item.showDetails ? "-" : "+"}
                </button>
              )}
            </p >
            {item.showDetails && (
              <div className="item-details flex flex-col text-start">
                {item.details.map((detail, i) => (
                  <p key={i}>{detail}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="lg:px-[6%] bg-[#202222] w-full">
          <Videos content={guideVideos} />
        </div>
        <div className="lg:px-[6%] bg-[#202222] w-full">
          <Blogs content={guideBlogs}/>
        </div>
    </div>
    <FooterNav />
    </>
  );
}