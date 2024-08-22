import React from "react";
import Link from "next/link";
import Image from "next/image";
import BlackTick from "../public/test/blacktick.png";
import Heart from "@/public/icons/HeartIcon";
import { useContentContext } from "@/ContentContext";

interface Product {
  product_name: string;
  product_id: string;
  recommendation_reason: string;
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
  wishlistProducts?: Product[];
  onDelete: (productId: string) => void;
  onAdd: (productId: string) => void;
}

export default function WishlistUI({
  wishlistProducts = [],
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
        <div className="flex flex-col gap-y-6 pt-8 mt-0 items-center px-4 lg:px-0 pb-10">
          <div className="text-2xl w-full font-bold text-white">
            <h4>Your Wishlist</h4>
          </div>
          {wishlistProducts.map((item, index) => {
            const productPrice = getProductPrice(item.product_id);
            const imageurl = getImageUrl(item.product_id);
            const productLink = getProductLink(item.product_id);

            return (
              <Link href={productLink} key={index} passHref legacyBehavior>
                <a className="lg:w-full relative max-md:w-[100%] max-md:px-2 flex flex-col lg:flex-row gap-x-4 rounded-xl bg-[#191919] p-4 lg:p-8 pb-6 lg:pb-10"
                   target="_blank"
                   rel="noopener noreferrer"
                >
                  <div className="w-full h-50 relative rounded-xl bg-custom-gradient-cards">
                    <Image
                      src={imageurl}
                      alt={`wishlist-product-${index + 1}`}
                      layout="fill"
                      className="rounded-xl product-image-class"
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <div className="flex justify-between items-center">
                      <div className="text-[17px] text-white">
                        {item.product_name}
                      </div>
                      <div className="flex h-max items-center gap-x-2 p-1.5 px-3 rounded-xl bg-[#E8DEF8]">
                        <div className="w-3">
                          <Image src={BlackTick} alt="tick" />
                        </div>
                        <div>{productPrice}</div>
                      </div>
                      <div onClick={() => onDelete(item.product_id)} className="w-5">
                        <Heart width={24} height={24} color="red" />
                      </div>
                    </div>
                    <div className="text-gray-400 text-[15px]">
                      {item.recommendation_reason}
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
