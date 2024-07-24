"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./EventsCard.module.css";

const EventsCard = (props: any) => {
  const imgSrc = `/eventImages/${props.eventName}.jpg`;
  return (
    <Link
      className="m-2 p-2 rounded-2xl relative"
      href={{
        pathname: "/EventDetails",
        query: { eventName: props.eventName },
      }}
    >
      <motion.div
        className="relative w-40 h-36 bg-gray-200 rounded-2xl shadow-2xl group-hover:blur"
        whileHover={{ scale: 0.95 }}
      >
        <Image
          className="w-full h-full object-cover rounded-2xl hover:blur-2xl"
          src={imgSrc}
          alt={props.eventName}
          fill
        />
        <motion.div
          className={`${styles.overlay} absolute inset-0 flex items-center justify-center`}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          Click to know more
        </motion.div>
      </motion.div>
      <h2 className="text-center text-lg mt-1">{props.eventName}</h2>
    </Link>
  );
};

export default EventsCard;
