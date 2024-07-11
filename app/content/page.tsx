"use client";
import React, { useState, useCallback, ReactNode, useRef } from "react";
//@ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import ArrowLeft from "../../public/arrow-left.png";
import ArrowRight from "../../public/arrow-right.png";
import Navbar from "@/components/shared/Navbar";
import FooterNav from "@/components/FooterNav";

interface CustomSliderProps {
  children: ReactNode;
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
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const handleBeforeChange = useCallback((current: number, next: number) => {
    setCurrentSlide(next);
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: handleBeforeChange,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="relative px-4">
      <div
        className="w-14 cursor-pointer absolute z-50 top-[40%] -left-0.5"
        onClick={onPrevClick}
      >
        <Image src={ArrowLeft} alt="arrow-left" />
      </div>
      <Slider ref={sliderRef} {...settings}>
        {children}
      </Slider>
      <div
        className="w-14 cursor-pointer absolute z-50 right-0 top-[40%]"
        onClick={onNextClick}
      >
        <Image src={ArrowRight} alt="arrow-right" />
      </div>
    </div>
  );
};

interface MockData {
  title: string;
  description: string;
}

export default function ContentComponent() {
  const sliderRef = useRef<Slider>(null);

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  const mockdata: MockData[] = [
    {
      title: "Noise Cancelling",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, quia!",
    },
    {
      title: "Wireless",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, quia!",
    },
    {
      title: "Earbuds",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, quia!",
    },
    {
      title: "Wired",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, quia!",
    },
    {
      title: "Earphones",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, quia!",
    },
  ];

  return (
    <>
    <div></div>
      <Navbar mode="dark" />
      <div className="w-full lg:w-full pt-10 bg-[#202222] px-6 lg:px-[6%]">
        <div className="text-2xl font-bold text-white">Videos</div>
        <CustomSlider
          onPrevClick={goToPrev}
          onNextClick={goToNext}
          sliderRef={sliderRef}
        >
          {mockdata.map((item, index) => (
            <div className="p-2" key={index}>
              <div className="bg-[#191919] p-4 rounded-xl">
                <div className="w-full h-40 uppercase rounded-xl flex justify-center items-center italic text-xl p-4 text-white bg-custom-gradient-cards"></div>
                <div className="flex flex-col gap-y-2">
                  <div className="text-white text-xl mt-6">{item.title}</div>
                  <div className="text-white text-sm">{item.description}</div>
                </div>
              </div>
            </div>
          ))}
        </CustomSlider>
      </div>
      <FooterNav />
    </>
  );
}
