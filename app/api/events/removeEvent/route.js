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
  const { _id } = res;

  console.log(_id, " data");
  let eventTaken,
    userNameTaken,
    eventAdded = false;

  //   if (eventTaken)
  //     return NextResponse.json({
  //       eventTaken,
  //     });
  try {
    //     const event = await Events.create({
    //       eventName,
    //       eventType,
    //       eventDate,
    //       eventDes,
    //       active: true,
    //     });
    if (_id) {
      const checkExistingEvent = await Events.findByIdAndDelete({
        _id,
      });
      if (checkExistingEvent) eventTaken = true;
    }

    eventAdded = true;
    return NextResponse.json({
      message: "Event  successfully Removed",
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
