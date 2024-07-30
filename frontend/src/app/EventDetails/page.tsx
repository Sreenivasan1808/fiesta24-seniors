"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import eventsJson from "../../../public/events.json";
import Image from "next/image";
import {
  Alert,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import GroupEventRegisterForm from "@/components/GroupEventRegisterForm";
import { axiosClient } from "../services/axiosClient";

interface Event {
  eventName: string;
  eventType: string;
  rules: (string | string[])[];
  facultyInCharge: string[];
  venue: string;
  startTime: Date;
  endTime: Date;
  minTeamMembers: number;
  maxTeamMembers: number;
}

const EventDetails = () => {
  const searchParams = useSearchParams();
  const eventName = searchParams.get("eventName");
  const [eventDetails, setEventDetails] = useState<Event>({
    eventName: "",
    eventType: "",
    rules: [],
    facultyInCharge: [],
    venue: "",
    startTime: new Date(),
    endTime: new Date(),
    minTeamMembers: 0,
    maxTeamMembers: 0,
  });
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [isGroupEvent, setIsGroupEvent] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState(
    Array.from({ length: eventDetails.maxTeamMembers })
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTeamMemberChange = (idx: number, rollno: string) => {
    let members = teamMembers;
    members[idx] = rollno;
    setTeamMembers(members);
  };

  const handleRegister = async () => {
    let postData;
    let api;
    if (eventDetails.eventType == "Group") {
      console.log("Group register");
      api = "userRoutes/registergroupevent";
      postData = {
        eventName: eventName,
        teamName: teamName,
        teamMembers: teamMembers,
      };
    } else {
      api = "userRoutes/registersoloevent";
      postData = { eventName: eventName };
    }
    try {
      const response = await axiosClient.post(api, postData);
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
      // handleOpen();
    } catch (error) {
      setModalTitle("Sorry");
      setModalText("Registration failed");
      console.log(error);
    } finally {
      handleOpen();
    }
  };

  const handleTeamInfoSubmit = (e: any) => {
    e.preventDefault();
    console.log("Group event");
    setFormModalOpen(false);

    handleRegister();
  };
  // console.log(eventName);
  const checkRegistrationStatus = async () => {
    const response = await axiosClient.get(
      `userRoutes/isregistered`,
      { params: { eventName: eventName } } //need to send rollno
    );
    console.log(response);

    if (response.status == 201) {
      setIsRegistered(false);
    } else if (response.status == 200) {
      setIsRegistered(true);
    } else {
      console.log(response.data);
    }
  };

  useEffect(() => {
    for (let event_ of eventsJson) {
      if (event_.eventName == eventName) {
        let st = new Date(event_.startTime);
        let et = new Date(event_.endTime);
        let minTeamMembers: any = 0;
        let maxTeamMembers: any = 0;

        if (event_.eventType == "Group") {
          setIsGroupEvent(true);
          minTeamMembers = event_.minTeamMembers;
          maxTeamMembers = event_.maxTeamMembers;
          setTeamMembers(Array.from({ length: maxTeamMembers }));
        }
        setEventDetails({
          ...event_,
          startTime: st,
          endTime: et,
          minTeamMembers: minTeamMembers,
          maxTeamMembers: maxTeamMembers,
        });
        break;
      }
      let r = localStorage.getItem("role");
      if (r) setRole(r);
      checkRegistrationStatus();
    }
  }, [eventName]);

  // console.log(eventDetails);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #020202",
    borderRadius: "1.5rem",
    boxShadow: 24,
    padding: 4,
  };

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
    return (
      <h3 key={index} className="mx-6 text-center">
        {faculty}
      </h3>
    );
  });

  // console.log(renderTemplate);
  const imgSrc = `/eventImages/${eventName}.jpg`;

  return (
    <>
      <div className="min-h-screen w-screen flex flex-col items-center">
        <h1 className="text-5xl text-center m-4">{eventDetails.eventName}</h1>
        <h3 className="font-bold text-center text-lg">Faculty In Charge: </h3>
        <span>{facultyTemplate}</span>
        <div className="flex flex-col items-center border border-gray-300 bg-white bg-opacity-20 p-4 rounded-xl shadow-lg min-w-96">
          <h3 className="font-bold text-center text-lg">
            Venue:{" "}
            <span className="text-base font-normal">{eventDetails.venue}</span>
          </h3>
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
            {role == "participant" ? (
              !isRegistered ? (
                <Button
                  variant="contained"
                  color="success"
                  sx={{ borderRadius: "1.5rem" }}
                  onClick={
                    !isGroupEvent
                      ? handleRegister
                      : () => {
                          setFormModalOpen(true);
                        }
                  }
                >
                  Register for this Event
                </Button>
              ) : (
                <Alert
                  severity="success"
                  variant="filled"
                  className="rounded-2xl"
                >
                  You have already registered for this event
                </Alert>
              )
            ) : (
              <Alert
                  severity="error"
                  variant="filled"
                  className="rounded-2xl"
                >You can't register until your account is registered and approved</Alert>
            )}

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
                  className={"text-center"}
                  color={
                    modalTitle == "Success"
                      ? "sucess"
                      : modalTitle == "Warning"
                      ? "warning"
                      : "error"
                  }
                >
                  {modalTitle == "Success" ? (
                    <CheckCircleOutlineIcon className="mr-2" />
                  ) : modalTitle == "Warning" ? (
                    <WarningAmberIcon className="mr-2" />
                  ) : (
                    <ErrorOutlineIcon className="mr-2" />
                  )}
                  {modalTitle}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  className="text-center w-full"
                >
                  {modalText}
                </Typography>
              </Box>
            </Modal>

            {/*Group event Form*/}
            <Modal
              open={formModalOpen}
              onClose={() => {
                setFormModalOpen(false);
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  ...style,
                  width: 500,
                  transform: "translate(-50%, -50%)",
                  maxHeight: "90vh",
                }}
                className="flex flex-col justify-center items-center p-4 min-w-72"
              >
                <GroupEventRegisterForm
                  minTeamMembers={eventDetails.minTeamMembers}
                  maxTeamMembers={eventDetails.maxTeamMembers}
                  handleTeamMemberChange={handleTeamMemberChange}
                  handleTeamNameChange={setTeamName}
                  handleTeamInfoSubmit={handleTeamInfoSubmit}
                  className="p-4"
                />
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
