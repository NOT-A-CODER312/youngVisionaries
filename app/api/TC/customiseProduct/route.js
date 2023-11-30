import { headers } from "next/headers";

export async function POST(request) {
  const headersList = headers();
  const price = headersList.get("price");
  const email = headersList.get("email");
  console.log("price: ", price);
  // const ress = await request.json();
  // console.log(ress, " res");

  // const price = formData.get("price");

  const res = await fetch(
    `https://sandbox-api.transaction.cloud/v1/customize-product/TC-PR_1Q6a6Dm`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${process.env.TC_API_LOGIN}:${process.env.TC_API_PASSWORD}`,
      },
      body: JSON.stringify({
        prices: [{ currency: "USD", value: price }],
        userMail: email,
      }),
    }
  );
  // console.log("ran ran", res);
  const data = await res.json();
  console.log(data, "res res");

  return Response.json({ data });
}
