// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"
// import { FaRegLightbulb } from "react-icons/fa";


// export function Followup() {
//   return (
  


//     <Sheet>
//       <SheetTrigger>
//         <Button className="h-[58px]  w-[58px] md:w-[65px] rounded-xl"><FaRegLightbulb className="font-bold text-2xl"/></Button>
//       </SheetTrigger>
//       <SheetContent side="bottom" className="bg-[#1A1A1A] text-white ">
//         <SheetHeader>
//           <SheetTitle className="text-white">Related</SheetTitle>
//         </SheetHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//               Name
//             </Label>
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="username" className="text-right">
//               Username
//             </Label>
//           </div>
//         </div>
//       </SheetContent>
//     </Sheet>

        
//   )
// }

//attempt 2
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { FaRegLightbulb } from "react-icons/fa";
// import { useState, useRef, useEffect } from 'react';




// export function Followup() {
//   const [popoverWidth, setPopoverWidth] = useState<number | null>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (inputRef.current) {
//       const inputWidth = inputRef.current.offsetWidth;
//       setPopoverWidth(inputWidth);
//     }
//   }, []);

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button><FaRegLightbulb className="font-bold text-2xl"/></Button>
//       </PopoverTrigger>

// {/* <div className="flex w-full max-w-2xl"> */}

//       <PopoverContent className=" bg-[#1A1A1A] border-0" style={{ width: '400px' , justifyItems:'center' }}>
//         <div className="flex w-full ">

//           <div className="space-y-2">
//             <h4 className="font-medium leading-none text-white my-4">Related</h4>
//           </div>

//           <div className="grid gap-2 text-white my-4">
//             <div className="grid grid-cols-3 items-center gap-4">
//               <Label htmlFor="width">Question 1</Label>
              
//             </div>
//             <div className="grid grid-cols-3 items-center gap-4">
//               <Label htmlFor="maxWidth">Question 2</Label>
              
//             </div>
//             <div className="grid grid-cols-3 items-center gap-4">
//               <Label htmlFor="height">Question 3</Label>
             
//             </div>
//             <div className="grid grid-cols-3 items-center gap-4">
//               <Label htmlFor="maxHeight">Question 4</Label>
             
//             </div>
//           </div>
//         </div>
//       </PopoverContent>
// {/* </div> */}
//     </Popover>
//   )
// }


import React, { useState } from 'react';
import { FaRegLightbulb } from "react-icons/fa";
import { Button } from './ui/button';

interface FollowupProps {
  containerWidth: number;
}

const Followup: React.FC<FollowupProps> = ({ containerWidth }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFollowup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <Button onClick={toggleFollowup}>
        <FaRegLightbulb/>
      </Button>
      {isOpen && (
        <div className="fixed bg-black text-white p-4 rounded-lg shadow-lg z-10 w-full max-w-md md:max-w-2xl mx-auto bottom-24 left-0 right-0 transition" >
          <h3 className="text-center">Followup</h3>
          <ul>
            <li>What are the pros and cons of buying a used road bike for beginners?</li>
            <li>What are the best road bikes brand for beginners?</li>
            <li>What are the most important features to look for in a beginner road bike?</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Followup;
// style={{ top: '-200%', left: '50%', transform: 'translateX(-50%)' }}
