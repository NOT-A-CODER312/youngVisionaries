import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { useSession } from "next-auth/react";

export default function EventCard({
  name,
  des,
  type,
  date,
  _id,
  setReloadEvents,
  reloadEvents,
}) {
  const { data: session } = useSession();

  const removeEvent = async () => {
    const eventRes = await fetch("/api/events/removeEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }, null, 2),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok: ");
        }
        setReloadEvents(!reloadEvents);
        return response.json();
      })
      .then((data) => {
        console.log(data, " data");
        if (data.userNameTaken === true) {
          SetUserNameRegd(true);
        }
        if (data.emailNameTaken === true) {
          SetEmailRegd(true);
        }
      })

      .catch((error) => {
        //error
        console.error("There was a problem with the request error:", error);
      });
  };

  return (
    // <Link href={`/${name + "-" + type + "-" + date}`}>
    <div className="border-2 border-black w-[240px] h-[290px] rounded-lg overflow-hidden pb-4 ">
      <div className="h-full w-full relative">
        <div className="relative w-full h-[70%] border-b-2  border-black">
          <Image
            src={`${
              type == "christmasParty"
                ? "/events/christmas.jpeg"
                : type == "funDay"
                ? "/events/funday.png"
                : ""
            }`}
            fill
            alt="banner Image"
            priority
            className=" "
          />
        </div>
        <div className="flex flex-col items-center w-full">
          <div className=" font-Oswald text-lg font-medium">{name}</div>
          <div className=" font-Oswald text-lg font-medium">{des}</div>
          <div className=" font-Oswald text-lg font-medium ">{date}</div>
        </div>
        <div
          className={`${
            !session
              ? "hidden"
              : session.user?.username?.startsWith("admin-")
              ? " top-0 right-0 absolute  "
              : "hidden "
          }`}
          onClick={removeEvent}
        >
          {" "}
          <IoClose className="  text-red-600 text-2xl hover:border-2 rounded-full" />
        </div>
      </div>
    </div>
    // </Link>
  );
}
