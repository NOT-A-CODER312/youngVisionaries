// "use server";
// import { headers } from "next/headers";

// export const preload = async () => {
//   console.log(process.env["HOST"], " JJJJJDDD");
//   const res = await fetch(
//     `${
//       process.env.NODE_ENV == "production"
//         ? "https://young-visionaires.vercel.app/"
//         : "http://localhost:3000/"
//     }/api/TC/getTransaction`,
//     {
//       headers: {
//         accept: "application/json",
//       },

//       //   body: {
//       //     price: donatePrice,
//       //   }, jso stringify to work maybe
//     }
//   )
//     .then((res) => {
//       // console.log(res.json(), " t Data");
//       return res.json();
//     })
//     .then((obj) => {
//       //   console.log(obj.data.link, " ddd");
//       //   router.push(obj.data.link);
//     })
//     .catch((e) => console.error(e, " error roro"));

//   return res;
// };
