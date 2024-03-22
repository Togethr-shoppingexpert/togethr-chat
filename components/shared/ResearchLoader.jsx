import { useEffect, useState } from 'react';

const ResearchLoader = () => {
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCompletedSteps(prevCompletedSteps => {
        const nextStep = prevCompletedSteps.length % 3; // Assuming 3 steps
        return [...prevCompletedSteps, nextStep];
      });
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (completedSteps.length === 0) {
      // If no steps are completed, start with the first step
      setCompletedSteps([0]);
    }
  }, [completedSteps]);

  return (
    <div className="flex  md:max-w-2xl md:min-w-[42rem] max-w-md  font-medium flex-col gap-y-4 gap-2 rounded-xl  shadow-lg px-3 py-2 text-xs md:text-base ">
      <div className="flex flex-row gap-3 items-center">
        <img src="/search.png" alt="togethr" width={25} height={25} className="step-icon" />
        <p className={`step-text ${completedSteps.includes(0) ? 'text-white' : 'text-[#999999]'} transition-colors duration-500`}>Searching web...</p>
      </div>

      <div className="flex flex-row gap-3 items-center">
        <img src="/book-open.png" alt="togethr" width={25} height={25} className="step-icon" />
        <p className={`step-text ${completedSteps.includes(1) ? 'text-white' : 'text-[#999999]'} transition-colors duration-500`}>Reading reviews...</p>
      </div>

      <div className="flex flex-row gap-3 items-center">
        <img src="/award.png" alt="togethr" width={25} height={25} className="step-icon" />
        <p className={`step-text ${completedSteps.includes(2) ? 'text-white' : 'text-[#999999]'} transition-colors duration-500`}>Gathering expert advice...</p>
      </div>
    </div>
  );
};

export default ResearchLoader;
