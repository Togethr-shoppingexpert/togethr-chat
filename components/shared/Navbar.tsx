'use client';
import Link from "next/link";
import Image from "next/image";
import logo1 from "@/public/logo1.png"






const Navbar = () => {

    
   

   

    

  

  

  return (
    <nav className=" bg-white sticky top-0 z-1000">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Website Logo */}
          <Link href="/" className="flex items-center py-4 px-2">
            <Image src={logo1} alt="togethr" width={50} height={50}/>
            <span className="font-bold text-[#2D29F8] rounded-md p-2 text-lg md:text-xl lg:text-2xl">Togethr</span>
          </Link>

        

{/* Searchbar */}


 {/* Buttons */}



        </div>

       {/* Searchbar - visible on small screens */}
<div className="mt-2 flex justify-center md:hidden relative">
{/* <Search color="#2563eb" className="mx-4"/> */}
 

 
 

</div>

      </div>
    </nav>
  );
};

export default Navbar;