"use client";
import { motion } from "framer-motion";
import EventsPanel from "@/components/EventsPanel";
import { Rock_Salt } from "next/font/google";

const rock_salt = Rock_Salt({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rock",
})

export default function Home() {
  return (
    <main className="font-josefin">
      <section
        className="flex min-h-screen w-full flex-col items-center justify-between p-24"
        style={{backgroundImage: 'radial-gradient(170% 125% at 50% 0%, #1e293b 50%, #184a2f)'}}
        id="hero"
        
      >
        <motion.div>
          {/* <motion.img
            src="/curtain.png"
            alt=""
            style={{
              position: "absolute",
              top: "7%",
              left: "0%",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              x: curtainX 
            }}
            initial={{ scale: 1 }}
            animate={{ scale: 1.5 }}
          /> */}
          <motion.h1
            style={{ fontSize: "11rem", color:"rgb(210,210,210)", textShadow: "0px 0px 25px rgb(0, 200, 0)"}}
            className={rock_salt.className}
            initial={{ opacity: 0, x: -80 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                ease: [0.5, 0.5, 0.5, 0.5],
                duration: 0.8,
                staggerChildren: 1.5,
              },
            }}
          >
            Fiesta '24
          </motion.h1>
          <motion.p
            className='text-5xl text-right mt-4'
            style={{ color: "rgb(200, 200, 200)" }}
            initial={{ opacity: 0, x: 80 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                ease: [0.5, 0.5, 0.5, 0.5],
                duration: 0.8,
                staggerChildren: 1.5,
              },
            }}
          >
            17 Aug 2024
          </motion.p>
        </motion.div>
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
