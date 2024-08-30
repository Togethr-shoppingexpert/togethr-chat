import React from "react";

const mockdata = [
  { title: "Noise Cancelling" },
  { title: "Wireless" },
  { title: "Earbuds" },
  { title: "Wired" },
  { title: "Earphones" },
];

export default function NameCards() {
  return (
    <div className="w-[65%] mt-20 grid grid-cols-3 justify-start gap-4">
      {mockdata.map((item, index) => (
        <div
          key={index}
          className="w-full h-40 uppercase rounded-xl flex justify-center items-center italic text-xl p-4 text-white bg-custom-gradient-cards"
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}
