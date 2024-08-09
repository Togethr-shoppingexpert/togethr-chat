import React, { useState, useCallback, ReactNode, useRef } from "react";
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

const Videos = () => {
  const sliderRef = useRef<Slider>(null);

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  const { videoContent } = useContentContext();

  // Function to extract video ID from YouTube URL
  const getVideoId = (url: string | URL) => {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("v");
  };

  if (videoContent.length > 0) {
    return (
      <div className="w-full lg:w-full pt-10">
        <div className="text-2xl font-bold text-white">Videos</div>
        <CustomSlider onPrevClick={goToPrev} onNextClick={goToNext} sliderRef={sliderRef}>
          {videoContent.map((item, index) => {
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



{/*import React, { useState, useCallback, ReactNode, useRef, useEffect } from "react";
//@ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import ArrowLeft from "../public/arrow-left.png";
import ArrowRight from "../public/arrow-right.png";
import { useContentContext } from "@/ContentContext";

interface VideoContent {
  url: string;
  title?: string;
  description?: string;
}

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

const Videos = () => {
  const [videoDetails, setVideoDetails] = useState<VideoContent[]>([]);
  const sliderRef = useRef<Slider>(null);

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  const { videoContent } = useContentContext();

  useEffect(() => {
    if (videoContent.length > 0) {
      setVideoDetails(videoContent);
    }
  }, [videoContent]);

  const getVideoId = (url: string) => {
    try {
      const urlObj = new URL(url); // This will throw an error if URL is invalid
      return urlObj.searchParams.get("v");
    } catch (error) {
      console.error("Invalid URL provided:", url);
      return null; // Return null if URL is invalid
    }
  };


  if (videoDetails.length > 0) {
    return (
      <div className="w-full lg:w-full pt-10">
        <div className="text-2xl font-bold text-white">Videos</div>
        <CustomSlider onPrevClick={goToPrev} onNextClick={goToNext} sliderRef={sliderRef}>
          {videoDetails.map((item, index) => {
            const videoId = getVideoId(item.url);
            const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';

            return (
              <div className="p-2" key={index}>
                <div className="bg-[#191919] p-4 rounded-xl">
                  <div className="w-full h-40 uppercase rounded-xl flex justify-center items-center italic text-xl text-white bg-custom-gradient-cards">
                    <img
                      src={thumbnailUrl}
                      alt="YouTube Thumbnail"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col h-max gap-y-2">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <div className="text-white text-[13px] mt-6 hover:text-[#0C8CE9]">{item.title}</div>
                    </a>
                    {item.description && (
                      <div className="text-white text-sm mt-2">{item.description}</div>
                    )}
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

export default Videos;*/}
