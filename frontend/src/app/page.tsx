"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventsPanel from "@/components/EventsPanel";


export default function Home() {
  return (

      <main className="font-josefin">
        <section className="flex min-h-screen w-full flex-col items-center justify-between p-24">
          <div>
            <h1 style={{ fontSize: "15rem" }}>Fiesta '24</h1>
            <p className="text-5xl text-right" style={{ color: "#666362" }}>
              17 Aug 2024
            </p>
          </div>
        </section>
        <div
          id="events"
          className="min-h-screen w-full flex flex-col justify-center items-center"
        >
          <EventsPanel></EventsPanel>
        </div>
      </main>

  );
}
