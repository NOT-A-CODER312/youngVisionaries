import { headers } from "next/headers";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const basicAuthToken = Buffer.from(
    `${process.env.TC_API_LOGIN}:${process.env.TC_API_PASSWORD}`
  ).toString("base64");

  const res = await fetch(
    `https://sandbox-api.transaction.cloud/v1/generate-url-to-manage-transactions/${encodeURIComponent(
      id
    )} `,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${process.env.TC_API_LOGIN}:${process.env.TC_API_PASSWORD}`,
      },
    }
  );
  const data = await res.json();
  // console.log(data, "res res");

  return Response.json({ data });
}
