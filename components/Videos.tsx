import React, { useState, useCallback, ReactNode, useRef, useEffect } from "react";
//@ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import ArrowLeft from "../public/arrow-left.png";
import ArrowRight from "../public/arrow-right.png";
import { useContentContext } from "@/ContentContext";

interface CustomSliderProps {
  children: ReactNode;
  onPrevClick: () => void;
  onNextClick: () => void;
  sliderRef: React.RefObject<Slider>;
}

interface VideoContent {
  link: string;
  title: string;
  description: string;
  length: number;
}


interface VideosProps {
  content: VideoContent[]; // Updated to take content as a prop
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  children,
  onPrevClick,
  onNextClick,
  sliderRef,
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isTabletScreen, setIsTabletScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsSmallScreen(screenWidth <= 768);
      setIsTabletScreen(screenWidth > 768 && screenWidth <= 1024);
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        breakpoint: 1024, // Tablet screen size
        settings: {
          slidesToShow: 2, // Show 2 slides on tablets
        },
      },
      {
        breakpoint: 668, // Mobile screen size
        settings: {
          slidesToShow: 1, // Show 1 slide on mobile
        },
      },
    ],
  };

  return (
    <div className="relative px-4 max-md:w-[380px]">
      <div
        className="w-14 cursor-pointer absolute z-10 top-[40%] -left-0.5"
        onClick={onPrevClick}
      >
        <Image src={ArrowLeft} alt="arrow-left" />
      </div>
      <Slider ref={sliderRef} {...settings} className='z-3'>
        {children}
      </Slider>
      <div
        className="w-14 cursor-pointer absolute z-10 right-0 top-[40%]"
        onClick={onNextClick}
      >
        <Image src={ArrowRight} alt="arrow-right" />
      </div>
    </div>
  );
};

const Videos: React.FC<VideosProps> = ({ content })=> {


  const sliderRef = useRef<Slider>(null);

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  

  // Function to extract video ID from YouTube URL
  const getVideoId = (url: string | URL) => {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("v");
  };

  if (content.length > 0) {
    return (
      <div className=" lg:w-full pt-10 px-4 max-md:w-[380px]">
        <div className="text-2xl font-bold text-white">Videos</div>
        <CustomSlider onPrevClick={goToPrev} onNextClick={goToNext} sliderRef={sliderRef}>
          {content.map((item, index) => {
            const videoId = getVideoId(item.link);
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

            return (
              <div className="p-2" key={index}>
                <div className="bg-[#191919] p-2 rounded-xl  h-72">
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="w-full h-40 uppercase rounded-xl flex flex-col justify-center items-center  text-xl text-white bg-custom-gradient-cards relative">
                    <img src={thumbnailUrl} alt="YouTube Thumbnail" className="w-full h-full object-cover rounded-xl" />
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-50 p-1 rounded-md text-xs">{item.length}</div>
                  </a>
                  <div className="flex flex-col pt-0 p-2 h-max gap-y-2">
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <div className="text-white text-[13px] mt-2 hover:text-[#0C8CE9] transition-colors duration-200">{item.title}</div>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </CustomSlider>
      </div>
    );
  }

  return null;
};

export default Videos;