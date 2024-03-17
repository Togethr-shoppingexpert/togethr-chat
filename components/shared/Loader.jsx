import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton"


export default function Loader() {
  return (
    <div className="flex items-center space-x-4">
   <Avatar className="shadow-md z-10">
               <AvatarImage src="/ai2.png" />
               <AvatarFallback>CN</AvatarFallback>
             </Avatar>
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>

 
  )
}
