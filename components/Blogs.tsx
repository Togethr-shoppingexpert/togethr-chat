"use client";
import React, { useRef } from "react";
//@ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import ArrowLeft from "../public/arrow-left.png";
import ArrowRight from "../public/arrow-right.png";

interface CustomSliderProps {
  children: React.ReactNode;
  onPrevClick: () => void;
  onNextClick: () => void;
  sliderRef: React.RefObject<Slider>;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  children,
  onPrevClick,
  onNextClick,
  sliderRef,
}) => {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true, // Enable swipe to slide on mobile devices
    touchThreshold: 10, 
    responsive: [
      {
        breakpoint: 1024, // Tablet screen size
        settings: {
          slidesToShow: 2, // Show 2 slides on tablets
        },
      },
      {
        breakpoint: 668, // Mobile screen size
        settings: {
          slidesToShow: 1, // Show 1 slide on mobile
          centerMode: true, // Centers the slide on mobile
          centerPadding: "0px", // Removes padding on the sides of centered slides
        },
      },
    ],
  };

  return (
    <div className="relative px-4 max-md:w-[380px]">
      <div
        className="w-12 h-12 cursor-pointer absolute z-10 top-[33.3%] -left-0.5"
        onClick={onPrevClick}
      >
        <Image src={ArrowLeft} alt="arrow-left" />
      </div>
      <Slider ref={sliderRef} {...settings} className="z-3">
        {children}
      </Slider>
      <div
        className="w-12 h-12 cursor-pointer absolute z-10 right-0 top-[33.3%]"
        onClick={onNextClick}
      >
        <Image src={ArrowRight} alt="arrow-right" />
      </div>
    </div>
  );
};

interface BlogContent {
  title: string;
  link: string;
  favicon: string;
  source: string;
}

interface BlogsProps {
  content: BlogContent[];
}

const Blogs: React.FC<BlogsProps> = ({ content }) => {
  const sliderRef = useRef<Slider>(null);

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  if (content.length <= 0) {
    return null;
  }

  return (
    <div className="w-full lg:w-full pt-10 px-4 max-md:w-[380px]">
      <div className="text-2xl font-bold text-white">Blogs</div>
      <CustomSlider
        onPrevClick={goToPrev}
        onNextClick={goToNext}
        sliderRef={sliderRef}
      >
        {content.map((item, index) => (
          <div className="p-2" key={index}>
            <div className="bg-[#191919] p-2 rounded-xl h-32">
              <div className="flex flex-col h-max gap-y-2">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <div className="text-white text-[13px] flex align-top p-1 h-14 mt-0 hover:text-[#0C8CE9]">
                    {item.title}
                  </div>
                </a>
                <div className="text-white flex flex-row justify-start items-center mt-2">
                  <img className="h-6 w-6 p-0.5" src={item.favicon} alt="favicon" />
                  <div className="text-xs p-1 text-[#767676]">{item.source}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CustomSlider>
    </div>
  );
};

export default Blogs;
