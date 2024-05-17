
import { useState, useEffect } from 'react';
import Tick from "@/public/assets/tick.png";
import Flicker from "@/public/assets/flicker.gif";
import Image from "next/image";

const steps = [
  "Searching the internet",
  "Summarizing Information",
];

const ResearchLoader = () => {
  const [showSearchingFlicker, setShowSearchingFlicker] = useState(true);
  const [showSearchingTick, setShowSearchingTick] = useState(false);
  const [showSummarizingFlicker, setShowSummarizingFlicker] = useState(false);
  const [showSummarizingTick, setShowSummarizingTick] = useState(false);

  useEffect(() => {
    const searchingFlickerTimeout = setTimeout(() => {
      setShowSummarizingFlicker(true);
      setShowSummarizingTick(false);
      setShowSearchingFlicker(false);
      setShowSearchingTick(true);
    }, 7000); 

    const summarizingFlickerTimeout = setTimeout(() => {
      setShowSummarizingFlicker(true);
      setShowSummarizingTick(false);
      setShowSearchingFlicker(false);
      setShowSearchingTick(true);
    }, 14000); 

    return () => {
      clearTimeout(searchingFlickerTimeout);
      clearTimeout(summarizingFlickerTimeout);
    };
  }, []);

  return (
    <div className="flex md:max-w-2xl md:min-w-[42rem] max-w-md font-medium flex-col gap-y-4 gap-2 rounded-xl shadow-lg px-3 py-2 text-xs md:text-base mx-1 md:mx-6">
      <div className="flex flex-row gap-3 items-center">
        {showSearchingFlicker ? (
          <Image src={Flicker} alt="flicker" width={20} height={20} className="step-icon" />
        ) : showSearchingTick ? (
          <Image src={Tick} alt="tick" width={20} height={20} className="step-icon" />
        ) : null}
        <p className={`step-text ${showSearchingTick ? 'text-white' : 'text-[#999999]'} mx-2 transition-colors duration-500`}>{steps[0]}</p>
      </div>

      {showSummarizingFlicker && (
        <div className="flex flex-row gap-3 items-center">
          <Image src={Flicker} alt="flicker" width={20} height={20} className="step-icon" />
          <p className="step-text text-[#999999] mx-2 transition-colors duration-500">{steps[1]}</p>
        </div>
      )}

      {showSummarizingTick && (
        <div className="flex flex-row gap-3 items-center">
          <Image src={Tick} alt="tick" width={20} height={20} className="step-icon" />
          <p className="step-text text-white mx-2 transition-colors duration-500">{steps[1]}</p>
        </div>
      )}
    </div>
  );
};

export default ResearchLoader;
