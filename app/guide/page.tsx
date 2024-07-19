"use client";
import Blogs from "@/components/Blogs";
import FooterNav from "@/components/FooterNav";
import Videos from "@/components/Videos";
import Navbar from "@/components/shared/Navbar";
import React from "react";
import { useContentContext } from "@/ContentContext";
export default function page() {
  const {videoContent}=useContentContext();
  const {blogsContent}=useContentContext();
  return (
    <>
      <Navbar mode="dark" />
      <div className="bg-[#202222] px-6 lg:px-[6%]">
        <div className="lg:px-[6%] bg-[#202222]">
          <Videos />
        </div>
        <div className="lg:px-[6%] bg-[#202222]">
          <Blogs />
        </div>
      </div>
      <FooterNav />
    </>
  );
}
