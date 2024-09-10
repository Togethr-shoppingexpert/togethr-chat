"use client";
import React, { useState, useEffect } from "react";
import { useContentContext } from "@/ContentContext";

export default function Page() {
  const {
    buyingGuide,
    initalbuyingGuide,
    guideTextHistory,
    initialGuideText
  } = useContentContext();

  const [visibleFactors, setVisibleFactors] = useState<number[]>([]);
  
  console.log(initialGuideText, "text guide");
  console.log(initalbuyingGuide, "guide options");

  const toggleDetails = (index: number) => {
    if (visibleFactors.includes(index)) {
      setVisibleFactors(visibleFactors.filter((i) => i !== index));
    } else {
      setVisibleFactors([...visibleFactors, index]);
    }
  };

  return (
    <>
            <div className="bg-[#202222] px-6 lg:px-[6%] flex flex-col items-center p-5 max-md:p-0">
                  <div className="max-w-2xl w-[700px] max-md:w-[100%] max-md:p-4">
          <div className="text-2xl w-full font-bold text-white my-4">
            <h4>Know more</h4>
          </div>
          <div className="relative bg-[#3c3b3b] text-white py-2 px-4 rounded-t-lg z-10 w-full transition mb-5">
          {initalbuyingGuide.options.length > 0 ? (
          initalbuyingGuide.options.map((option, index) => (
            <div key={index}>
              <div
                className="flex flex-col justify-start items-start w-full cursor-pointer"
              >
                
                <h4>{option}</h4>
                <p className="mt-2 whitespace-pre-wrap text-sm pl-4">
                  {initalbuyingGuide.explainations[index] || "No explanation provided."}
                </p>
                
              </div>

              {index !== initalbuyingGuide.options.length - 1 &&
                                  <hr className="my-2 border-b-2 border-[#222222]" />}
            </div>
          ))
          ) : (
            <p>No options available.</p>
          )}
          </div>
          </div>
          <div className="max-w-2xl w-[700px] max-md:w-[100%] max-md:p-4">
          <div className="text-2xl w-full font-bold text-white my-4">
            <h4>Important considerations</h4>
          </div>

          <div className="relative bg-[#3c3b3b] text-white py-2 px-4 rounded-t-lg z-10 w-full transition mb-5">
           
                           { initialGuideText && initialGuideText.buying_guide_factors_options && initialGuideText.buying_guide_factors_options.map((factorOption, index) => (
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
                                  {index !== buyingGuide.buying_guide_factors_options.length - 1 && (
    <hr className="my-2 border-b-2 border-[#222222]" />
  )}
                              </div>
                            ))
            
          }

            {initialGuideText && (
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
      <p className="mt-2 whitespace-pre-wrap text-sm pl-4">{initialGuideText?.buying_guide_specs_text}</p>
    )}
  </>
)}

          </div>
        </div>
        </div>
    </>
  );
}
