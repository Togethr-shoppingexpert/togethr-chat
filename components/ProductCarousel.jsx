// 'use client'
// import { useState , useRef } from 'react';
// import { Button } from './ui/button';
// import Link from 'next/link';
// import Image from 'next/image';
// import { CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"




// const ProductCarousel = ({ products }) => {

//   const hasErrors = products.some(product => product && product.Error);

//   if (hasErrors) {
//     return (
//       <div className="flex justify-center items-center">
//         <p className="text-red-500 font-semibold">Not found</p>
//       </div>
//     );
//   }

  

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const containerRef = useRef(null);
//   const [startX, setStartX] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);

//   const handlePrev = () => {
//     setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
//   };

//   const handleNext = () => {
//     setCurrentIndex(prevIndex => Math.min(prevIndex + 1, products.length - 1));
//   };

//   const handleMouseDown = (event) => {
//     setIsDragging(true);
//     setStartX(event.pageX - containerRef.current.offsetLeft);
//   };

//   const handleMouseMove = (event) => {
//     if (!isDragging) return;
//     const x = event.pageX - containerRef.current.offsetLeft;
//     const walk = x - startX;
//     containerRef.current.scrollLeft = containerRef.current.scrollLeft - walk;
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };


//   return (
//     <div className="relative">

//     <div className="flex justify-center items-center"  onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} >
//       <Button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#0C8CE9] text-xl md:text-xl lg:text-2xl  text-white p-2 rounded-md focus:outline-none z-10"  onClick={() => containerRef.current.scrollBy({ left: -200, behavior: 'smooth' })}>
//         &lt;
//       </Button>
//       <div className="max-w-md overflow-hidden mx-2 z-20 overflow-x-auto overflow-y-hidden s "  style={{ whiteSpace: 'nowrap', WebkitOverflowScrolling: 'touch', cursor: isDragging ? 'grabbing' : 'grab' }} ref={containerRef} > {/* Max width for the carousel */}
//         <div className="w-full flex p-2" style={{ transform: `translateX(-${(currentIndex) * 100}%)`, transition: 'transform 0.4s ease-in-out' }}>
//           {products.map((product, index) => (
//           product && !product.Error && product.sellers_results && product.sellers_results.online_sellers && (
//             // <div className="w-full" key={index}>
//               <Link href={product.sellers_results.online_sellers[0]?.link} key={index} target="_blank">
//  <Card className="w-full max-w-xs rounded-xl  border-0  bg-[#1A1A1A] text-white my-1 p-2 flex-shrink-0  transition-transform ">
//  <div className="flex aspect-video-container rounded-t-xl " >
//          <img
//           alt="Thumbnail"
//           className="aspect-video object-cover  h-full rounded-md"
        
//           src={product.media[0].link}
       
//         />
//       </div>
//       <CardHeader className="p-4 pb-2">
//          <p className="font-semibold overflow-hidden mt-3 text-base md:text-lg truncate">
//          {product.title.length > 22 ? product.title.substring(0, 22) + '....' : product.title}
//          </p>
//          <div className="font-semibold text-base"> Price : {product.prices[0]}</div>
//        </CardHeader>
//        <CardContent className="p-4 text-sm">
//          <p className="line-clamp-3 mt-1">
//          Rating : <span className='font-bold text-xl'>{product.rating}</span> stars
//          </p>
//        </CardContent>

//                 </Card>
//               </Link>
//               // </div>
//             )
//           ))}
//         </div>
//       </div>
//       <Button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#0C8CE9]  text-xl md:text-xl lg:text-2xl text-white p-2 rounded-md z-10"onClick={() => containerRef.current.scrollBy({ left: 200, behavior: 'smooth' })}>
//         &gt;
//       </Button>
//     </div>
//     </div>
  
//   );
// };

// export default ProductCarousel;

'use client'
import { useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { CardHeader, CardContent, Card } from "@/components/ui/card";


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
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, products.length - 1));
  };

  const handleMouseDown = event => {
    setStartX(event.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.cursor = 'grabbing';
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = event => {
    const x = event.pageX - containerRef.current.offsetLeft;
    const walk = x - startX;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    containerRef.current.style.cursor = 'grab';
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = event => {
    setStartX(event.touches[0].pageX);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = event => {
    const x = event.touches[0].pageX;
    const walk = x - startX;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative">
      <div className="flex justify-center items-center">
      <Button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#0C8CE9] text-xl md:text-xl lg:text-2xl text-white p-2 rounded-md focus:outline-none z-10"
          onClick={handlePrev}
          disabled={currentIndex === 0}

        >
          &lt;
        </Button>
     
        <div
          className="max-w-md overflow-hidden mx-2 z-20 overflow-x-auto overflow-y-hidden scrollbar-hide"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {/* Max width for the carousel */}
          <div className="flex p-2" style={{ transform: `translateX(-${((currentIndex) * 65)/products.length}%)`, transition: 'transform 0.4s ease-in-out' }}>
            {products.map((product, index) => (
              product && !product.Error && product.sellers_results && product.sellers_results.online_sellers && (
                <Link href={product.sellers_results.online_sellers[0]?.link} key={index} target="_blank">
                  <Card className="w-full max-w-xs rounded-xl border-0 bg-[#1A1A1A] text-white my-1 p-2 flex-shrink-0 transition-transform">
                    <div className="flex aspect-video-container rounded-t-xl">
                      <img
                        alt="Thumbnail"
                        className="aspect-video object-cover h-full rounded-md"
                        src={product.media[0].link}
                      />
                    </div>
                    <CardHeader className="p-4 pb-1">
                      <p className="font-semibold overflow-hidden mt-3 text-base md:text-lg truncate">
                        {product.title.length > 22 ? product.title.substring(0, 22) + '....' : product.title}
                      </p>
                      <div className="font-semibold text-base"> Price : {product.prices[0]}</div>
                    </CardHeader>
                    <CardContent className="p-4 text-sm">
                      <p className="line-clamp-3">
                        Rating : <span className='font-bold text-xl'>{product.rating}</span> stars
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              )
            ))}
          </div>
        </div>
        <Button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#0C8CE9] text-xl md:text-xl lg:text-2xl text-white p-2 rounded-md z-10"
          onClick={handleNext}
          disabled={currentIndex === products.length - 1}

        >
          &gt;
        </Button>
      </div>
    </div>
  );
};

export default ProductCarousel;
