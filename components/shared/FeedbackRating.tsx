import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface RatingProps {
  productRating: number;
  onRatingChange: (rating: string) => void; // Callback to handle rating changes
}

const Rating: React.FC<RatingProps> = ({ productRating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(productRating);

  const handleClick = (index: number) => {
    setSelectedRating(index + 1);
    onRatingChange((index + 1).toString()); // Set the rating as a string
  };

  const handleMouseEnter = (index: number) => {
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const getStarFill = (index: number): string => {
    if (hoverRating && hoverRating >= index + 1) {
      return 'text-yellow-400'; // Golden yellow on hover
    }
    if (selectedRating >= index + 1) {
      return 'text-yellow-400'; // Golden yellow if selected
    }
    return 'text-gray-300'; // White for unselected stars
  };

  return (
    <div className="flex p-1">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="relative cursor-pointer"
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <FaStar className={`w-7 h-7 ${getStarFill(index)}`} />
        </div>
      ))}
    </div>
  );
};

export default Rating;
