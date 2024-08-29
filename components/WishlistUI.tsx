import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BlackTick from "@/public/test/blacktick.png";
import Heart from "@/public/icons/HeartIcon";
import { useContentContext } from "@/ContentContext";
import { config } from "@/constants";
const API_ENDPOINT = config.url;

interface Product {
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

interface ProductReview {
  productId: string;
  review: string;
}

interface Wishlist {
  productIds: string[];
  productReviews: ProductReview[];
}

interface WishlistUIProps {
  wishlist: Wishlist;
  onDelete: (productId: string) => void;
}

interface ReviewData {
  title: string;
  pros: string[];
  cons: string[];
  description: string;
  buyingReasons: string;
}

const parseReview = (reviewJson: string): ReviewData => {
  try {
    const reviewData = JSON.parse(reviewJson);
    return {
      title: reviewData.title || "",
      pros: reviewData.pros || [],
      cons: reviewData.cons || [],
      description: reviewData.description || "",
      buyingReasons: reviewData.buying_reasons || ""
    };
  } catch (error) {
    console.error("Failed to parse review JSON", error);
    return {
      title: "",
      pros: [],
      cons: [],
      description: "",
      buyingReasons: ""
    };
  }
};

export default function WishlistUI({ wishlist, onDelete }: WishlistUIProps) {
  const { filledHearts, setFilledHearts } = useContentContext();
  const [visibleFactors, setVisibleFactors] = useState<{ [key: string]: boolean }>({});
  const [productData, setProductData] = useState<{ [key: string]: Product }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts: { [key: string]: Product } = {};
      for (const productId of wishlist.productIds) {
        try {
          const response = await fetch(`https://${API_ENDPOINT}/api/product/${productId}`);
          
          if (!response.ok) {
            console.error(`Error fetching product ${productId}: ${response.statusText}`);
            continue;
          }
  
          const responseBody = await response.text();
          
          if (!responseBody) {
            console.error(`Empty response for product ${productId}`);
            continue;
          }
          
          try {
            const data = JSON.parse(responseBody);
            fetchedProducts[productId] = data;
          } catch (jsonError) {
            //console.error(`Failed to parse JSON for product ${productId}: ${jsonError.message}`);
          }
  
        } catch (error) {
          console.error(`Error fetching product ${productId}:`, error);
        }
      }
      setProductData(fetchedProducts);
    };
  
    if (wishlist.productIds.length > 0) {
      fetchProducts();
    }
  }, [wishlist.productIds]);
  

  const handleHeartClick = (productId: string) => {
    onDelete(productId);
    const isFilled = filledHearts.has(productId);
    setFilledHearts(productId, !isFilled);
  };

  const toggleVisibility = (key: string) => {
    setVisibleFactors((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex flex-col gap-y-6 pt-8 mt-0 items-center px-4 pb-10 w-[100%] justify-center">
      <div className="text-2xl w-full pl-20 font-bold text-white">
        <h4>Your Wishlist</h4>
      </div>
      {wishlist.productIds.length > 0 ? (
        wishlist.productIds.map((productId, index) => {
          const product = productData[productId];
          if (!product) {
            return <div key={index} className="text-white">Loading...</div>;
          }

          const productPrice = product.prices[0] || "Price not available";
          const imageUrl = product.media.length > 0 ? product.media[0].link : "";
          const productLink = product.sellers_results?.online_sellers?.[0]?.link || "#";
          const title = product.title || "";

          const review = wishlist.productReviews.find(
            (review) => review.productId === productId
          )?.review || "";

          const reviewData = parseReview(review);

          const hasReviews = reviewData.pros.length > 0 || reviewData.cons.length > 0 || reviewData.buyingReasons !== "";

          return (
            <div
              className="relative flex justify-center items-center max-w-2xl lg:w-full max-md:w-[100%] max-md:px-2 flex-col gap-x-4 rounded-xl bg-[#191919] p-4 lg:p-8 pb-6 lg:pb-10"
              key={index}
            >
              <Link href={productLink} passHref legacyBehavior>
                <a
                  className="lg:w-full relative max-md:w-[100%] max-md:px-2 flex flex-col gap-x-4 rounded-xl bg-[#191919] p-4 lg:p-8 pb-6 lg:pb-10"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex max-md:flex-col justify-center items-center">
                    <div className="w-52 h-52 relative rounded-xl bg-custom-gradient-cards">
                      <Image
                        src={imageUrl}
                        alt={`wishlist-product-${index + 1}`}
                        layout="fill"
                        className="rounded-xl product-image-class"
                      />
                    </div>
                    <div className="flex flex-col justify-start items-start w-[calc(100%-300px)] m-4">
                      <div className="text-[17px] text-white">{title}</div>
                      <div className="flex h-max items-center gap-x-2 p-1.5 px-3 mt-2 rounded-xl bg-[#E8DEF8]">
                        <div className="w-3">
                          <Image src={BlackTick} alt="tick" />
                        </div>
                        <div>{productPrice}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col pt-5 gap-y-2">
                    <div className="whitespace-pre-wrap text-gray-400 text-[15px]">
                      {reviewData.description}
                    </div>
                  </div>
                </a>
              </Link>
              {hasReviews && (
                <div className="relative bg-[#3c3b3b] text-white py-2 px-4 rounded-lg z-10 w-full transition mb-5">
                  <div
                    className="flex justify-between items-center w-full cursor-pointer"
                    onClick={() => toggleVisibility(`pros-${productId}`)}
                  >
                    <div className="p-1 cursor-pointer" key={"pros"}>
                      <h4 className="text-white">Pros</h4>
                    </div>
                    <div className="z-5 font-semibold">
                      <h4 className="font-semibold text-white">
                        {visibleFactors[`pros-${productId}`] ? "-" : "+"}
                      </h4>
                    </div>
                  </div>
                  {visibleFactors[`pros-${productId}`] && (
                    <ul className="list-disc ml-5">
                      {reviewData.pros.map((item, index) => (
                        <li
                          key={index}
                          className="leading-relaxed text-white mt-2 whitespace-pre-wrap text-sm pl-4"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  <hr className="my-2 border-b-2 border-[#222222]" />
                  <div
                    className="flex justify-between items-center w-full cursor-pointer"
                    onClick={() => toggleVisibility(`cons-${productId}`)}
                  >
                    <div className="p-1 cursor-pointer" key={"cons"}>
                      <h4 className="text-white">Cons</h4>
                    </div>
                    <div className="z-5 font-semibold">
                      <h4 className="font-semibold text-white">
                        {visibleFactors[`cons-${productId}`] ? "-" : "+"}
                      </h4>
                    </div>
                  </div>
                  {visibleFactors[`cons-${productId}`] && (
                    <ul className="list-disc ml-5">
                      {reviewData.cons.map((item, index) => (
                        <li
                          key={index}
                          className="leading-relaxed text-white mt-2 whitespace-pre-wrap text-sm pl-4"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  <hr className="my-2 border-b-2 border-[#222222]" />
                  <div
                    className="flex justify-between items-center w-full cursor-pointer"
                    onClick={() => toggleVisibility(`reason-${productId}`)}
                  >
                    <div className="p-1 cursor-pointer" key={"reason"}>
                      <h4 className="text-white">Buying Reasons</h4>
                    </div>
                    <div className="z-5 font-semibold">
                      <h4 className="font-semibold text-white">
                        {visibleFactors[`reason-${productId}`] ? "-" : "+"}
                      </h4>
                    </div>
                  </div>
                  {visibleFactors[`reason-${productId}`] && (
                    <div className="leading-relaxed text-white mt-2 whitespace-pre-wrap text-sm pl-4">
                      {reviewData.buyingReasons}
                    </div>
                  )}
                </div>
              )}
              <div
                className="absolute top-8 right-8 z-10 cursor-pointer"
                onClick={() => handleHeartClick(productId)}
              >
                <Heart width={24} height={24} color={filledHearts.has(productId) ? "red" : "white"} />
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-white">No items in your wishlist.</div>
      )}
    </div>
  );
}