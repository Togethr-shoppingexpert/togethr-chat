import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import TestOne from "../public/test/test1.png";
import TestTwo from "../public/test/test2.png";
import TestThree from "../public/test/test3.png";
import BlackTick from "../public/test/blacktick.png";
import Favourite from "../public/test/favourite.png";
import { useContentContext } from "@/ContentContext";
import Heart from "@/public/icons/HeartIcon";
import { config } from "@/constants";
const API_ENDPOINT = config.url;

interface ProductInfo {
  description?: string;
  media: Array<any>;
  prices: Array<string>;
  product_id: string;
  rating?: number;
  reviews_results?: any;
  sellers_results?: any;
  title?: string;
  link: string;
}

export default function HomeProducts() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isTabletScreen, setIsTabletScreen] = useState(false);



  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsSmallScreen(screenWidth <= 768);
      setIsTabletScreen(screenWidth > 768 && screenWidth <= 1024);
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { productInfo, bestProducts, bestProductsHistory, isContentAvailable, filledHearts, setFilledHearts, productsHistory } = useContentContext();

  
  const getProductPrice = (productId: string) => {
    const product = productInfo.find((info: ProductInfo) => info.product_id === productId);
    return product ? product.prices[0] : "Price not available";
  };

  const getImageUrl = (productId: string) => {
    const product = productInfo.find((info: ProductInfo) => info.product_id === productId);
    return product ? product.media[0].link : "";
  };

    const getImageUrlHistory = (productId: string) => {
    const product = productsHistory.find((info: ProductInfo) => info.product_id === productId);
    return product ? product.media[0].link : "";
  };

  const getProductUrlHistory = (productId: string) => {
    const product = productsHistory.find((info: ProductInfo) => info.product_id === productId);
    return (product && product.sellers_results) ? product.sellers_results?.online_sellers[0].link : "#";
  };

  const getProductPriceHistory = (productId: string) => {
    const product = productsHistory.find((info: ProductInfo) => info.product_id === productId);
    return product ? product.prices[0] : "Price not available";
  };

  const getProductLink = (productId: string) => {
    const product = productInfo.find((info: ProductInfo) => info.product_id === productId);
    return (product && product.sellers_results) ? product.sellers_results.online_sellers[0].link : "#";
  };

  // Function to fetch conversationId from sessionStorage with retry mechanism
  const fetchConversationId = async () => {
    let conversationId = sessionStorage.getItem("conversationId");

    if (!conversationId) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      conversationId = sessionStorage.getItem("conversationId");

      if (!conversationId) {
        console.error("Conversation ID not found in local storage after timeout.");
        return null;
      }
    }
    return conversationId;
  };

  // Added function to handle adding product to the wishlist
  const handleAddToWishlist = async (productId: string) => {
    const conversationId = await fetchConversationId();
    if (!conversationId) return;

    try {
      await fetch(`https://${API_ENDPOINT}/api/wishlist/${conversationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: productId }),
      });
      alert('Product added to wishlist');

      setFilledHearts(productId, true);
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  useEffect(() => {
    console.log('Updated productsHistory:', productsHistory);  // Debugging
  }, [productsHistory]);

  return (
    <>
      {(isContentAvailable || bestProductsHistory) && (
        <div className="flex flex-col gap-y-6 pt-8 mt-0 items-center px-4 lg:px-0 pb-10">
          <div className="text-2xl w-full font-bold text-white">
            <h4>Top picks for you</h4>
          </div>
          {bestProductsHistory.length > 0 && bestProductsHistory.map((item, index) => {
            const productPrice = getProductPriceHistory(item.product_id);
            const imageurl = getImageUrlHistory(item.product_id);
            const productLink = getProductUrlHistory(item.product_id);
            const isHeartFilled = filledHearts.has(item.product_id);

            return (
              <div key={index} className="relative">
                <Link href={productLink} passHref legacyBehavior>
                  <a className="lg:w-full relative max-md:w-[100%] max-md:px-2 flex flex-col lg:flex-row gap-x-4 rounded-xl bg-[#191919] p-4 lg:p-8 pb-6 lg:pb-10"
                     target="_blank"
                     rel="noopener noreferrer"
                  > 
<div className="flex flex-col lg:flex-row lg:items-start gap-y-4 lg:gap-x-4 max-md:items-center max-md:justify-center ">
  <div className="w-[80%] h-52 lg:w-[20%] flex  it relative rounded-xl bg-custom-gradient-cards">
    <Image
      src={imageurl}
      alt={`product-${index + 1}`}
      layout="fill"
      className="rounded-xl product-image-class"
    />
  </div>
  <div className="flex flex-col gap-y-2 lg:w-[80%] max-sm:p-4">
    <div className="flex justify-between items-center">
      <div className="flex flex-col lg:flex-row justify-between h-max gap-y-2 gap-x-4 items-start lg:items-center">
        <div className="text-[17px] text-white mt-2 lg:mt-0">
          {item.product_name}
        </div>
        <div className="flex h-max items-center gap-x-2 p-1.5 px-3 rounded-xl bg-[#E8DEF8]">
          <div className="w-3">
            <Image src={BlackTick} alt="tick" />
          </div>
          <div>{productPrice}</div>
        </div>
      </div>
      <div className="w-5">
        <Image src={Favourite} alt="favourite" />
      </div>
    </div>
    <div className="text-gray-400 text-[15px]">
      {item.recommendation_reason}
    </div>
  </div>
</div>

                  </a>
                </Link>
                <div onClick={() => handleAddToWishlist(item.product_id)} className="absolute max-sm:top-0 max-sm:right-0 top-2 right-2 z-5 p-2 flex rounded-full cursor-pointer">
                  <Heart width={24} height={24} color={isHeartFilled ? "red" : "white"} />
                </div>
              </div>
            );
          })}
          {bestProducts.map((item, index) => {
            const productPrice = getProductPrice(item.product_id);
            const imageurl = getImageUrl(item.product_id);
            const productLink = getProductLink(item.product_id);
            const isHeartFilled = filledHearts.has(item.product_id);

            return (
              <div key={index} className="relative">
                <Link href={productLink} passHref legacyBehavior>
                  <a className="lg:w-full relative max-md:w-[100%] max-md:px-2 flex flex-col lg:flex-row gap-x-4 rounded-xl bg-[#191919] p-4 lg:p-8 pb-6 lg:pb-10"
                     target="_blank"
                     rel="noopener noreferrer"
                  > 
<div className="flex flex-col lg:flex-row lg:items-start gap-y-4 lg:gap-x-4 max-md:items-center max-md:justify-center ">
  <div className="w-[80%] h-52 lg:w-[20%] flex  it relative rounded-xl bg-custom-gradient-cards">
    <Image
      src={imageurl}
      alt={`product-${index + 1}`}
      layout="fill"
      className="rounded-xl product-image-class"
    />
  </div>
  <div className="flex flex-col gap-y-2 lg:w-[80%] max-sm:p-4">
    <div className="flex justify-between items-center">
      <div className="flex flex-col lg:flex-row justify-between h-max gap-y-2 gap-x-4 items-start lg:items-center">
        <div className="text-[17px] text-white mt-2 lg:mt-0">
          {item.product_name}
        </div>
        <div className="flex h-max items-center gap-x-2 p-1.5 px-3 rounded-xl bg-[#E8DEF8]">
          <div className="w-3">
            <Image src={BlackTick} alt="tick" />
          </div>
          <div>{productPrice}</div>
        </div>
      </div>
      <div className="w-5">
        <Image src={Favourite} alt="favourite" />
      </div>
    </div>
    <div className="text-gray-400 text-[15px]">
      {item.recommendation_reason}
    </div>
  </div>
</div>

                  </a>
                </Link>
                <div onClick={() => handleAddToWishlist(item.product_id)} className="absolute max-sm:top-0 max-sm:right-0 top-2 right-2 z-5 p-2 flex rounded-full cursor-pointer">
                  <Heart width={24} height={24} color={isHeartFilled ? "red" : "white"} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
