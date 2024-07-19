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

interface Blog {
  title: string;
  description: string;
  speciality: string;
}



const Blogs = () => {
  const sliderRef = useRef<Slider>(null);

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  const truncateDescription = (description: string) => {
    if (description.length > 50) {
      return description.slice(0, 50) + "...";
    }
    return description;
  };
  const {blogsContent}=useContentContext();
  return (
    <div className="w-full lg:w-full mt-10">
      <div className="text-2xl font-bold text-white">Blogs</div>
      <CustomSlider
        onPrevClick={goToPrev}
        onNextClick={goToNext}
        sliderRef={sliderRef}
      >
        {blogsContent.map((item, index) => (
          <div className="p-2" key={index}>
            <div className="bg-[#191919] p-4 rounded-xl">
              <div className="w-full flex flex-col lg:flex-row gap-x-4 lg:gap-y-2">
                <div className="w-full h-32 uppercase mr-4 rounded-2xl flex justify-center items-center italic text-xl p-4 text-white bg-custom-gradient-cards"></div>
                <div className="flex flex-col h-max gap-y-2">
                  <div className="text-white text-xl mt-6">{item.title}</div>
                  <div className="text-white text-sm">
                    {truncateDescription(item.description)}
                  </div>
                </div>
              </div>
              <div className="w-max h-max p-1.5 px-3 rounded-xl bg-[#E8DEF8] mt-8">
                {/* <div>{item.speciality}</div> */}
              </div>
            </div>
          </div>
        ))}
      </CustomSlider>
    </div>
  );
};

export default Blogs;
