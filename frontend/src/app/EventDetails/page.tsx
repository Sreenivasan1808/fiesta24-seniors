"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import eventsJson from "../../../public/events.json";
import Image from "next/image";
import { Alert, Box, Button, Modal, Typography } from "@mui/material";
import axios from "axios";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

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
  const [open, setOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log(eventName);

  useEffect(() => {
    for (let event_ of eventsJson) {
      if (event_.eventName == eventName) {
        setEventDetails(event_);
        return;
      }
    }
  }, [eventName]);

  // console.log(eventDetails);
  if (!eventDetails || !eventName) {
    return <div>404 Not Found</div>;
  }

  let renderTemplate = eventDetails.rules.map((rule: any, index: number) => {
    if (Array.isArray(rule)) {
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
    return <h3 className="mx-6 text-center">{faculty}</h3>;
  });

  // console.log(renderTemplate);
  const imgSrc = `/eventImages/${eventName}.jpg`;

  const handleRegister = async () => {
    try {
      const response = await axios.post("", { eventName: eventName });
      if (response.status == 200) {
        setModalTitle("Success");
        setModalText("You have successfully registered");
        setIsRegistered(true);
      } else if (response.status == 204) {
        setModalTitle("Warning");
        setModalText(
          `${eventName} is overlapping with another event that you have registered for`
        );
      } else {
        setModalTitle("Sorry");
        setModalText("Registered failed");
      }
      handleOpen();
    } catch (error) {
      <Alert variant="filled" severity="error">
        Something went wrong.
      </Alert>;
      console.log(error);
    }
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "1.5rem",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <div className="min-h-screen w-screen flex flex-col items-center">
        <h1 className="text-5xl text-center m-4">{eventDetails.eventName}</h1>
        <h3 className="font-bold text-center text-lg">Faculty In Charge: </h3>
        <span>{facultyTemplate}</span>
        <div className="flex flex-col items-center border border-gray-300 bg-white bg-opacity-20 p-4 rounded-xl shadow-lg min-w-96">
          <div className="mt-2 flex items-center justify-between gap-12">
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
              <p className="text-center text-lg">Rules</p>
              <ul className="list-disc text-wrap text-lg">{renderTemplate}</ul>
            </div>
          </div>
          <div>
            {!isRegistered ? (
              <Button
                variant="contained"
                color="success"
                sx={{ borderRadius: "1.5rem" }}
                onClick={handleRegister}
              >
                Register for this Event
              </Button>
            ):
            <Alert severity="success" variant="filled" className="rounded-2xl">You have already registered for this event</Alert>
            }

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  className="text-center text-green-600"
                >
                  {modalTitle == "Success" ? (
                    <CheckCircleOutlineIcon className="mx-2" />
                  ) : modalTitle == "Warning" ? (
                    <WarningAmberIcon />
                  ) : (
                    <ErrorOutlineIcon />
                  )}
                  {modalTitle}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  className="text-center"
                >
                  {modalText}
                </Typography>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
