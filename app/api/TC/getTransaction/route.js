import { headers } from "next/headers";

export async function POST(request) {
  const headersList = headers();
  const tID = headersList.get("tID");
  console.log(tID, " tid tid tid");

  const res = await fetch(
    `https://sandbox-api.transaction.cloud/v1/generate-url-to-admin`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${process.env.TC_API_LOGIN}:${process.env.TC_API_PASSWORD}`,
      },
    }
  );
  const data = await res.json();
  console.log(data, "res res");

  return Response.json({ data });
}
