"use client"

import Blogs from "@/components/Blogs";
import FooterNav from "@/components/FooterNav";
import Videos from "@/components/Videos";
import Navbar from "@/components/shared/Navbar";
import React, { useState } from "react";
import { useContentContext } from "@/ContentContext";

export default function Page() {
  const { buyingGuide, guideBlogs, guideVideos } = useContentContext();
  const [visibleFactors, setVisibleFactors] = useState<number[]>([]);

  const toggleDetails = (index: number) => {
    if (visibleFactors.includes(index)) {
      setVisibleFactors(visibleFactors.filter((i) => i !== index));
    } else {
      setVisibleFactors([...visibleFactors, index]);
    }
  };

  console.log("buying guide in guide file", buyingGuide);
  return (
    <>
      <div className="bg-[#202222] px-6 lg:px-[6%] flex flex-col items-center p-10  ">
        <div className="max-w-2xl w-[700px] max-md:w-[100%]">
        
      {/*  <div className="text-white text-left max-w-[60vw] mb-6">
          <h3 className="text-l font-bold mb-4">{buyingGuide.buying_guide_starting_text}</h3>
        </div> */}

        <div className="relative bg-[#3c3b3b] text-white py-2 px-4 rounded-t-lg z-10 w-full transition mb-5">
          {buyingGuide.buying_guide_factors_options.map((factorOption, index) =>(
            <div key={index} className="guide-item mb-4">
              <div className="flex justify-between items-center w-full cursor-pointer" onClick={() => toggleDetails(index)}>
                <div className="p-1 cursor-pointer" key={index}>
                  <h4 className="text-lg font-semibold">{factorOption.factor}</h4>
                </div>
                <div className="font-semibold">
                  <h4>{visibleFactors.includes(index) ? "-" : "+"}</h4>
                </div>
              </div>
              {visibleFactors.includes(index) && (
                <ul className="list-disc ml-5">
                  {factorOption.options.map((option, idx) => (
                    <li key={idx} className="mt-1">{option}</li>
                  ))}
                </ul>
              )}
              {index !== buyingGuide.buying_guide_factors_options.length &&
                <hr className="my-2 border-b-2 border-[#222222]" />}
            </div>
          ))}
          <div className="flex justify-between items-center w-full cursor-pointer" onClick={() => toggleDetails(99)}>
              <div className="p-1 cursor-pointer" key={99}>
                <h4 className="text-lg font-semibold">Key Specifications</h4>
              </div>
              <div className="font-semibold">
                  <h4>{visibleFactors.includes(99) ? "-" : "+"}</h4>
              </div>
          </div>
          {visibleFactors.includes(99) && (
          <p className="mt-2 whitespace-pre-wrap text-sm pl-4">{buyingGuide.buying_guide_specs_text}</p>)}
        </div>

  {/*}      <div className="text-white text-left max-w-[60vw] mb-6">
          <h4 className="text-lg font-semibold">Key Specifications</h4>
          <p className="mt-2 whitespace-pre-wrap text-sm pl-4">{buyingGuide.buying_guide_specs_text}</p>
        </div>

     {/*}   <div className="text-white text-left max-w-[60vw] mb-6">
          <h4 className="text-lg font-semibold">Conclusion</h4>
          <p className="mt-2 text-sm pl-4">{buyingGuide.buying_guide_ending_text}</p>
        </div> */}

        </div>

        <div className="lg:px-[6%] bg-[#202222] w-full">
          <Videos content={guideVideos} />
        </div>
        <div className="lg:px-[6%] bg-[#202222] w-full">
          <Blogs content={guideBlogs} />
        </div>
      </div>
    </>
  );
}

