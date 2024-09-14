import React, { useRef, useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useContentContext } from "@/ContentContext";

interface FilterProps {
  sendMessage: (message: string) => void;
}

const Filters: React.FC<FilterProps> = ({ sendMessage }) => {
  const filtersContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const { filters, setIsChatOpen, filtersHistory } = useContentContext();

  const updateArrowButtons = () => {
    if (filtersContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = filtersContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (filtersContainerRef.current) {
      filtersContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (filtersContainerRef.current) {
      filtersContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    updateArrowButtons(); // Check initial state
    window.addEventListener('resize', updateArrowButtons); // Check on resize

    return () => {
      window.removeEventListener('resize', updateArrowButtons); // Clean up
    };
  }, [filters]);

  useEffect(() => {
    updateArrowButtons(); // Check when filters change
  }, [filters]);

  const handleFilterClick = (filter: string) => {
    console.log("Filter clicked:", filter);
    sendMessage(filter);
    setIsChatOpen(true);
  };

  console.log('filter history', filtersHistory);

  return (
    <div className="relative w-[95%] mx-auto dark py-2 px-4  rounded-md overflow-hidden">
      {/* Left Arrow Button */}
      {showLeftArrow && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition duration-300"
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          <FaChevronLeft />
        </button>
      )}

      {/* Filter Container */}
      <div
        ref={filtersContainerRef}
        className="flex space-x-2 overflow-x-auto rounded-md items-center mx-2 scrollbar-hide"
        onScroll={updateArrowButtons}
      > 
        {filtersHistory.length > 0 && filtersHistory.map((filter, index) => (
          <button
            key={index}
            className="flex-shrink-0 bg-[#2e2f2f] rounded-lg p-2 shadow-md hover:bg-[#f5f5f58a] transition duration-300"
            onClick={() => handleFilterClick(filter)}
          >
            <span className="text-white hover:text-black  text-sm">{filter}</span>
          </button>
        ))}
        {filters.length > 0 && filters.map((filter, index) => (
          <button
            key={index}
            className="flex-shrink-0 bg-[#2e2f2f] rounded-lg p-2 shadow-md hover:bg-[#f5f5f58a] transition duration-300"
            onClick={() => handleFilterClick(filter)}
          >
            <span className="text-white hover:text-black  text-sm">{filter}</span>
          </button>
        ))}
      </div>

      {/* Right Arrow Button */}
      {showRightArrow && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition duration-300"
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};

export default Filters;
