import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default function Loader() {
  return (
    <div className="flex flex-row gap-4 mx-1 md:mx-6 my-5">
    <Avatar className="shadow-md z-10">
      <AvatarImage src="/ai.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <div className="flex w-max max-w-[75%] font-medium flex-col gap-2 text-[#94A3B8] rounded-xl shadow-lg px-3 py-2 text-xs md:text-sm bg-[#FFFFFF]">AI doing magic....</div>
  </div>
  )
}
