import { headers } from "next/headers";
import connectMongo from "../../lib/conn";
import { NextResponse } from "next/server";
import Events from "../../../../model/eventsSchema";
import { revalidateTag } from "next/cache";

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

  const allEvents = await Events.find({});

  return Response.json({ allEvents });
}
