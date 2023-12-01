import { headers } from "next/headers";
import connectMongo from "../../lib/conn";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import SugEvents from "../../../../model/suggestEventSchema";

export async function GET(request) {
  revalidateTag("events");
  connectMongo().catch((error) => res.json({ error: "Connection Failed" }));

  //   if (!res) {
  //     return NextResponse.json({
  //       status: 404,
  //       error: "Don't have form data...!",
  //     });
  //   }
  //   const { eventName, eventType, eventDate } = res;

  const allEvents = await SugEvents.find({});

  return Response.json({ allEvents });
}
