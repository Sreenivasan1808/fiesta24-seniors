"use client"

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventsPanel from "@/components/EventsPanel";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <section className="flex min-h-screen flex-col items-center justify-between p-24">
        <img src="" alt="Curtain" />
      </section>
      <section>
        <EventsPanel></EventsPanel>
      </section>
      <Footer></Footer>
    </>
  );
}
