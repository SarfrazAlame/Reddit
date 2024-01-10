import Link from "next/link";
import React from "react";
import { FaReddit } from "react-icons/fa6";
import { buttonVariants } from "./ui/Button";

const NavBar = () => {
  return (
    <div className="fixed w-full top-0 insert-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link href="/" className="flex gap-3 items-center">
            <FaReddit className="w-10 h-10 text-orange-400 sm:h-8 sm:w-8"/>
          <p className="hidden text-xl font-bold md:block text-orange-500">
            reddit
          </p>
        </Link>
        {/* search bar */}

        <Link href="/sign-in" className={buttonVariants()}>Sign In</Link>
      </div>
    </div>  
  );
};

export default NavBar;
