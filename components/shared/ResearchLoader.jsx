// import { useEffect, useState } from 'react';
// import Tick from "@/public/assets/tick.png";
// import Flicker from "@/public/assets/flicker.gif";
// import Image from "next/image"

// const ResearchLoader = () => {
//   const [completedSteps, setCompletedSteps] = useState([]);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCompletedSteps(prevCompletedSteps => {
//         const nextStep = prevCompletedSteps.length % 3; // Assuming 3 steps
//         return [...prevCompletedSteps, nextStep];
//       });
//     }, 5000);
//     return () => clearInterval(intervalId);
//   }, []);

//   useEffect(() => {
//     if (completedSteps.length === 0) {
//       // If no steps are completed, start with the first step
//       setCompletedSteps([0]);
//     }
//   }, [completedSteps]);

//   return (
//     <div className="flex  md:max-w-2xl md:min-w-[42rem] max-w-md  font-medium flex-col gap-y-4 gap-2 rounded-xl  shadow-lg px-3 py-2 text-xs md:text-base ">
//       <div className="flex flex-row gap-3 items-center">
//         <Image src={Tick} alt="togethr" width={20} height={20} className="step-icon" />
//         <p className={`step-text ${completedSteps.includes(0) ? 'text-white' : 'text-[#999999]'} mx-2 transition-colors duration-500`}>Understanding your query</p>
//       </div>

//       <div className="flex flex-row gap-3 items-center">
//         <Image src={Tick}  alt="togethr" width={20} height={20} className="step-icon" />
//         <p className={`step-text ${completedSteps.includes(1) ? 'text-white' : 'text-[#999999]'} mx-2 transition-colors duration-500`}>Thinking</p>
//       </div>

//       <div className="flex flex-row gap-3 items-center">
//         <Image src={Tick} alt="togethr" width={20} height={20} className="step-icon" />
//         <p className={`step-text ${completedSteps.includes(2) ? 'text-white' : 'text-[#999999]'} mx-2 transition-colors duration-500`}>Searching the internet</p>
//       </div>

//       <div className="flex flex-row gap-3 items-center">
//         <Image src={Tick} alt="togethr" width={20} height={20} className="step-icon" />
//         <p className={`step-text ${completedSteps.includes(2) ? 'text-white' : 'text-[#999999]'} mx-2 transition-colors duration-500`}>Summarizing the information</p>
//       </div>
//     </div>
//   );
// };

// export default ResearchLoader;
// import { useEffect, useState } from 'react';
// import Tick from "@/public/assets/tick.png";
// import Flicker from "@/public/assets/flicker.gif";
// import Image from "next/image";

// const steps = [
//   "Searching the internet",
//   "Summarizing the information"
// ];

// const ResearchLoader = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [completedSteps, setCompletedSteps] = useState([]);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentStep(prevStep => (prevStep + 1) % steps.length);
//     }, 10000); 

//     return () => clearInterval(intervalId);
//   }, []);

//   useEffect(() => {
//     if (currentStep !== 0) {
//       setTimeout(() => {
//         setCompletedSteps(prevCompletedSteps => [...prevCompletedSteps, currentStep - 1]);
//       }, 500); // Assuming flicker duration is 500 milliseconds
//     }
//   }, [currentStep]);

//   return (
//     <div className="flex md:max-w-2xl md:min-w-[42rem] max-w-md font-medium flex-col gap-y-4 gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-base mx-1 md:mx-6 ">
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

// export default ResearchLoader;


//attempt 3
import { useEffect, useState } from 'react';
import Tick from "@/public/assets/tick.png";
import Flicker from "@/public/assets/flicker.gif";
import Image from "next/image";

const steps = [
  "Searching the internet",
  "summarizing Information",
];

const flickerDuration = 500; // Duration of flicker animation in milliseconds
const totalDuration = 10000; // Total duration for each step in milliseconds
const stepDuration = totalDuration / steps.length; // Duration for each step

const GeneralLoader = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [allStepsCompleted, setAllStepsCompleted] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentStep === steps.length - 1) {
        setAllStepsCompleted(true);
        clearInterval(intervalId); // Stop the interval when last step is completed
      } else {
        setCurrentStep(prevStep => (prevStep + 1) % steps.length);
        setCompletedSteps([]);
      }
    }, totalDuration);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (currentStep !== 0 && !allStepsCompleted) {
      const flickerTimeout = setTimeout(() => {
        setCompletedSteps(prevCompletedSteps => [...prevCompletedSteps, currentStep-1]);
      }, flickerDuration);
      
      return () => clearTimeout(flickerTimeout);
    }
  }, [currentStep, allStepsCompleted]);

  return (
    <div className="flex md:max-w-2xl md:min-w-[42rem] max-w-md font-medium flex-col gap-y-4 gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-base mx-1 md:mx-6">
      <div className="flex flex-row gap-3 items-center">
        {completedSteps.includes(0) || allStepsCompleted ? (
          <Image src={Tick} alt="tick" width={20} height={20} className="step-icon" />
        ) : (
          <Image src={Flicker} alt="flicker" width={20} height={20} className="step-icon" />
        )}
        <p className={`step-text ${completedSteps.includes(0) || allStepsCompleted ? 'text-white' : 'text-[#999999]'} mx-2 transition-colors duration-500`}>{steps[0]}</p>
      </div>
      {!allStepsCompleted && currentStep !== 0 && (
        <div className="flex flex-row gap-3 items-center">
          {currentStep === 1 && (
            <Image src={Flicker} alt="flicker" width={20} height={20} className="step-icon" />
          )}
          {completedSteps.includes(1) && (
            <Image src={Tick} alt="tick" width={20} height={20} className="step-icon" />
          )}
          <p className={`step-text ${completedSteps.includes(1) ? 'text-white' : 'text-[#999999]'} mx-2 transition-colors duration-500`}>{steps[1]}</p>
        </div>
      )}
    </div>
  );
};

export default GeneralLoader;




