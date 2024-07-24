"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import eventsJson from "../../../public/events.json";
import { isArray } from "util";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

interface Event {
  eventName: string;
  eventType: string;
  rules: (string | string[])[];
  facultyInCharge: string[];
}

const EventDetails = () => {
  const searchParams = useSearchParams();
  const eventName = searchParams.get("eventName");
  const [eventDetails, setEventDetails] = useState<Event>({
    eventName: "",
    eventType: "",
    rules: [],
    facultyInCharge: [],
  });
  console.log(eventName);

  useEffect(() => {
    for (let event_ of eventsJson) {
      if (event_.eventName == eventName) {
        setEventDetails(event_);
        return;
      }
    }
  }, [eventName]);

  console.log(eventDetails);
  if (!eventDetails || !eventName) {
    return <div>404 Not Found</div>;
  }

  let renderTemplate = eventDetails.rules.map((rule: any, index: number) => {
    if (isArray(rule)) {
      return (
        <li key={index} className="ml-4">
          <ol className="list-decimal ml-6">
            {rule.map((subrule: any, subIndex: number) => (
              <li key={subIndex} className="my-2">
                {subrule}
              </li>
            ))}
          </ol>
        </li>
      );
    }
    return (
      <li key={index} className="my-2">
        {rule}
      </li>
    );
  });

  let facultyTemplate = eventDetails.facultyInCharge.map((faculty, index) => {
    return <h3 className="mx-6 text-center">{faculty}</h3>
  })

  // console.log(renderTemplate);
  const imgSrc = `/eventImages/${eventName}.jpg`;

  return (
    <>

      <div className="min-h-screen w-screen flex flex-col items-center">
        <h1 className="text-5xl text-center m-4">{eventDetails.eventName}</h1>
        <h3 className="font-bold text-center text-lg">Faculty In Charge: </h3>
        <span>{facultyTemplate}</span>
        <div className="mt-2 flex items-center justify-between gap-12 flex-wrap border border-gray-300 bg-white bg-opacity-20 p-4 rounded-xl min-w-96">
          <div className="w-72 h-80 relative mb-6">
            <Image
              src={imgSrc}
              alt={eventName}
              fill
              className="object-cover rounded-2xl"
              style={{
                color: "#0a0a0a",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </div>
          <div className="min-w-64 max-w-md">
            <ul className="list-disc text-wrap text-lg">{renderTemplate}</ul>
          </div>
        </div>
      </div>

    </>
  );
};

export default EventDetails;
