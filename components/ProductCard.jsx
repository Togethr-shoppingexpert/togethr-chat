// import { Link } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProductCard() {
  return (
    <Link href="https://www.decathlon.in/cycles/road-bikes-18192?id=18192&type=c" target="_blank" rel="noopener noreferrer" className="md:max-w-2xl max-w-md md:flex md:flex-row items-center justify-between flex flex-col rounded-xl md:my-1 text-[#A7A7A7] hover:text-white  hover:bg-[#2F3031] transition hover:cursor-pointer ">
    <div className="flex flex-row items-center md:w-auto">
      <Image alt="product" src={"/pdt.jpeg"} height="200" width="200" className="rounded-xl md:ml-3 md:mr-4 mb-3 md:mb-0" />
      <div className="flex flex-col gap-2 md:p-2">
        <p className="text-sm font-semibold">Triban RC 520</p>
        <p className="text-xs md:text-sm">Stands out with its T800 carbon fiber construction, offering lightweight strength (only 18.6 lbs) and full internal cable design for reduced wind resistance. Enthusiasts on cycling forums praise its value, comparing the performance to bikes thrice its price. Note, some assembly.</p>
        <div className="flex flex-row gap-3 items-center">
          <p className="text-xs text-white md:text-sm">Rating : 4.5</p>
          <p className="text-xs md:text-sm">100+</p>
          <p className="text-white font-semibold">$1250.99</p>
        </div>
      </div>
    </div>
  </Link>
  )
}


// <div className="md:max-w-2xl md:min-w-[42rem] max-w-md items-center  md:p-1 flex flex-row gap-x-5  rounded-xl text-[#A7A7A7] hover:text-white hover:bg-[#2F3031] transition hover:cursor-pointer">
 
{/* <Image alt="product" src={"/pdt.jpeg"} width={200} height={200} className="rounded-xl my-1 mx-1"/>
   

<div className="flex flex-col gap-3 w-2/3">
  <p className='text-base font-semibold'>Triban RC 520</p>
  <p className='text-xs md:text-sm text-wrap'>Stands out with its T800 carbon fiber construction, offering lightweight strength (only 18.6 lbs) and full internal cable design for reduced wind resistance. Enthusiasts on cycling forums praise its value, comparing the performance to bikes thrice its price. Note, some assembly.</p>
</div>
</div> */}



// perfect one for PC 
{/* <Link href="https://www.decathlon.in/cycles/road-bikes-18192?id=18192&type=c" target="_blank" rel="noopener noreferrer" className="md:max-w-2xl max-w-md md:flex md:flex-row items-center justify-between flex flex-col rounded-xl md:my-1 text-[#A7A7A7] hover:text-white bg-[#2F3031] transition hover:cursor-pointer ">
  <div className="flex flex-row items-center md:w-auto">
    <Image alt="product" src={"/pdt.jpeg"} height="200" width="200" className="rounded-xl md:ml-3 md:mr-4 mb-3 md:mb-0" />
    <div className="flex flex-col gap-2 md:p-2">
      <p className="text-sm font-semibold">Triban RC 520</p>
      <p className="text-xs md:text-sm">Stands out with its T800 carbon fiber construction, offering lightweight strength (only 18.6 lbs) and full internal cable design for reduced wind resistance. Enthusiasts on cycling forums praise its value, comparing the performance to bikes thrice its price. Note, some assembly.</p>
      <div className="flex flex-row gap-3 items-center">
        <p className="text-xs text-white md:text-sm">Rating : 4.5</p>
        <p className="text-xs md:text-sm">100+</p>
        <p className="text-white font-semibold">$1250.99</p>
      </div>
    </div>
  </div>
</Link> */}