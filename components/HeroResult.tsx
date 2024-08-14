import React from "react";
import Videos from "./Videos";
import Blogs from "./Blogs";
import WishlistUI from "./WishlistUI";


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