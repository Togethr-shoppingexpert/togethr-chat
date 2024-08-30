import { useState, useEffect, useRef } from "react";
import Tick from "@/public/assets/tick.png";
import Flicker from "@/public/assets/flicker.gif";
import Image from "next/image";
import useSmoothScrollIntoView from "@/hooks/autoscroll";

const steps = [
  "Understanding your query",
  "Thinking",
  "Searching the internet",
  "Summarizing Information",
];

const GeneralLoader = ( {mode}) => {
  const [showUnderstandingWithFlicker, setShowUnderstandingWithFlicker] =
    useState(true);
  const [showUnderstandingWithTick, setShowUnderstandingWithTick] =
    useState(false);
  const [showThinkingWithFlicker, setShowThinkingWithFlicker] = useState(false);
  const [showThinkingWithTick, setShowThinkingWithTick] = useState(false);
  const [showSearchingWithFlicker, setShowSearchingFlicker] = useState(false);
  const [showSearchingWithTick, setShowSearchingTick] = useState(false);
  const [showSummarizingWithFlicker, setShowSummarizingFlicker] =
    useState(false);
  const [showSummarizingWithTick, setShowSummarizingTick] = useState(false);
  const [showimageswithFlicker, setShowimageswithFlicker] = useState(false);
  const [showimageswithTick, setShowimageswithTick] = useState(false);
  // const [step,setStep]=useState([]);
  // const messagesEndRef = useRef<HTMLDivElement>(null); // Change this line
  const messagesEndRef = useRef(null);
  useEffect(() => {
    const understandingTickTimeout = setTimeout(() => {
      // setStep((prevmsg)=>[...prevmsg,"first"]);
      setShowUnderstandingWithFlicker(false);
      setShowUnderstandingWithTick(true);
      setShowThinkingWithFlicker(true);
    }, 10000);

    const thinkingFlickerTimeout = setTimeout(() => {
      // setStep((prevmsg)=>[...prevmsg,"second"]);

      setShowThinkingWithFlicker(false);
      setShowThinkingWithTick(true);
      setShowSearchingFlicker(true);
    }, 20000);

    return () => {
      clearTimeout(understandingTickTimeout);
      clearTimeout(thinkingFlickerTimeout);
    };
  }, []);

  useEffect(() => {
    const searchingFlickerTimeout = setTimeout(() => {
      // setStep((prevmsg)=>[...prevmsg,"third"]);

      setShowSearchingFlicker(false);
      setShowSearchingTick(true);
      setShowSummarizingFlicker(true);
    }, 30000);

    const summarizingFlickerTimeout = setTimeout(() => {
      // setStep((prevmsg)=>[...prevmsg,"fourth"]);

      setShowSummarizingFlicker(true);
      // setShowSummarizingTick(true);
    }, 40000);

    return () => {
      clearTimeout(searchingFlickerTimeout);
      clearTimeout(summarizingFlickerTimeout);
    };
  }, []);
  useEffect(() => {
    // Your existing useEffect logic here

    // Scroll to bottom when step changes or a new step appears
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [
    showUnderstandingWithFlicker,
    showUnderstandingWithTick,
    showThinkingWithFlicker,
    showThinkingWithTick,
    showSearchingWithFlicker,
    showSearchingWithTick,
    showSummarizingWithFlicker,
    showSummarizingWithTick,
    showimageswithFlicker,
    showimageswithTick,
  ]);
  // useSmoothScrollIntoView(messagesEndRef, [step]);
  return (
    <div className=" flex md:max-w-2xl md:min-w-[42rem] max-w-md font-medium flex-col gap-y-4 gap-2 rounded-xl  px-1 py-2 text-xs my-2 md:text-base mx-1 ">
      <div className="flex flex-row gap-3 items-center">
        {showUnderstandingWithFlicker ? (
          <Image
            src={Flicker}
            alt="flicker"
            width={20}
            height={20}
            className="step-icon"
          />
        ) : showUnderstandingWithTick ? (
          <Image
            src={Tick}
            alt="tick"
            width={20}
            height={20}
            className="step-icon"
          />
        ) : null}
        <p
          className={`step-text ${
            mode==="dark" ? "text-white" : "text-black"
          } mx-2 transition-colors duration-500`}
        >
          {steps[0]}
        </p>
      </div>

      {showThinkingWithFlicker && (
        <div className="flex flex-row gap-3 items-center">
          <Image
            src={Flicker}
            alt="flicker"
            width={20}
            height={20}
            className="step-icon"
          />
          <p className={`step-text ${
            mode==="dark" ? "text-white" : "text-black"
          } mx-2 transition-colors duration-500`}>
            {steps[1]}
          </p>
        </div>
      )}

      {showThinkingWithTick && (
        <div className="flex flex-row gap-3 items-center">
          <Image
            src={Tick}
            alt="tick"
            width={20}
            height={20}
            className="step-icon"
          />
          <p className={`step-text ${
            mode==="dark" ? "text-white" : "text-black"
          } mx-2 transition-colors duration-500`}>
            {steps[1]}
          </p>
        </div>
      )}

      {showSearchingWithFlicker && (
        <div className="flex flex-row gap-3 items-center">
          <Image
            src={Flicker}
            alt="flicker"
            width={20}
            height={20}
            className="step-icon"
          />
          <p className={`step-text ${
            mode==="dark" ? "text-white" : "text-black"
          } mx-2 transition-colors duration-500`}>
            {steps[2]}
          </p>
        </div>
      )}

      {showSearchingWithTick && (
        <div className="flex flex-row gap-3 items-center">
          <Image
            src={Tick}
            alt="tick"
            width={20}
            height={20}
            className="step-icon"
          />
          <p className={`step-text ${
            mode==="dark" ? "text-white" : "text-black"
          } mx-2 transition-colors duration-500`}>
            {steps[2]}
          </p>
        </div>
      )}

      {showSummarizingWithFlicker && (
        <div className="flex flex-row gap-3 items-center">
          <Image
            src={Flicker}
            alt="flicker"
            width={20}
            height={20}
            className="step-icon"
          />
          <p className={`step-text ${
            mode==="dark" ? "text-white" : "text-black"
          } mx-2 transition-colors duration-500`}>
            {steps[3]}
          </p>
        </div>
      )}

      {showSummarizingWithTick && (
        <div className="flex flex-row gap-3 items-center">
          <Image
            src={Tick}
            alt="tick"
            width={20}
            height={20}
            className="step-icon"
          />
          <p className="step-text text-white mx-2 transition-colors duration-500">
            {steps[3]}
          </p>
        </div>
      )}

      {/* <div ref={messagesEndRef} /> */}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default GeneralLoader;
