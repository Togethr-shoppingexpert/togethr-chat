import React from "react";
import Link from "next/link";
import Image from "next/image";
import BlackTick from "../public/test/blacktick.png";
import Heart from "@/public/icons/HeartIcon";
import { useContentContext } from "@/ContentContext";

interface ProductReview {
  productId: string;
  review: string;
}

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

interface WishlistUIProps {
  productReviews?: ProductReview[];
  onDelete: (productId: string) => void;
  onAdd: (productId: string) => void;
}

export default function WishlistUI({
  productReviews = [],
  onDelete,
  onAdd,
}: WishlistUIProps) {
  const { productInfo, isContentAvailable } = useContentContext();

  const getProductPrice = (productId: string) => {
    const product = productInfo.find(
      (info: ProductInfo) => info.product_id === productId
    );
    return product ? product.prices[0] : "Price not available";
  };

  const getImageUrl = (productId: string) => {
    const product = productInfo.find(
      (info: ProductInfo) => info.product_id === productId
    );
    return product ? product.media[0].link : "";
  };

  const getProductLink = (productId: string) => {
    const product = productInfo.find(
      (info: ProductInfo) => info.product_id === productId
    );
    return product ? product.sellers_results.online_sellers[0].link : "#";
  };

  return (
    <>
      {isContentAvailable && (
        <div className="flex flex-col gap-y-6 pt-8 mt-0 items-center px-4 pb-10 w-[100%] justify-center">
          <div className="text-2xl w-full pl-20 font-bold text-white">
            <h4>Your Wishlist</h4>
          </div>
          {productReviews.map((item, index) => {
            const productPrice = getProductPrice(item.productId);
            const imageurl = getImageUrl(item.productId);
            const productLink = getProductLink(item.productId);

            return (
              <div className="relative flex justify-center items-center max-w-2xl">
              <Link href={productLink} key={index} passHref legacyBehavior>
                <a
                  className="lg:w-full relative max-md:w-[100%] max-md:px-2 flex flex-col  gap-x-4 rounded-xl bg-[#191919] p-4 lg:p-8 pb-6 lg:pb-10"
                  target="_blank"
                  rel="noopener noreferrer"
                > 
                <div className="flex">
                  <div className="w-52 h-52 relative rounded-xl bg-custom-gradient-cards">
                    <Image
                      src={imageurl}
                      alt={`wishlist-product-${index + 1}`}
                      layout="fill"
                      className="rounded-xl product-image-class"
                    />
                  </div>
                  <div className="flex flex-col justify-start items-start w-[calc(100%- 300px)] m-4">
                      <div className="text-[17px] text-white">
                        {item.review.split("\n")[0]} {/* Display product name */}
                      </div>
                      <div className="flex h-max items-center gap-x-2 p-1.5 px-3 mt-2 rounded-xl bg-[#E8DEF8]">
                        <div className="w-3">
                          <Image src={BlackTick} alt="tick" />
                        </div>
                        <div>{productPrice}</div>
                      </div>

                  </div>
                  </div>
                  <div className="flex flex-col gap-y-2">

                    <div className=" whitespace-pre-wrap text-gray-400 text-[15px]">
                      {item.review.split("\n").slice(1).join("\n")} {/* Display review */}
                    </div>
                  </div>
                </a>
              </Link>
              <div  className=" absolute right-1 top-1 z-10">
                 <button className="hover:text-black rounded-lg shadow-lg border-2 border-[#f5f5f58a]  hover:bg-[#f5f5f58a] p-1 text-white absolute right-2 top-2 z-10" onClick={() => onDelete(item.productId)}>
                    <span className="font-semibold text-sm">Remove</span>
                  </button>
              </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
