"use client";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import NavDDown from "../Dropdown/NavBarDDown";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className=" flex justify-between  items-center mb-2">
      <div className="flex items-center justify-center gap-x-[-8px]">
        <Link href={"/"} className=" flex flex-col items-start justify-center">
          <div className=" relative w-[50px] h-[50px] ml-4 mt-2">
            <Image src={"/logo/logoCircle.webp"} fill alt="logo p" />
          </div>
        </Link>
        <div className=" flex flex-row items-center justify-center">
          <Link href={"/events"} className={`${pathname === "/" ? "" : ""}`}>
            <div className="text-lg font-medium  ml-6 font-Oswald text-black">
              Events
            </div>
          </Link>
          <Link href={"/roles"} className={`${pathname === "/" ? "" : ""}`}>
            <div className=" text-lg font-medium  ml-6  font-Oswald text-black">
              Roles
            </div>
          </Link>
          <Link href={"/donate"} className={`${pathname === "/" ? "" : ""}`}>
            <div className=" text-lg font-medium  ml-6  font-Oswald text-black">
              Donate
            </div>
          </Link>
        </div>
      </div>
      <div className={session ? `hidden` : ""}>
        <div className="flex gap-x-2 mr-2">
          <div className=" flex flex-row items-center justify-center">
            <div>
              <Link href={"/login"}>
                <button
                  className="  text-lg font-medium  ml-6 font-Oswald text-black"
                  onClick={() => signIn("google")}
                >
                  Log In
                </button>
              </Link>
            </div>
            <div className=" border-l-2 border-heart-yellow h-[18px] mx-2 "></div>
            <div>
              <Link href={"/signup"}>
                <button
                  className=" text-heart-yellow text-lg font-medium  font-Oswald"
                  // onClick={() => signIn("google")}
                >
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={session ? `mr-2` : "hidden"}>
        <div className=" mr-2">
          <NavDDown />
        </div>

        {/* <button
          className=" font-Space_Mono rounded-xl  border-2 border-heart-purple h-fit  w-[100px] text-heart-purple  hover:bg-heart-purple hover:text-white text-sm px-[12px] py-2 font-semibold"
          onClick={() => signOut()}
        >
          Log Out
        </button> */}
      </div>
    </nav>
  );
}
