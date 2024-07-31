"use client";
import React, { useEffect, useState } from "react";
import { axiosClient } from "../services/axiosClient";
import { useRouter } from "next/navigation";

const MyEvents = () => {
  const [events, setEvents] = useState(Array.from({ length: 0 }));
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("userRoutes/myevents");
        if (response.status == 200) {
          setEvents(response.data);
        } else if (response.status == 204) {
          setEvents([]);
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ampm;
    return strTime;
}
  return (
    <div className="min-h-screen flex flex-col justify-start items-center mx-4">
        <h1 className="text-2xl font-semibold m-4">You have joined these events</h1>
        {
            events.length == 0? <h1>You have not participated in any events</h1>:
            <>
            {
                events.map((item, idx) => {
                    let start = formatTime(new Date(item.startTime));
                    let end = formatTime(new Date(item.endTime));
                    return(
                    <div className="border border-gray-700 rounded-2xl m-2 p-3 w-full hover:cursor-pointer font-normal" style={{color: "rgb(4,4,4)"}} onClick={() => router.push(`/EventDetails?eventName=${item.eventName}`)}>
                        <h1 className="text-xl">{item.eventName}</h1>
                        <h2 className="text-gray-500">{item.eventType} Event</h2>
                        <p className="mt-1 font-light">Start time: <span className="font-semibold">{start}</span> End time: <span className="font-semibold">{end}</span></p>
                        <p className="font-light">Venue: <span className="font-semibold">{item.venue}</span></p>
                    </div>)
                })
            }
            </>
        }
    </div>
  );
};

export default MyEvents;
