// ShimmerUI.js
import React from 'react';
import './ShimmerUI.css';

const ShimmerUI = () => {
  return (
    <div className="flex justify-evenly mt-2 w-full overflow-x-auto whitespace-nowrap shimmer-container">
      {[1, 2, 3].map((_, index) => (
        <div
          key={index}
          className="shimmer-placeholder"
        ></div>
      ))}
    </div>
  );
};

export default ShimmerUI;
