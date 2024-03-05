import { useState, useEffect } from 'react';

type Option = {
  id: number;
  label: string;
};

type Step = {
  question: string;
  options: Option[];
};

type QueryFormProps = {
  steps: Step[];
};

export default function QueryForm({ steps }: QueryFormProps) {
  const [step, setStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>(Array(steps.length).fill(-1)); // Initialize with -1 for each step
  const [progress, setProgress] = useState(0);

  const currentStep = steps[step];
  const totalSteps = steps.length;

  useEffect(() => {
    const newProgress = ((step + 1) / totalSteps) * 100;
    setProgress(newProgress);
  }, [step, totalSteps]);

  const handleSelectOption = (optionId: number) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[step] = optionId; // Update the selected option for the current step
    setSelectedOptions(updatedSelectedOptions);

    // Introduce a delay before moving to the next step
    setTimeout(() => {
      if (step < totalSteps - 1) {
        setStep(prevStep => prevStep + 1); // Move to the next step automatically
      }
    }, 500); // 500 milliseconds delay
  };

  const handlePreviousStep = () => {
    if (step > 0) {
      setStep(prevStep => prevStep - 1);
    }
  };

  return (
    <div className='bg-white px-5 rounded-xl shadow-md relative overflow-hidden flex flex-col z-50 '>
      <div className="absolute top-0 left-0 right-0 bg-[#FF58A8] h-[4px] md:h-[2px] rounded-full" style={{ width: `${progress}%`, transition: "width 0.5s ease-in-out" }}></div>
<div className='flex flex-row justify-between items-center text-[#94A3B8]'>

      <h2 className=' mt-3 mb-4 font-medium'>{currentStep.question}</h2>
      <p className='font-light text-sm'>{step+1}/{totalSteps}</p>
</div>
      <div className="border-b-[1.5px] border-gray-300 mb-4"></div>
      <form> 
        {currentStep.options.map(option => (
          <div key={option.id} className="mb-4">
            <input
              type="radio" // Change input type to radio
              id={`option-${option.id}`}
              checked={selectedOptions[step] === option.id} // Check if the option is selected for the current step
              onChange={() => handleSelectOption(option.id)} // Use handleSelectOption to update the selected option
              className="appearance-none rounded-full transition border-2 border-[#2D29F8] mr-2 w-4 h-4 checked:bg-[#2D29F8]"
            />
            <label htmlFor={`option-${option.id}`} className='text-[#94A3B8] font-light'>{option.label}</label>
          </div>
        ))}
      </form>
      {/* <div className="mt-4">
        {step > 0 && (
          <button onClick={handlePreviousStep} className="mr-4 px-3 py-1 bg-blue-500 text-white rounded">Previous</button>
        )}
      </div> */}
    </div>
  );
}
