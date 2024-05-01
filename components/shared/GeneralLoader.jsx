// import { useEffect, useState } from 'react';
// import Tick from "@/public/assets/tick.png";
// import Flicker from "@/public/assets/flicker.gif";
// import Image from "next/image";

// const steps = [
//   "Understanding your query",
//   "Thinking",
// ];

// const flickerDuration = 500; // Duration of flicker animation in milliseconds
// const totalDuration = 8000; // Total duration for each step in milliseconds
// const stepDuration = totalDuration / steps.length; // Duration for each step

// const GeneralLoader = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [completedSteps, setCompletedSteps] = useState([]);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       if (currentStep === steps.length - 1) {
//         clearInterval(intervalId); // Stop the interval when last step is completed
//       } else {
//         setCurrentStep(prevStep => (prevStep + 1) % steps.length);
//         console.log(currentStep);
//         setCompletedSteps([]);
//       }
//     }, totalDuration);

//     return () => clearInterval(intervalId);
//   }, []);

//   useEffect(() => {
//     if (currentStep !== 0 && !completedSteps.includes(currentStep)) {
//       const flickerTimeout = setTimeout(() => {
//         setCompletedSteps(prevCompletedSteps => [...prevCompletedSteps, currentStep - 1]);
//       }, flickerDuration);
      
//       return () => clearTimeout(flickerTimeout);
//     }
//   }, [currentStep, completedSteps]);

//   return (
//     <div className="flex md:max-w-2xl md:min-w-[42rem] max-w-md font-medium flex-col gap-y-4 gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-base mx-1 md:mx-6">
//       <div className="flex flex-row gap-3 items-center">
//         {completedSteps.includes(0) ? (
//           <Image src={Tick} alt="tick" width={20} height={20} className="step-icon" />
//         ) : (
//           <Image src={Flicker} alt="flicker" width={20} height={20} className="step-icon" />
//         )}
//         <p className={`step-text ${completedSteps.includes(0) ? 'text-white' : 'text-[#999999]'} mx-2 transition-colors duration-500`}>{steps[0]}</p>
//       </div>
//       {currentStep !== 0 && (
//         <div className="flex flex-row gap-3 items-center">
          
//           {completedSteps.includes(1) ? (
//             <Image src={Tick} alt="tick" width={20} height={20} className="step-icon" />
//           ) : (
//             <Image src={Flicker} alt="flicker" width={20} height={20} className="step-icon" />
//           )}
//           <p className={`step-text ${completedSteps.includes(1) ? 'text-white' : 'text-[#999999]'} mx-2 transition-colors duration-500`}>{steps[1]}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GeneralLoader;

import { useState, useEffect } from 'react';
import Tick from "@/public/assets/tick.png";
import Flicker from "@/public/assets/flicker.gif";
import Image from "next/image";

const steps = [
  "Understanding your query",
  "Thinking",
  "Searching the internet",
  "Summarizing Information",
];

const GeneralLoader = () => {
  const [showUnderstandingWithFlicker, setShowUnderstandingWithFlicker] = useState(true);
  const [showUnderstandingWithTick, setShowUnderstandingWithTick] = useState(false);
  const [showThinkingWithFlicker, setShowThinkingWithFlicker] = useState(false);
  const [showThinkingWithTick, setShowThinkingWithTick] = useState(false);
  const [showSearchingWithFlicker, setShowSearchingFlicker] = useState(false);
  const [showSearchingWithTick, setShowSearchingTick] = useState(false);
  const [showSummarizingWithFlicker, setShowSummarizingFlicker] = useState(false);
  const [showSummarizingWithTick, setShowSummarizingTick] = useState(false);
  const [showimageswithFlicker, setShowimageswithFlicker] = useState(false);
  const [showimageswithTick, setShowimageswithTick] = useState(false);

  useEffect(() => {
    const understandingTickTimeout = setTimeout(() => {
      setShowUnderstandingWithFlicker(false);
      setShowUnderstandingWithTick(true);
      setShowThinkingWithFlicker(true);
    }, 7000); 

    const thinkingFlickerTimeout = setTimeout(() => {
      setShowThinkingWithFlicker(false);
      setShowThinkingWithTick(true);
      setShowSearchingFlicker(true)
    }, 14000); 

    return () => {
      clearTimeout(understandingTickTimeout);
      clearTimeout(thinkingFlickerTimeout);
    };
  }, []);

  useEffect(() => {
    const searchingFlickerTimeout = setTimeout(() => {
      setShowSearchingFlicker(false);
      setShowSearchingTick(true);
      setShowSummarizingFlicker(true);
    }, 21000); 

    const summarizingFlickerTimeout = setTimeout(() => {
      setShowSummarizingFlicker(true);
      // setShowSummarizingTick(true);
    }, 40000);

    return () => {
      clearTimeout(searchingFlickerTimeout);
      clearTimeout(summarizingFlickerTimeout);
    };
  }, []);

  return (
    <div className="flex md:max-w-2xl md:min-w-[42rem] max-w-md font-medium flex-col gap-y-4 gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-base mx-1 md:mx-6">
      <div className="flex flex-row gap-3 items-center">
        {showUnderstandingWithFlicker ? (
          <Image src={Flicker} alt="flicker" width={20} height={20} className="step-icon" />
        ) : showUnderstandingWithTick ? (
          <Image src={Tick} alt="tick" width={20} height={20} className="step-icon" />
        ) : null}
        <p className={`step-text ${showUnderstandingWithTick ? 'text-white' : 'text-[#999999]'} mx-2 transition-colors duration-500`}>{steps[0]}</p>
      </div>

      {showThinkingWithFlicker && (
        <div className="flex flex-row gap-3 items-center">
          <Image src={Flicker} alt="flicker" width={20} height={20} className="step-icon" />
          <p className="step-text text-[#999999] mx-2 transition-colors duration-500">{steps[1]}</p>
        </div>
      )}

      {showThinkingWithTick && (
        <div className="flex flex-row gap-3 items-center">
          <Image src={Tick} alt="tick" width={20} height={20} className="step-icon" />
          <p className="step-text text-white mx-2 transition-colors duration-500">{steps[1]}</p>
        </div>
      )}

      {showSearchingWithFlicker && (
        <div className="flex flex-row gap-3 items-center">
          <Image src={Flicker} alt="flicker" width={20} height={20} className="step-icon" />
          <p className="step-text text-[#999999] mx-2 transition-colors duration-500">{steps[2]}</p>
        </div>
      )}

      {showSearchingWithTick && (
        <div className="flex flex-row gap-3 items-center">
          <Image src={Tick} alt="tick" width={20} height={20} className="step-icon" />
          <p className="step-text text-white mx-2 transition-colors duration-500">{steps[2]}</p>
        </div>
      )}

      {showSummarizingWithFlicker && (
        <div className="flex flex-row gap-3 items-center">
          <Image src={Flicker} alt="flicker" width={20} height={20} className="step-icon" />
          <p className="step-text text-[#999999] mx-2 transition-colors duration-500">{steps[3]}</p>
        </div>
      )}

      {showSummarizingWithTick && (
        <div className="flex flex-row gap-3 items-center">
          <Image src={Tick} alt="tick" width={20} height={20} className="step-icon" />
          <p className="step-text text-white mx-2 transition-colors duration-500">{steps[3]}</p>
        </div>
      )}
    </div>
  );
};

export default GeneralLoader;
