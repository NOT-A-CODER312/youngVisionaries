"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";

export default function AddAdminEvents({ setReloadEvents, reloadEvents }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [eventName, setEventName] = useState(null);
  const [eventDes, setEventDes] = useState(null);
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState(null);

  const onChangeEventName = (e) => {
    setEventName(e.target.value);
  };
  const onChangeEventDes = (e) => {
    setEventDes(e.target.value);
  };
  const onChangeEventType = (e) => {
    setEventType(e.target.value);
  };
  const onChangeEventDate = (e) => {
    setEventDate(e.target.value);
  };

  const addEvent = async () => {
    const eventRes = await fetch("/api/events/addEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        { eventName, eventType, eventDes, eventDate },
        null,
        2
      ),
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

        if (data.registered) {
          router.push("/login");
        }
      })

      .catch((error) => {
        //error
        console.error("There was a problem with the request error:", error);
      });
  };

  return (
    <>
      <button
        onClick={onOpen}
        className=" bg-heart-yellow rounded-xl font-Oswald  p-2 min-w-[100px] min-h-[24px]"
      >
        Add Event
      </button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="2xl"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent className=" max-[480px]:m-12">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Events
              </ModalHeader>
              <ModalBody className=" text-black">
                <label className=" font-Oswald text-lg  font-medium text-white">
                  Event Name:
                </label>
                <input
                  value={eventName}
                  type="text"
                  onChange={onChangeEventName}
                  className=" border-2 border-heart-yellow rounded-lg p-1 bg-white"
                  placeholder="Event Name"
                />
                <label className=" font-Oswald text-lg  font-medium text-white">
                  Event Location:
                </label>
                <input
                  value={eventDes}
                  type="text"
                  onChange={onChangeEventDes}
                  className=" border-2 border-heart-yellow rounded-lg p-1 bg-white"
                  placeholder="Event Location"
                />
                <label className=" font-Oswald text-lg  font-medium text-white">
                  Event Type:
                </label>
                <select
                  name="cars"
                  id="cars"
                  onChange={onChangeEventType}
                  value={eventType}
                  className="border-2 border-heart-yellow p-1 rounded-lg"
                >
                  <option value="">Select Event</option>
                  <option value="christmasParty">Christmas Party</option>
                  <option value="halloweenParty">Halloween Party</option>
                  <option value="birthdayParty">Birthday Party</option>
                  <option value="funDay">Fun Day</option>
                  <option value="sportsEvent">Sports Event</option>
                  <option value="movieNight">Movie Night</option>
                  <option value="talentShow">Talent Show</option>
                  <option value="communityService">Community Service</option>
                </select>
                <label className=" font-Oswald text-lg  font-medium text-white">
                  Event Date:
                </label>
                <input
                  value={eventDate}
                  type="datetime-local"
                  onChange={onChangeEventDate}
                  className="border-2 border-heart-yellow rounded-lg p-1"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="foreground" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-heart-yellow shadow-lg shadow-indigo-500/20"
                  onPress={async () => {
                    await addEvent();
                    onClose();
                  }}
                >
                  Add Event
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
