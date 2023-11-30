"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  // useEffect(() => {
  //   if (pathname == "/") router.push("/home");
  // }, [pathname]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className="relative w-full">
        <div className="relative w-full min-h-screen   z-0 ml-auto mr-24 max-[1024px]:mr-8 max-[530px]:mr-0">
          <Image
            // src="/netflix.jpg"
            src="/background/indexImage1.jpg"
            fill
            // height={40}
            // width={70}
            alt={"img"}
            // quality={100}
            priority
          />
        </div>
        <div className="shade"></div>
        <div className="textOverlay font-Oswald  max-[680px]:text-4xl">
          <div>Young Visionaries Youth Club</div>
          <div>
            <Link href={"/events"}>
              <Button className=" bg-heart-yellow font-Oswald text-xl min-w-[90px] w-full">
                Events
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* <div className="flex w-full items-center justify-center h-fit relative"> */}
      <div className=" flex w-full  justify-between mt-6 max-[912px]:flex-col max-[912px]:items-center  max-[912px]:justify-center">
        <div className="   font-Oswald text-xl text-black w-[600px]  max-[680px]:w-[400px]  max-[480px]:text-3xl ml-6 leading-relaxed z-10 mr-4  max-[480px]:w-full">
          <div className=" text-black  text-xl mb-8 ">About Club</div>
          {`The Young Visionaries Youth Club originated in Hayes, Clarendon and
          was established in February 2022. Once registered as a member, your
          purpose is to help bring unity among the youths in the community of
          Hayes, through activities such as games, group trips and community
          outreach (fundraisers, and giving back to the community) in which
          these events will be planned and discussed through group meetings.​ ​`}
        </div>
        <div className="relative w-[480px] h-[600px] z-0 ml-auto  max-[912px]:ml-0 max-[912px]:mt-4  mr-12 max-[1024px]:mr-4 max-[530px]:mr-0">
          {/* <div className="relative w-[480px] h-[600px] mt-2 max-[1050px]:w-[350px] max-[1050px]:h-[600px] max-[780px]:w-[300px] max-[780px]:h-[600px]  max-[780px]:mt-[100px]"> */}
          <Image
            src={"/background/indexImage2.webp"}
            fill
            alt="banner Image"
            priority
            className=" "
          />
        </div>
      </div>
    </main>
  );
}
