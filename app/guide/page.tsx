import Blogs from "@/components/Blogs";
import FooterNav from "@/components/FooterNav";
import Videos from "@/components/Videos";
import Navbar from "@/components/shared/Navbar";
import React from "react";
import { useContentContext } from "@/ContentContext";

export default function Page() {
  const { buyingGuide, guideBlogs, guideVideos } = useContentContext();

  console.log('buying guifde in gude file', buyingGuide);
  return (
    <>
      <div className="bg-[#202222] px-6 lg:px-[6%] flex flex-col items-center p-10 ">
        <div className="text-white text-left max-w-[60vw] mb-6">
          <h1 className="text-xl font-bold mb-4">{buyingGuide.buying_guide_starting_text}</h1>
        </div>

        <div className="text-white bg-[#3c3b3b] p-5 text-left max-w-2xl mb-6">
          {buyingGuide.buying_guide_factors_options.map((factorOption, index) => (
            <div key={index} className="guide-item mb-4">
              <h2 className="text-lg font-semibold">{factorOption.factor}</h2>
              <ul className="list-disc ml-5">
                {factorOption.options.map((option, idx) => (
                  <li key={idx} className="mt-1">{option}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-white text-left max-w-[60vw] mb-6">
          <h2 className="text-lg font-semibold">Key Specifications</h2>
          <p className="mt-2 whitespace-pre-wrap">{buyingGuide.buying_guide_specs_text}</p>
        </div>

        <div className="text-white text-left max-w-[60vw] mb-6">
          <h2 className="text-lg font-semibold">Conclusion</h2>
          <p className="mt-2">{buyingGuide.buying_guide_ending_text}</p>
        </div>
        <div className="lg:px-[6%] bg-[#202222] w-full">
          <Videos content={guideVideos}/>
        </div>
        <div className="lg:px-[6%] bg-[#202222] w-full">
          <Blogs content={guideBlogs}/>
        </div>
      </div>
      <FooterNav />
    </>
  );
}
