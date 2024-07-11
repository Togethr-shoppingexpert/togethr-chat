"use client";
import Blogs from "@/components/Blogs";
import FooterNav from "@/components/FooterNav";
import Videos from "@/components/Videos";
import Navbar from "@/components/shared/Navbar";
import React from "react";

export default function page() {
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
