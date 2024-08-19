// import React from "react";
// import Image from "next/image";
// import TestOne from "../public/test/test1.png";
// import TestTwo from "../public/test/test2.png";
// import TestThree from "../public/test/test3.png";
// import BlackTick from "../public/test/blacktick.png";
// import Favourite from "../public/test/favourite.png";
// import NameCards from "./NameCards";
// import Videos from "./Videos";
// import Blogs from "./Blogs";
// import Navbar from "./shared/Navbar";
// import { useContentContext } from "@/ContentContext";

// const mockdata = [
//   {
//     title: "Shokz OpenRun Pro",
//     subtitle: "Best Overall",
//     description:
//       "Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
//     image: TestOne,
//   },
//   {
//     title: "Shokz OpenRun Pro",
//     subtitle: "Best Overall",
//     description:
//       "Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
//     image: TestThree,
//   },
//   {
//     title: "Shokz OpenRun Pro",
//     subtitle: "Best Overall",
//     description:
//       "Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
//     image: TestOne,
//   },
// ];

// interface Product {
//   product_name: string;
//   product_id: string;
//   recommendation_reason: string;
// }
// interface WishlistUIProps{
//   bestProducts?:Product[]
// }

// export default function WishlistUI(){
//   // console.log(bestProducts);
//   // console.log(Array.isArray(bestProducts));
//   // if (!Array.isArray(bestProducts)) {
//   //   console.error("Expected bestProducts to be an array, but got:", bestProducts);
//   //   return null; // Or some fallback UI
//   // }

//   const {
//     productInfo,
//     bestProducts
//   } = useContentContext();
//   return (
//     <>
//     {console.log("bestproductswishlist",bestProducts)}
//       <div className="flex flex-col gap-y-6 pt-8 px-4 lg:px-0 pb-20">
//         {bestProducts.map((item, index) => (
//           <div
//             key={index}
//             className="lg:w-full flex flex-col lg:flex-row gap-x-4 rounded-xl bg-[#191919] p-4 lg:p-8 pb-6 lg:pb-10"
//           >
//             <div className="w-40 p-4 rounded-xl bg-custom-gradient-cards">
//               {/* <Image src="https://t3.ftcdn.net/jpg/05/95/78/78/360_F_595787852_efGpIfJmAJxcof7PBsQsDmirsZ3R8o50.jpg" width={100} height={100} alt={`test${index + 1}`} /> */}
//             </div>
//             <div className="flex flex-col gap-y-2">
//               <div className="flex justify-between items-center">
//                 <div className="flex flex-col lg:flex-row h-max gap-y-2 gap-x-4 items-start lg:items-center">
//                   <div className="text-xl text-white mt-2 lg:mt-0">
//                     {item.product_name}
//                   </div>
//                   <div className="flex h-max items-center gap-x-2 p-1.5 px-3 rounded-xl bg-[#E8DEF8]">
//                     <div className="w-3">
//                       <Image src={BlackTick} alt="tick" />
//                     </div>
//                     <div>{item.product_id}</div>
//                   </div>
//                 </div>
//                 <div className="w-5">
//                   <Image src={Favourite} alt="favourite" />
//                 </div>
//               </div>
//               {/* <div className="text-lg text-gray-300">{item.recommendation_reason}</div> */}
//             </div>
//           </div>
//         ))}
//         {/* <div className="w-full flex justify-end">
//           <NameCards />
//         </div>
//         */}
//       </div>
//     </>
//   );
// }



import React from "react";
import Link from 'next/link';
import Image from "next/image";
import TestOne from "../public/test/test1.png";
import TestTwo from "../public/test/test2.png";
import TestThree from "../public/test/test3.png";
import BlackTick from "../public/test/blacktick.png";
import Favourite from "../public/test/favourite.png";
import { useContentContext } from "@/ContentContext";

const mockdata = [
  {
    title: "Shokz OpenRun Pro",
    subtitle: "Best Overall",
    description:
      "Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    image: TestOne,
  },
  {
    title: "Shokz OpenRun Pro",
    subtitle: "Best Overall",
    description:
      "Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    image: TestThree,
  },
  {
    title: "Shokz OpenRun Pro",
    subtitle: "Best Overall",
    description:
      "Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    image: TestOne,
  },
];

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
  bestProducts?: Product[];
}

export default function WishlistUI() {
  const { productInfo, bestProducts } = useContentContext();

  const getProductPrice = (productId: string) => {
    const product = productInfo.find((info: ProductInfo) => info.product_id === productId);
    return product ? product.prices[0] : "Price not available";
  };
  const getImageUrl=(productId:string)=>{
    const product = productInfo.find((info: ProductInfo) => info.product_id === productId);
    return product?product.media[0].link:"";
  }

  const getProductLink = (productId: string) => {
    
    const product = productInfo.find((info: ProductInfo) => info.product_id === productId);
    return product ? product.sellers_results.online_sellers[0].link : "#";
  };

  return (
    <>
      {console.log("productinfo in widhlishtui", productInfo)}
      {console.log("bestproductswishlist", bestProducts)}
      <div className="flex flex-col gap-y-6 pt-8 mt-0 items-center px-4 lg:px-0 pb-10">
        {bestProducts.map((item, index) => {
          const productPrice = getProductPrice(item.product_id);
          const imageurl=getImageUrl(item.product_id);
          const productLink = getProductLink(item.product_id);

          return (
            <Link href={productLink} key={index} passHref legacyBehavior>
              <a className="lg:w-full flex flex-col lg:flex-row gap-x-4 rounded-xl bg-[#191919] p-4 lg:p-8 pb-6 lg:pb-10">
                <div className="w-full h-50 relative rounded-xl bg-custom-gradient-cards">
                  <Image
                    src={imageurl}
                    alt={`test${index + 1}`}
                    layout="fill"
                    className="rounded-xl product-image-class"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
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
                  <div className="text-gray-400 text-[15px]">{item.recommendation_reason}</div>
                </div>
              </a>
            </Link>
          );
        })}

      </div>
    </>
  );
}
