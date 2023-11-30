// // components/TransactionCloud.tsx
// "use client";

// import { useEffect, useRef } from "react";
// import { signIn, useSession } from "next-auth/react";
// // import useStore from "@/app/store/useStore";
// import Link from "next/link";

// declare global {
//   interface Window {
//     tc?: any; // Adjust the type 'any' to be more specific if you know the structure of 'tc'
//   }
// }

// export default function TransactionCloud() {
//   const productModelRef = useRef<HTMLPreElement>(null);
//   const payButtonRef = useRef<HTMLButtonElement>(null);

//   const { data: session } = useSession();

//   //   const isSubscribedZus = useStore((state) => state.isSubscribed);
//   //   const manangeSubLink = useStore((state) => state.manangeSubLink);
//   //   const { isSubscribed, setIsSubscribed } = useStore();

//   useEffect(() => {
//     // console.log("ran");
//     // Assuming tc is globally available. If not, you might need to import or initialize it here.
//     if (typeof window !== "undefined" && window.tc) {
//       // console.log(window.tc, "tccc");
//       if (productModelRef.current)
//         window.tc.getProduct("TC-PR_A5Bqxr1").then(
//           (product: any) => {
//             productModelRef.current!.innerText = JSON.stringify(
//               product,
//               null,
//               4
//             );
//           },
//           (error: any) => {
//             document.getElementById("product-model")!.innerText = error;
//           }
//         );

//       if (payButtonRef.current)
//         payButtonRef.current.addEventListener("click", () => {
//           // console.log("clicked CLicked");
//           window.tc.buy("TC-PR_A5Bqxr1", {}).then(
//             () => {},
//             (error: any) => {
//               alert(error);
//             }
//           );
//         });
//     } else console.log("Tc isn't available");

//     // console.log(isSubscribedZus, " sub sub");
//   }, [productModelRef.current, payButtonRef.current]);

//   return (
//     <div>
//       {/* <pre ref={productModelRef}></pre> */}
//       {!session ? (
//         <button
//           className="mt-4 rounded-full w-[170px] bg-heart-pink h-fit px-2 py-1 text-white  font-medium  border-2 border-heart-pink hover:bg-white hover:text-heart-pink"
//           onClick={() => signIn("google")}
//         >
//           Sign In
//         </button>
//       ) : isSubscribed ? (
//         <Link href={manangeSubLink}>
//           <button
//             // ref={payButtonRef}
//             className="mt-4 rounded-full w-[170px] bg-heart-pink h-fit px-2 py-1 text-white  font-medium  border-2 border-heart-pink hover:bg-white hover:text-heart-pink"
//           >
//             Manage Subscription
//           </button>
//         </Link>
//       ) : (
//         <button
//           ref={payButtonRef}
//           className="mt-4 rounded-full w-[170px] bg-heart-pink h-fit px-2 py-1 text-white  font-medium  border-2 border-heart-pink hover:bg-white hover:text-heart-pink"
//         >
//           subscribe
//         </button>
//       )}
//     </div>
//   );
// }
