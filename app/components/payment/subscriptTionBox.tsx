import { BiSolidCheckCircle } from "react-icons/bi";
// import TransactionCloud from "./TransactionCloud";
import PayPalButtons from "./paypalButtons";
import Link from "next/link";

export default function SubBox() {
  return (
    <div className="font-Space_Mono border rounded-md p-4 flex flex-col items-center bg-[#fdfdfd] mt-8  mb-28">
      <div className=" text-heart-pink text-xl mb-2">Membership</div>
      <div>$8 USD/per month</div>
      <div className=" text-xs mb-2 ">INCLUDES</div>
      <div className=" flex gap-x-2 ">
        <BiSolidCheckCircle className=" text-heart-pink text-lg mt-1" />
        <div className=" w-[300px]">Access to all my exclusive content.</div>
      </div>
      <div className=" flex gap-x-2 ">
        <BiSolidCheckCircle className=" text-heart-pink text-lg mt-1" />
        <div className=" w-[300px]"> Can dm me on all my socials</div>
      </div>
      {/* <Link href="/">
        <button className="mt-4 rounded-full w-[170px] bg-heart-pink h-fit px-2 py-1 text-white  font-medium  border-2 border-heart-pink hover:bg-white hover:text-heart-pink">
          subscribe
        </button>
      </Link> */}
      {/* <TransactionCloud /> */}
      <div className=" mt-4">
        <PayPalButtons />
      </div>
    </div>
  );
}
