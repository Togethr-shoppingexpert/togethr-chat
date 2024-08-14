"use client";
import FooterNav from "@/components/FooterNav";
import HeroResult from "@/components/HeroResult";
import NameCards from "@/components/NameCards";
import WishlistUI from "@/components/WishlistUI";
import Navbar from "@/components/shared/Navbar";
import React, { use } from "react";

export default function page() {
  console.log("wishlist");
  return (
    <>
      {/*<Navbar mode="dark" />*/}
      <div>This is whishlist</div>
      <div className="bg-[#202222] px-6 lg:px-[6%]">
        <WishlistUI />
      </div>
      <FooterNav />
    </>
  );
}
