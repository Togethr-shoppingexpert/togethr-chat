'use client'
import { useState } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';

const ProductCarousel = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? products.length - 1 : prevIndex - 1));
  };

  return (
    <div className="relative ">
      <div className="flex justify-center items-center ">
        <Button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#0C8CE9]  text-2xl mx-2 text-white p-2 rounded-md focus:outline-none z-10" onClick={handlePrev}>
          &lt;
        </Button>
        <div className="max-w-md overflow-hidden mx-2"> {/* Max width for the carousel */}
          <div className="w-full flex" style={{ transform: `translateX(-${(currentIndex) * 100}%)`, transition: 'transform 0.4s ease-in-out' }}>
            {products.map((product, index) => (
              <Link href={product.sellers_results.online_sellers[0].link} key={index} target="_blank" >
                <div className="flex-shrink-0 mr-4  w-[200px] h-[300px]"> {/* Increase max width for individual cards */}
                  <div className="max-w-full min-w-80 mx-auto rounded-xl my-1 hover:scale-105 text-black bg-[#2F3031] transition hover:cursor-pointer">
                    <div className="flex flex-col">
                      <div className="flex-shrink-0">
                        <img alt="product" src={product.media[0].link} className="rounded-xl object-cover" />
                      </div>
                      <div className="flex flex-col justify-between p-4 truncate">
                        <p className="text-md mb-4 mt-2 font-semibold text-white truncate">{product.title}</p>
                        <div className="flex items-center">
                          <p className="text-xs text-white mr-2">Rating : <span className='font-semibold text-xl'>{product.rating} </span> stars</p>
                          {/* <p className="text-xs text-gray-500 mr-2">{product.reviews} reviews</p> */}
                        </div>
                        <p className="text-sm font-semibold text-white mt-2"> Price : {product.prices[0]}</p>
                      </div>
                    </div>
                  </div>
                </div>
             </Link>
            ))}
          </div>
        </div>
        <Button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#0C8CE9] text-2xl  text-white p-2 rounded-md  z-10" onClick={handleNext}>
          &gt;
        </Button>
      </div>
    </div>
  );
};

export default ProductCarousel;
