import React, { useRef, useEffect } from 'react';
import { useContentContext } from "@/ContentContext";

const Filters = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { filters, isOpen } = useContentContext();

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen]);

  const handleFilterClick = (filter: string) => {
    console.log("Filter clicked:", filter);
    // Add your filter handling logic here
  };

  return (
    <div className="filter-container w-[90%] overflow-x-auto py-2 px-4 bg-[#f5f5f5] mx-auto">
      <div className="inline-flex items-center space-x-4">
        {filters.length > 0 && filters.map((filter, index) => (
          <button
            key={index}
            className="flex-shrink-0 bg-white rounded-lg py-1 px-2 shadow-md hover:bg-gray-200 transition duration-300"
            onClick={() => handleFilterClick(filter)}
          >
            <span className="text-black text-sm">{filter}</span>
          </button>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Thin horizontal scrollbar */}
      <style jsx>{`
        .filter-container::-webkit-scrollbar {
          height: 2px;
        }
        .filter-container::-webkit-scrollbar-thumb {
          background-color: #888; /* Customize scrollbar thumb color */
          border-radius: 9999px;
        }
        .filter-container::-webkit-scrollbar-track {
          background-color: #f5f5f5; /* Customize scrollbar track color */
        }
      `}</style>
    </div>
  );
};

export default Filters;
