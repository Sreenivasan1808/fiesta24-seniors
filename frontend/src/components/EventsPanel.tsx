import React from "react";
import EventsCard from "./EventsCard";
import eventsJson from "../../public/events.json";

const EventsPanel = () => {
  return (
    <div>
      <div style={{ background: "rgb(240,240,240)", paddingLeft: "3rem", paddingRight: "3rem", color: "rgb(5,5,5)"}} className="rounded-xl shadow-xl my-5 shadow-slate-300">
        <h1 className="w-full text-center" style={{ fontSize: "5rem" }}>
          Solo Events
        </h1>
        <div
          className="min-h-full min-w-full my-4 p-4 grid grid-cols-3 justify-evenly items-center gap-5"
        >
          {eventsJson.map((event) => {
            if (event.eventType == "Solo")
              return <EventsCard key={event.eventName} eventName={event.eventName} />;
          })}
        </div>
      </div>
      <div style={{ background: "rgb(240,240,240)", paddingLeft: "3rem", paddingRight: "3rem", color: "rgb(5,5,5)"}} className="rounded-xl shadow-xl my-5 shadow-slate-300">
        <h1 className="w-full text-center" style={{ fontSize: "5rem" }}>
          Group Events
        </h1>
        <div
          className="min-h-full min-w-full my-4 p-4 grid grid-cols-3 justify-center items-center gap-5"
          style={{ background: "" }}
        >
          {eventsJson.map((event) => {
            if (event.eventType == "Group")
              return <EventsCard eventName={event.eventName} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default EventsPanel;
