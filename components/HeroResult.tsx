import React from "react";
import Image from "next/image";
import TestOne from "../public/test/test1.png";
import TestTwo from "../public/test/test2.png";
import TestThree from "../public/test/test3.png";
import BlackTick from "../public/test/blacktick.png";
import Favourite from "../public/test/favourite.png";
import NameCards from "./NameCards";
import Videos from "./Videos";
import Blogs from "./Blogs";
import WishlistUI from "./WishlistUI";

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
interface Blog {
  title: string;
  description: string;
  speciality: string;
}

interface Video {
  title: string;
  description: string;
  // Add other video-related fields here
}
// interface Product {
//   product_name: string;
//   product_id: string;
//   recommendation_reason: string;
// }
// export interface HeroResultProps {
//   // blogs: Blog[];
//   // videos: Video[];
//   // buyingguide: string;
//   bestProducts:Product[];
// }


const HeroResult = () => {
  return (
    
    <div className="max-w-2xl justify-center h-full flex flex-col gap-y-6 pt-8 px-4 lg:px-0 pb-20">
      <WishlistUI  />
      {/* <div className="w-full flex"> */}
        <Videos />
      {/* </div> */}
      {/* <div className="w-full flex justify-end"> */}
        <Blogs />
      {/* </div> */}
    </div>
  );
};

export default HeroResult;