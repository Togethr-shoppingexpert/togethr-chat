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
    <div className="relative">
      <div className="flex justify-center items-center">
        <Button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#0C8CE9] mx-2 text-white p-2 rounded-full focus:outline-none z-10" onClick={handlePrev}>
          &lt;
        </Button>
        <div className="max-w-md overflow-hidden"> {/* Max width for the carousel */}
          <div className="w-full flex" style={{ transform: `translateX(-${(currentIndex) * 100}%)`, transition: 'transform 0.4s ease-in-out' }}>
            {products.map((product, index) => (
              <Link href="https://togethr.store" key={index}>
                <div className="flex-shrink-0 mr-4 h-96 max-w-md"> {/* Increase max width for individual cards */}
                  <div className="max-w-full min-w-80 mx-auto rounded-xl my-1 hover:scale-105 text-white bg-[#2F3031] transition hover:cursor-pointer">
                    <div className="flex flex-col">
                      <div className="flex-shrink-0">
                        <Image alt="product" src={product.image} height="200" width="200" className="rounded-xl" />
                      </div>
                      <div className="flex flex-col justify-between p-4">
                        <p className="text-lg font-semibold">{product.name}</p>
                        <div className="flex items-center">
                          <p className="text-xs text-gray-500 mr-2">Rating : {product.rating}</p>
                          <p className="text-xs text-gray-500 mr-2">{product.reviews} reviews</p>
                        </div>
                        <p className="text-sm font-semibold text-white mt-2"> Price :${product.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <Button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#0C8CE9] mx-2 text-white p-2 rounded-full focus:outline-none z-10" onClick={handleNext}>
          &gt;
        </Button>
      </div>
    </div>
  );
};

export default ProductCarousel;
