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
//       setCurrentStep(prevStep => (prevStep + 1) % steps.length);
//       setCompletedSteps([]);
//     }, totalDuration);

//     return () => clearInterval(intervalId);
//   }, []);

//   useEffect(() => {
//     if (currentStep !== 0) {
//       const flickerTimeout = setTimeout(() => {
//         setCompletedSteps(prevCompletedSteps => [...prevCompletedSteps, currentStep-1]);
//       }, flickerDuration);
      
//       return () => clearTimeout(flickerTimeout);
//     }
//   }, [currentStep]);

//   return (
//     <div className="flex md:max-w-2xl md:min-w-[42rem] max-w-md font-medium flex-col gap-y-4 gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-base mx-1 md:mx-6">
//       {steps.map((step, index) => (
//         <div key={index} className="flex flex-row gap-3 items-center">
//           {(index === currentStep || (index === 0 && currentStep === steps.length)) && (
//             <Image src={Flicker} alt="flicker" width={20} height={20} className="step-icon" />
//           )}
//           {(completedSteps.includes(index)) && (
//             <Image src={Tick} alt="tick" width={20} height={20} className="step-icon" />
//           )}
//           <p className={`step-text ${completedSteps.includes(index) || index === steps.length ? 'text-white' : 'text-[#999999]'} mx-2 transition-colors duration-500`}>{step}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default GeneralLoader;


import { useEffect, useState } from 'react';
import Tick from "@/public/assets/tick.png";
import Flicker from "@/public/assets/flicker.gif";
import Image from "next/image";

const steps = [
  "Understanding your query",
  "Thinking",
];

const flickerDuration = 500; // Duration of flicker animation in milliseconds
const totalDuration = 7500; // Total duration for each step in milliseconds
const stepDuration = totalDuration / steps.length; // Duration for each step

const GeneralLoader = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentStep(prevStep => (prevStep + 1) % steps.length);
      setCompletedSteps([]);
    }, totalDuration);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (currentStep !== 0) {
      const flickerTimeout = setTimeout(() => {
        setCompletedSteps(prevCompletedSteps => [...prevCompletedSteps, currentStep - 1]);
        if (currentStep === steps.length - 1) {
          setTimeout(() => setCurrentStep(0), flickerDuration);
        }
      }, flickerDuration);
      
      return () => clearTimeout(flickerTimeout);
    }
  }, [currentStep]);

  return (
    <div className="flex md:max-w-2xl md:min-w-[42rem] max-w-md font-medium flex-col gap-y-4 gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-base mx-1 md:mx-6 ">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-row gap-3 items-center">
          {(index === currentStep || (index === 0 && currentStep === steps.length)) && (
            <Image src={Flicker} alt="flicker" width={20} height={20} className="step-icon" />
          )}
          {(completedSteps.includes(index) && currentStep !== 0) && (
            <Image src={Tick} alt="tick" width={20} height={20} className="step-icon" />
          )}
          <p className={`step-text ${completedSteps.includes(index) || index === steps.length ? 'text-white' : 'text-[#999999]'} mx-2 transition-colors duration-500`}>{step}</p>
        </div>
      ))}
    </div>
  );
};

export default GeneralLoader;
