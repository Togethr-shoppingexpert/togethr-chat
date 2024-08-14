"use client";
import Blogs from "@/components/Blogs";
import FooterNav from "@/components/FooterNav";
import Videos from "@/components/Videos";
import Navbar from "@/components/shared/Navbar";
import React from "react";
import { useContentContext } from "@/ContentContext";

export default function Page() {
  // const {videoContent}=useContentContext();
  // const {blogsContent}=useContentContext();
  const { buyingGuide } = useContentContext();
  const formattedBuyingGuide = buyingGuide.split('\n').map((paragraph, index) => (
    <p key={index} className="mb-4">
      {paragraph}
    </p>
  ));
  
  return (
    <>
      <div>This is buying guide</div>
      <div className="bg-[#202222] px-6 lg:px-[6%] flex flex-col items-center p-10 ">
        <div className="text-white text-left max-w-[60vw] mb-6">
          {formattedBuyingGuide}
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
}
