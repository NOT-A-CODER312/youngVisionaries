// "use server";
// export const preload = async () => {
//   const res = await fetch(`http://localhost:3000/api/TC/getTransaction`, {
//     method: "POST",
//     headers: {
//       accept: "application/json",
//       tID: `TC - PR_1Q6a6Dm`,
//     },

//     //   body: {
//     //     price: donatePrice,
//     //   }, jso stringify to work maybe
//   })
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
