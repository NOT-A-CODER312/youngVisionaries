"use client";

import AddAdminEvents from "@/app/components/modals/events/adminAddEvents";
import { useSession } from "next-auth/react";
// import { preload } from "./getEvents";
import { useEffect, useState } from "react";
import EventCard from "./eventCard";

export default function Events() {
  const { data: session } = useSession();

  const [eventsData, setEventsData] = useState([]);
  const [reloadEvents, setReloadEvents] = useState(true);

  // preload();

  async function GetEventsData() {
    const res = await fetch(`/api/events/getEvents`, {
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
  }, [reloadEvents]);

  return (
    <div className="flex min-h-screen flex-col items-center ">
      {" "}
      <div className=" text-4xl font-Oswald font-semibold">Events</div>
      <div
        className={`${
          !session
            ? "hidden"
            : session.user?.username?.startsWith("admin-")
            ? " ml-auto mt-4 mr-4"
            : "hidden"
        }`}
      >
        <AddAdminEvents />
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
