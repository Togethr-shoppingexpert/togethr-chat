import React from "react";
import Image from "next/image";
import TestOne from "../public/test/test1.png";
import TestTwo from "../public/test/test2.png";
import TestThree from "../public/test/test3.png";
import BlackTick from "../public/test/blacktick.png";
import Favourite from "../public/test/favourite.png";

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
    image: TestTwo,
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
  {
    title: "Shokz OpenRun Pro",
    subtitle: "Best Overall",
    description:
      "Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    image: TestTwo,
  },
  {
    title: "Shokz OpenRun Pro",
    subtitle: "Best Overall",
    description:
      "Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    image: TestThree,
  },
];

export default function HeroResult() {
  return (
    <div className="w-full overflow-hidden flex flex-col gap-y-6 pt-10">
      {mockdata.map((item, index) => (
        <div
          key={index}
          className="w-full flex gap-x-4 rounded-xl border-2 border-[#D9D9D9] p-8 pb-20"
        >
          <div className="w-40">
            <Image src={item.image} alt={`test${index + 1}`} />
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex justify-between items-center">
              <div className="flex h-max gap-x-4 items-center">
                <div className="text-xl text-white">{item.title}</div>
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
    </div>
  );
}
