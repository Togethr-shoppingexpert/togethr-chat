'use client'
import { useState , useRef } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"


const ProductCarousel = ({ products }) => {

  const hasErrors = products.some(product => product && product.Error);

  if (hasErrors) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-red-500 font-semibold">Not found</p>
      </div>
    );
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const [startX, setStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, products.length - 1));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust sensitivity if needed
    containerRef.current.scrollLeft = containerRef.current.scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative">
    <div className="flex justify-center items-center">
      <Button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#0C8CE9] text-xl md:text-xl lg:text-2xl  text-white p-2 rounded-md focus:outline-none z-10" onClick={handlePrev}>
        &lt;
      </Button>
      <div className="max-w-md overflow-hidden mx-2 z-20"  > {/* Max width for the carousel */}
        <div className="w-full flex p-2" style={{ transform: `translateX(-${(currentIndex) * 100}%)`, transition: 'transform 0.4s ease-in-out' }}>
          {products.map((product, index) => (
          product && !product.Error && product.sellers_results && product.sellers_results.online_sellers && (
            // <div className="w-full" key={index}>
              <Link href={product.sellers_results.online_sellers[0]?.link} key={index} target="_blank">
 <Card className="w-full max-w-xs rounded-xl  border-0  bg-[#1A1A1A] text-white my-1 p-2 flex-shrink-0  transition-transform ">
 <div className="flex aspect-video-container rounded-t-xl " >
         <img
          alt="Thumbnail"
          className="aspect-video object-cover  h-full rounded-md"
        
          src={product.media[0].link}
       
        />
      </div>
      <CardHeader className="p-4 pb-2">
         <p className="font-semibold overflow-hidden mt-3 text-base md:text-lg truncate">
         {product.title.length > 22 ? product.title.substring(0, 22) + '....' : product.title}
         </p>
         <div className="font-semibold text-base"> Price : {product.prices[0]}</div>
       </CardHeader>
       <CardContent className="p-4 text-sm">
         <p className="line-clamp-3 mt-1">
         Rating : <span className='font-bold text-xl'>{product.rating}</span> stars
         </p>
       </CardContent>

                </Card>
              </Link>
              // </div>
            )
          ))}
        </div>
      </div>
      <Button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#0C8CE9]  text-xl md:text-xl lg:text-2xl text-white p-2 rounded-md z-10" onClick={handleNext}>
        &gt;
      </Button>
    </div>
  </div>
  
  );
};

export default ProductCarousel;


/**
 * v0 by Vercel.
//  * @see https://v0.dev/t/9aNtR6zfvaD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// import Link from "next/link"
// import { CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"

// export default function Component() {
//   return (
//     <Card className="w-full max-w-xs rounded-xl border shadow-sm hover:shadow-md transition-transform scale-100 hover:scale-101">
//       <div className="flex aspect-video overflow-hidden rounded-t-xl">
//         <img
//           alt="Thumbnail"
//           className="aspect-video object-cover w-full transition-transform scale-100 hover:scale-105"
//           height={400}
//           src="/placeholder.svg"
//           width={400}
//         />
//       </div>
//       <CardHeader className="p-4 pb-2">
//         <Link className="font-semibold line-clamp-2" href="#">
//           CottonSculpt Prism Tee: The Cozy Chromatic Blend
//         </Link>
//         <div className="font-semibold">$99</div>
//       </CardHeader>
//       <CardContent className="p-4 text-sm border-t">
//         <p className="line-clamp-3">
//           Introducing the Acme Prism T-Shirt, a perfect blend of style and comfort for the modern individual. This tee
//           is crafted with a meticulous composition of 60% combed ringspun cotton and 40% polyester jersey, ensuring a
//           soft and breathable fabric that feels gentle against the skin.
//         </p>
//       </CardContent>
//       <CardFooter className="p-4">
//         <Button size="sm">View details</Button>
//         <Button className="ml-2" size="sm" variant="outline">
//           <ShoppingCartIcon className="w-4 h-4 mr-2" />
//           Add to cart
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }

// function ShoppingCartIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="8" cy="21" r="1" />
//       <circle cx="19" cy="21" r="1" />
//       <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
//     </svg>
//   )
// }
