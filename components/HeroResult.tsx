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

export default function HeroResult() {
  return (
    <>
      <div className="lg:w-max overflow-hidden flex flex-col gap-y-6 pt-8 px-4 lg:px-0 pb-20">
        {mockdata.map((item, index) => (
          <div
            key={index}
            className="lg:w-full flex flex-col lg:flex-row gap-x-4 rounded-xl bg-[#191919] p-4 lg:p-8 pb-6 lg:pb-10"
          >
            <div className="w-40 lg:w-80 p-4 rounded-xl bg-custom-gradient-cards">
              <Image src={item.image} alt={`test${index + 1}`} />
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-between items-center">
                <div className="flex flex-col lg:flex-row h-max gap-y-2 gap-x-4 items-start lg:items-center">
                  <div className="text-xl text-white mt-2 lg:mt-0">
                    {item.title}
                  </div>
                  <div className="flex h-max items-center gap-x-2 p-1.5 px-3 rounded-xl bg-[#E8DEF8]">
                    <div className="w-3">
                      <Image src={BlackTick} alt="tick" />
                    </div>
                    <div>{item.subtitle}</div>
                  </div>
                </div>
                <div className="w-5">
                  <Image src={Favourite} alt="favourite" />
                </div>
              </div>
              <div className="text-lg text-gray-300">{item.description}</div>
            </div>
          </div>
        ))}
        {/* <div className="w-full flex justify-end">
          <NameCards />
        </div>
        */}
        <div className="w-full flex">
          <Videos />
        </div>
        <div className="w-full flex justify-end">
          <Blogs />
        </div>
      </div>
    </>
  );
}
