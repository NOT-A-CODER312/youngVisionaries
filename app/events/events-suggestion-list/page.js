"use client";

import { useState, useEffect } from "react";
import EventCard from "./eventCard";

export default function EventsSuggestion() {
  const [eventsData, setEventsData] = useState([]);
  const [reloadEvents, setReloadEvents] = useState(true);

  async function GetEventsData() {
    const res = await fetch(`/api/events/getEventsSugs`, {
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
      next: { tags: ["events"] },
    })
      .then((res) => {
        // console.log(res.json(), " t Data");
        return res.json();
      })
      .then((obj) => {
        setEventsData(obj.allEvents);
        console.log(obj.allEvents, " ddd");
        //   router.push(obj.data.link);
      })
      .catch((e) => console.error(e, " error roro"));

    return res;
  }

  useEffect(() => {
    GetEventsData();
    console.log("reloaded ");
  }, [reloadEvents]);

  return (
    <div className="flex min-h-screen flex-col items-center ">
      {" "}
      <div className=" text-4xl font-Oswald font-semibold">
        Events Suggestions
      </div>
      <div className=" flex flex-wrap w-full justify-center items-center gap-6 mt-12">
        {eventsData.map(
          ({ eventName, eventType, eventDes, eventDate, _id }) => (
            <EventCard
              type={eventType}
              date={eventDate}
              name={eventName}
              des={eventDes}
              _id={_id}
              reloadEvents={reloadEvents}
              setReloadEvents={setReloadEvents}
              key={eventName + eventDate + eventDes + eventType}
            />
          )
        )}
      </div>
    </div>
  );
}
