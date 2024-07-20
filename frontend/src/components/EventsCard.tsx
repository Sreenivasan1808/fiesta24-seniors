"use client";
import React from "react";

const EventsCard = (props: any) => {
  return (
    <div className="w-16 h-16 bg-gray-200">
      <h2>{props.eventName}</h2>
      <img src="" alt="Event Image" />
      {/* <p>{props.rules}</p> */}
    </div>
  );
};

export default EventsCard;
