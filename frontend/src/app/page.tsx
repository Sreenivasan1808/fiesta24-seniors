"use client";
import { motion } from "framer-motion";
import EventsPanel from "@/components/EventsPanel";
import { Rock_Salt } from "next/font/google";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Opacity } from "@mui/icons-material";

const rock_salt = Rock_Salt({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rock",
});

const dropInVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Home() {
  const fiestaText = "Fiesta '24";
  const router = useRouter();
  return (
    <main className="font-josefin">
      <div
        className="flex items-center"
        style={{
          backgroundImage:
            "radial-gradient(170% 125% at 50% 0%, #2F8282 20%, #184a2f)",
        }}
      >
        <section
          className="flex min-h-screen w-full flex-col items-start justify-between p-24"
          id="hero"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Uncomment and adjust the following code if you want to include the image animation */}
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
          }}
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={{ duration: 1, ease: "easeOut" }}
        /> */}
            {/* <motion.h1
              style={{
                fontSize: "8rem",
                color: "rgb(210,210,210)",
                textShadow: "0px 0px 25px rgb(0, 200, 0)",
              }}
              className={rock_salt.className}
              initial={{scale: 0}}
              animate={{scale:1}}
              transition={{ staggerChildren: 0.2, duration: 0.2 }}
            > */}
            {/* {fiestaText.split("").map((char, index) => (
                <motion.span key={index} variants={dropInVariants}>
                  {char}
                </motion.span>
              ))} */}
            <Image
              src="/fiesta.gif"
              alt="Fiesta 24"
              width={800}
              height={800}
            ></Image>
            {/* </motion.h1> */}
            <motion.p
              className="text-3xl text-left m-0"
              style={{ color: "rgb(200, 200, 200)" }}
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
              17 Aug 2024
            </motion.p>
            <motion.div
              className="flex justify-start mt-8"
              initial={{ scale: 0.8, opacity: 0, x:-80 }}
              animate={{
                scale: 1,
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeInOut",
                  delay: 0.5,
                },
              }}
            >
              <motion.button
                className="px-6 py-3 bg-green-600 text-white rounded-lg mt-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => router.push("/#events")}
              >
                Join Events
              </motion.button>
            </motion.div>
          </motion.div>
        </section>
        <motion.img
          src="/colors.png"
          alt="ART"
          className="w-96 h-96 m-4 p-4"
          initial={{ scale: 0.1, opacity: 0 }}
          animate={{
            scale: 1.25,
            opacity: 1,
            transition: {
              duration: 1,
              ease: "easeInOut",
              delay: 0.5,
            },
          }}
        />
      </div>
      <div
        id="events"
        className="min-h-screen w-full flex flex-col justify-center items-center"
      >
        <EventsPanel></EventsPanel>
      </div>
    </main>
  );
}
