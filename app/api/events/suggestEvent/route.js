import connectMongo from "../../lib/conn";
import { NextResponse } from "next/server";
import SugEvents from "../../../../model/suggestEventSchema";
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
  const { eventName, eventType, eventDate, eventDes, username, email } = res;

  console.log(
    eventName,
    eventType,
    eventDate,
    eventDes,
    email,
    username,
    " data"
  );
  let eventTaken,
    eventTaken1,
    userNameTaken,
    eventAdded = false;

  if (eventName && eventType && eventDate && eventDes && username && email) {
    const checkExistingEvent = await SugEvents.findOne({
      eventName,
      eventDate,
      eventType,
      eventDes,
    });
    if (checkExistingEvent) eventTaken = true;
  }
  if (eventName && eventType && eventDate && eventDes) {
    const checkExistingEvent = await Events.findOne({
      eventName,
      eventDate,
      eventType,
      eventDes,
    });
    if (checkExistingEvent) eventTaken1 = true;
  }

  if (eventTaken || eventTaken1)
    return NextResponse.json({
      eventTaken,
      eventTaken1,
    });

  try {
    const event = await SugEvents.create({
      eventName,
      eventType,
      eventDate,
      eventDes,
      active: true,
      username,
      email,
    });

    eventAdded = true;
    return NextResponse.json({
      message: "Event  successfully Added to Sugesstions",
      eventAdded,
    });
  } catch (error) {
    console.log("Error Adding  Event to Suggestion:", error);
    return NextResponse.json({
      success: false,
      eventAdded,
      message: "Error Adding Event to suggestion",
    });
  }
}
