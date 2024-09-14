"use client";

import Blogs from "@/components/Blogs";
import FooterNav from "@/components/FooterNav";
import Videos from "@/components/Videos";
import Navbar from "@/components/shared/Navbar";
import React, { useState, useEffect } from "react";
import { useContentContext } from "@/ContentContext";

export default function Page() {
  const {
    buyingGuide,
    guideBlogs,
    guideVideos,
    guideTextHistory,
    guideBlogsHistory,
    guideVideosHistory,
  } = useContentContext();

  const [visibleFactors, setVisibleFactors] = useState<number[]>([]);

  useEffect(() => {
    console.log("buyingGuide:", buyingGuide);
    console.log("guideBlogs:", guideBlogs);
    console.log("guideVideos:", guideVideos);
    console.log("guideTextHistory:", guideTextHistory);
    console.log("guideBlogsHistory:", guideBlogsHistory);
    console.log("guideVideosHistory:", guideVideosHistory);
  }, [buyingGuide, guideBlogs, guideVideos, guideTextHistory, guideBlogsHistory, guideVideosHistory]);

  const toggleDetails = (index: number) => {
    if (visibleFactors.includes(index)) {
      setVisibleFactors(visibleFactors.filter((i) => i !== index));
    } else {
      setVisibleFactors([...visibleFactors, index]);
    }
  };

  return (
    <>
      <div className="bg-[#202222] px-6 lg:px-[6%] flex flex-col items-center p-10 max-md:p-0">
        <div className="max-w-2xl w-[700px] max-md:w-[100%] max-md:p-4">
          <div className="text-2xl w-full font-bold text-white my-4">
            <h4>Important factors</h4>
          </div>

          {/* Display Factors from History if Available */}
          <div className="relative bg-[#3c3b3b] text-white py-2 px-4 rounded-t-lg z-10 w-full transition mb-5">
            {(buyingGuide && buyingGuide.buying_guide_factors_options) ? (
                            buyingGuide && buyingGuide.buying_guide_factors_options && buyingGuide.buying_guide_factors_options.map((factorOption, index) =>(
                              <div key={index} className="guide-item mb-4">
                                <div className="flex justify-between items-center w-full cursor-pointer" onClick={() => toggleDetails(index)}>
                                  <div className="p-1 cursor-pointer" key={index}>
                                    <h4 className=" text-white ">{factorOption.factor}</h4>
                                  </div>
                                  <div className="font-semibold text-white">
                                    <h4>{visibleFactors.includes(index) ? "-" : "+"}</h4>
                                  </div>
                                </div>
                                {visibleFactors.includes(index) && (
                                <ul className="list-disc ml-5">
                                  {factorOption.options.map((option, idx) => (
                                    <li key={idx} className="mt-1 text-white">{option}</li>
                                  ))}
                                </ul>
                                )}
                                {index !== buyingGuide.buying_guide_factors_options.length &&
                                  <hr className="my-2 border-b-2 border-[#222222]" />}
                              </div>
                            ))

              ) : (
              
              guideTextHistory.buying_guide_factors_options.map((factorOption, index) => (
                <div key={index} className="guide-item mb-4">
                  <div className="flex justify-between items-center w-full cursor-pointer" onClick={() => toggleDetails(index)}>
                    <div className="p-1 cursor-pointer" key={index}>
                      <h4 className="text-white">{factorOption.factor}</h4>
                    </div>
                    <div className="font-semibold text-white">
                      <h4>{visibleFactors.includes(index) ? "-" : "+"}</h4>
                    </div>
                  </div>
                  {visibleFactors.includes(index) && (
                    <ul className="list-disc ml-5">
                      {factorOption.options.map((option, idx) => (
                        <li key={idx} className="mt-1 text-white">{option}</li>
                      ))}
                    </ul>
                  )}
                  {/* Ensure buyingGuide.buying_guide_factors_options exists before accessing its length */}
                  {guideTextHistory?.buying_guide_factors_options?.length && index !== guideTextHistory.buying_guide_factors_options.length  &&
                    <hr className="my-2 border-b-2 border-[#222222]" />}
                </div>
              ))
            )
          }

            {/* Key Specifications */}
            {buyingGuide ? (
  <>
    <div className="flex justify-between items-center w-full cursor-pointer" onClick={() => toggleDetails(99)}>
      <div className="p-1 cursor-pointer" key={99}>
        <h4>Key Specifications</h4>
      </div>
      <div className="font-semibold">
        <h4>{visibleFactors.includes(99) ? "-" : "+"}</h4>
      </div>
    </div>
    {visibleFactors.includes(99) && (
      <p className="mt-2 whitespace-pre-wrap text-sm pl-4">{buyingGuide?.buying_guide_specs_text}</p>
    )}
  </>
) : (
  <>
    <div className="flex justify-between items-center w-full cursor-pointer" onClick={() => toggleDetails(98)}>
      <div className="p-1 cursor-pointer" key={98}>
        <h4>Key Specifications</h4>
      </div>
      <div className="font-semibold">
        <h4>{visibleFactors.includes(98) ? "-" : "+"}</h4>
      </div>
    </div>
    {visibleFactors.includes(98) && (
      <p className="mt-2 whitespace-pre-wrap text-sm pl-4">{guideTextHistory?.buying_guide_specs_text}</p>
    )}
  </>
)}

          </div>
        </div>

        {/* Videos Section */}
        <div className="lg:px-[6%] bg-[#202222] w-full max-md:px-0">
          {guideVideosHistory && guideVideosHistory.length > 0 ? (
            <Videos content={guideVideosHistory} heading={"Expert guides"} />
          ) : (
            <Videos content={guideVideos} heading={"Expert guides"} />
          )}
        </div>

        {/* Blogs Section */}
        <div className="lg:px-[6%] bg-[#202222] w-full">
          {guideBlogsHistory && guideBlogsHistory.length > 0 ? (
            <Blogs content={guideBlogsHistory} heading={"Curated articles and blogs"} />
          ) : (
            <Blogs content={guideBlogs} heading={"Curated articles and blogs"} />
          )}
        </div>
      </div>
    </>
  );
}


{/*

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
      <div className="bg-[#202222] px-6 lg:px-[6%] flex flex-col items-center p-10 max-md:p-0  ">

        <div className="max-w-2xl w-[700px] max-md:w-[100%] max-md:p-4">
        <div className="text-2xl w-full font-bold text-white my-4"><h4>Important factors</h4></div>
     

        <div className="relative bg-[#3c3b3b] text-white py-2 px-4 rounded-t-lg z-10 w-full transition mb-5">
          {buyingGuide.buying_guide_factors_options.map((factorOption, index) =>(
            <div key={index} className="guide-item mb-4">
              <div className="flex justify-between items-center w-full cursor-pointer" onClick={() => toggleDetails(index)}>
                <div className="p-1 cursor-pointer" key={index}>
                  <h4 className=" text-white ">{factorOption.factor}</h4>
                </div>
                <div className="font-semibold text-white">
                  <h4>{visibleFactors.includes(index) ? "-" : "+"}</h4>
                </div>
              </div>
              {visibleFactors.includes(index) && (
                <ul className="list-disc ml-5">
                  {factorOption.options.map((option, idx) => (
                    <li key={idx} className="mt-1 text-white">{option}</li>
                  ))}
                </ul>
              )}
              {index !== buyingGuide.buying_guide_factors_options.length &&
                <hr className="my-2 border-b-2 border-[#222222]" />}
            </div>
          ))}
          <div className="flex justify-between items-center w-full cursor-pointer" onClick={() => toggleDetails(99)}>
              <div className="p-1 cursor-pointer" key={99}>
                <h4 className="">Key Specifications</h4>
              </div>
              <div className="font-semibold">
                  <h4>{visibleFactors.includes(99) ? "-" : "+"}</h4>
              </div>
          </div>
          {visibleFactors.includes(99) && (
            <p className="mt-2 whitespace-pre-wrap text-sm pl-4">{buyingGuide.buying_guide_specs_text}</p>
          )}
        </div>

  {/*}      <div className="text-white text-left max-w-[60vw] mb-6">
          <h4 className="text-lg font-semibold">Key Specifications</h4>
          <p className="mt-2 whitespace-pre-wrap text-sm pl-4">{buyingGuide.buying_guide_specs_text}</p>
        </div>


        </div>

        <div className="lg:px-[6%] bg-[#202222] w-full max-md:px-0">
          <Videos content={guideVideos} heading={"Expert guides"} />
        </div>
        <div className="lg:px-[6%] bg-[#202222] w-full">
          <Blogs content={guideBlogs} heading={"Curated articles and blogs"}/>
        </div>
      </div>
    </>
  );
}
 */}