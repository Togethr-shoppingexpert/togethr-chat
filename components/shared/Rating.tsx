import { FaStar } from 'react-icons/fa';

interface RatingProps {
  productRating: number;
}

const Rating: React.FC<RatingProps> = ({ productRating }) => {

  const getStarFill = (index: number): string => {
    if (productRating >= index + 1) {
      return 'text-yellow-400'; // Full star (golden)
    } else if (productRating > index) {
      return ''; // Partial star (handled by inline CSS)
    }
    return 'text-gray-300'; // Empty star (white)
  };

  const getStarWidth = (index: number): string => {
    if (productRating >= index + 1) {
      return '100%'; // Full star
    } else if (productRating > index) {
      const decimalPart = productRating - index; // Get the decimal part for the current star
      return `${decimalPart * 100}%`; // Partial fill based on the decimal part
    }
    return '0%'; // No fill
  };

  return (
    <div className="flex py-2">
      {[...Array(5)].map((_, index: number) => (
        <div key={index} className="relative">
          <FaStar className={`w-5 h-5 ${getStarFill(index)}`} />
          <div
            className="absolute top-0 left-0 h-full overflow-hidden"
            style={{
              width: getStarWidth(index),
            }}
          >
            <FaStar className="w-5 h-5 text-yellow-400" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rating;
