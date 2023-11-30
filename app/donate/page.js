"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { preload } from "./preload";

export default function Donate() {
  const [donatePrice, setDonatePrice] = useState(null);

  const { data: session } = useSession();
  const router = useRouter();

  const onChnageDonatePrice = (e) => {
    setDonatePrice(e.target.value);
  };

  // const preloadData = preload();

  const setDonationPrice = async () => {
    if (donatePrice) {
      const donationLink = await fetch(`/api/TC/customiseProduct`, {
        method: "POST",
        headers: {
          accept: "application/json",
          price: donatePrice,
          email: session ? session.user.email : "",
        },

        //   body: {
        //     price: donatePrice,
        //   }, jso stringify to work maybe
      })
        .then((res) => {
          // console.log(res.json(), " t Data");
          return res.json();
        })
        .then((obj) => {
          console.log(obj.data.link, " ddd");
          router.push(obj.data.link);
        })
        .catch((e) => console.error(e));
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center mt-6">
      <div className=" font-Oswald text-4xl">Donations</div>
      <div className=" flex flex-col justify-center mt-8">
        <div className="flex items-center">
          <div className=" mr-4 text-xl font-Oswald font-semibold">$</div>
          <input
            className="border-2 border-heart-yellow rounded-lg p-1"
            value={donatePrice}
            onChange={onChnageDonatePrice}
            type="number"
          />
        </div>
        <button
          className=" bg-heart-yellow rounded-lg font-Oswald text-lg font-semibold mt-6"
          onClick={setDonationPrice}
        >
          Donate
        </button>
      </div>
    </div>
  );
}
