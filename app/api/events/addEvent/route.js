import connectMongo from "../../lib/conn";
import { NextResponse } from "next/server";
import Events from "../../../../model/eventsSchema";

export async function POST(request) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed" }));
  const res = await request
    .json()
    .catch((err) => console.log(err, "errorrrrrr"));

  if (!res) {
    return NextResponse.json({
      status: 404,
      error: "Don't have form data...!",
    });
  }
  const { eventName, eventType, eventDate, eventDes } = res;

  console.log(eventName, eventType, eventDate, eventDes, " data");
  let eventTaken,
    userNameTaken,
    eventAdded = false;

  if (eventName && eventType && eventDate && eventDes) {
    const checkExistingEvent = await Events.findOne({
      eventName,
      eventDate,
      eventType,
      eventDes,
    });
    if (checkExistingEvent) eventTaken = true;
  }

  if (eventTaken)
    return NextResponse.json({
      eventTaken,
    });
  try {
    const event = await Events.create({
      eventName,
      eventType,
      eventDate,
      eventDes,
      active: true,
    });

    eventAdded = true;
    return NextResponse.json({
      message: "Event  successfully Added",
      eventAdded,
    });
  } catch (error) {
    console.log("Error creating Event:", error);
    return NextResponse.json({
      success: false,
      eventAdded,
      message: "Error creating Event",
    });
  }
}
