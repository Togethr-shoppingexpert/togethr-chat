import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BlackTick from "@/public/test/blacktick.png";
import Heart from "@/public/icons/HeartIcon";
import { useContentContext } from "@/ContentContext";
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

interface Product{
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

export default function WishlistUI({
  wishlist,
  onDelete,
}: WishlistUIProps) {
  const defaultProduct: Product ={
    description: "",
    media: [],
    prices: [],
    product_id: "",
    rating: 0 ,
    reviews_results: [],
    sellers_results: [],
    title: "",
    link: "" ,
  }
  const { productInfo, filledHearts, setFilledHearts } = useContentContext();
  const [visibleFactors, setVisibleFactors] = useState<{ [key: string]: boolean }>({});
  const [product, setProduct] = useState<Product>(defaultProduct);
  const [productTitle, setProductTitle] = useState<string>("");
  const [productImg, setProductImg] = useState<string>("");
  const [productPrize, setProductPrize] = useState<string[]>([]);
  const [productUrl, setProductUrl] = useState<string>("");
  const [productDes, setProductDes] = useState<string>("");

  const fetchProduct = async (productId: string) => {
    console.log("Fetching product reviews with Conversation ID:", productId);

    try {
      const response = await fetch(`https://${API_ENDPOINT}/api/product/${productId}`);
      if (!response.ok) {
        throw new Error(`Error fetching product using : ${response.status}`);
      }
      const data = await response.json();
      console.log("Products  fetched successfully using product api:", data);
      setProduct(data);
      //setProductTitle(data.title);
      setProductPrize(data.prize[0]);
      //setProductImg(data.media[0].link);
      setProductUrl(data.product.sellers_results.online_sellers[0].link);
      setProductDes(data.description);

    } catch (error) {
      console.error("Error fetching product reviews:", error);
    }
  };

  const getProductPrice = (productId: string) => {
    const product = productInfo.find(
      (info: Product) => info.product_id === productId
    );
    return product ? product.prices[0] : "Price not available";
  };

  const getProductTitle = (): string => {
    if (product && product.title) {
      return product.title; // Assuming the first media item is the image
    }
    console.log('product title of Product api', product.title);
    return  "";
  };

  const getImageUrl = (): string => {
    if (product && product.media && product.media.length > 0) {
      return product.media[0].link; // Assuming the first media item is the image
    }
    return ""; // Return an empty string if no media is available
  }

  const getProductLink = (): string => {
    if (product && product.sellers_results && product.sellers_results.online_sellers && product.sellers_results.length > 0) {
      return product.sellers_results.online_sellers[0].link; // Assuming the first media item is the image
    }
    return "#";
  };


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
          fetchProduct(productId);
          {product}
          const productPrice = getProductPrice(productId);
          const imageurl = getImageUrl();
          const productLink = getProductLink();
          const title = getProductTitle();

          // Find the corresponding review for this product
          const review = wishlist.productReviews.find(
            (review) => review.productId === productId
          )?.review || "";

          const reviewData = parseReview(review);

          const hasReviews = reviewData.pros.length > 0 || reviewData.cons.length > 0 || reviewData.buyingReasons !== "";

          return (
            <div
              className="relative flex justify-center items-center max-w-2xl lg:w-full  max-md:w-[100%] max-md:px-2  flex-col gap-x-4 rounded-xl bg-[#191919] p-4 lg:p-8 pb-6 lg:pb-10"
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
                        src={imageurl}
                        alt={`wishlist-product-${index + 1}`}
                        layout="fill"
                        className="rounded-xl product-image-class"
                      />
                    </div>
                    <div className="flex flex-col justify-start items-start w-[calc(100%- 300px)] m-4">
                      <div className="text-[17px] text-white">
                        {title}
                      </div>
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
                  <div className="flex justify-between items-center w-full cursor-pointer" onClick={() => toggleVisibility(`pros-${productId}`)}>
                    <div className="p-1 cursor-pointer" key={"pros"}>
                      <h4 className="text-white">Pros</h4>
                    </div>
                    <div className="z-5 font-semibold">
                      <h4 className="font-semibold text-white">{visibleFactors[`pros-${productId}`] ? "-" : "+"}</h4>
                    </div>
                  </div>
                  {visibleFactors[`pros-${productId}`] && (
                    <ul className="list-disc ml-5">
                      {reviewData.pros[0].split("\n").map((item: string, index: number) => (
                        <li key={index} className="leading-relaxed text-white mt-2 whitespace-pre-wrap text-sm pl-4">
                          {item.replace(/^- /, '')}
                        </li>
                      ))}
                    </ul>
                  )}
                  <hr className="my-2 border-b-2 border-[#222222]" />
                  <div className="flex justify-between items-center w-full cursor-pointer" onClick={() => toggleVisibility(`cons-${productId}`)}>
                    <div className="p-1 cursor-pointer" key={"cons"}>
                      <h4 className="text-white">Cons</h4>
                    </div>
                    <div className="z-5 font-semibold">
                      <h4 className="font-semibold text-white">{visibleFactors[`cons-${productId}`] ? "-" : "+"}</h4>
                    </div>
                  </div>
                  {visibleFactors[`cons-${productId}`] && (
                    <ul className="list-disc ml-5">
                      {reviewData.cons[0].split("\n").map((item: string, index: number) => (
                        <li key={index} className="leading-relaxed text-white mt-2 whitespace-pre-wrap text-sm pl-4">
                          {item.replace(/^- /, '')}
                        </li>
                      ))}
                    </ul>
                  )}
                  <hr className="my-2 border-b-2 border-[#222222]" />
                  <div className="flex justify-between items-center w-full cursor-pointer" onClick={() => toggleVisibility(`reason-${productId}`)}>
                    <div className="p-1 cursor-pointer" key={"reason"}>
                      <h4 className="text-white">Buying Reasons</h4>
                    </div>
                    <div className="z-5 font-semibold">
                      <h4 className="font-semibold text-white">{visibleFactors[`reason-${productId}`] ? "-" : "+"}</h4>
                    </div>
                  </div>
                  {visibleFactors[`reason-${productId}`] && (
                    <p className="mt-2 whitespace-pre-wrap text-sm pl-4">{reviewData.buyingReasons}</p>
                  )}
                </div>
              )}
              <div onClick={() => handleHeartClick(productId)} className="absolute top-2 right-2 z-50 p-2 flex rounded-full cursor-pointer">
                <Heart width={24} height={24} color={filledHearts.has(productId) ? "red" : "white"} />
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-white text-center">
          No products in your wishlist.
        </div>
      )}
    </div>
  );
}
