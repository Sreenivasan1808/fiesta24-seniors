"use client";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import eventsJson from "../../../../public/events.json";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import axios from "axios";

const RegisterEvent = () => {
  const [eventType, setEventType] = useState("");
  const [eventName, setEventName] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [minTeamMembers, setMinTeamMembers] = useState(0);
  const [maxTeamMembers, setMaxTeamMembers] = useState(0);
  const [soloRollNo, setSoloRollNo] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState(
    Array.from({ length: maxTeamMembers })
  );
  const [open, setOpen] = useState(false);

  const handleTypeChange = (event: SelectChangeEvent) => {
    setEventType(event.target.value as string);
  };
  const handleEventChange = (event: SelectChangeEvent) => {
    setEventName(event.target.value as string);
    for (let e of eventsJson) {
      if (e.eventType == "Group" && e.eventName == event.target.value) {
        setMinTeamMembers(e.minTeamMembers);
        setMaxTeamMembers(e.maxTeamMembers);

      }
    }
  };

  const handleTeamMemberChange = (idx:number, val:string) => {
    let team = teamMembers;
    team[idx] = val;
    setTeamMembers(team);
    console.log(team);
  };

  const handleEventRegister = async (e:any) => {
    e.preventDefault();
    let postData;
    let api;
    if (eventType == "Group") {
      console.log("Group register");
      api = `${process.env.NEXT_PUBLIC_SERVER_URL}/`;
      postData = {
        eventName: eventName,
        teamName: teamName,
        teamMembers: teamMembers,
      };
    } else {
      api = `${process.env.NEXT_PUBLIC_SERVER_URL}/`;
      postData = { eventName: eventName };
    }
    try {
      const response = await axios.post(api, postData);
      if (response.status == 200) {
        setModalTitle("Success");
        setModalText("You have successfully registered");
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
      setOpen(true);
    }
  };

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

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div
        style={{
          width: "30rem",
          minHeight: "25rem",
          background: "#fafafa",
          minWidth: "20%",
        }}
        className="rounded-xl shadow-xl flex flex-col justify-center items-center"
      >
        <h1 className="text-xl font-bold m-3 p-2">Event Registration</h1>
        <form
          className="flex flex-col justify-center items-center w-full"
          onSubmit={handleEventRegister}
        >
          <div className="grid grid-cols-1 gap-4 m-4 w-full p-4">
            <FormControl>
              <InputLabel id="eventTypeLabel" color="success">
                Event Type
              </InputLabel>
              <Select
                labelId="eventTypeLabel"
                id="eventType"
                value={eventType}
                label="Event Type"
                autoWidth
                onChange={handleTypeChange}
                className="w-full"
                color="success"
                required
              >
                <MenuItem value={"solo"}>Solo Event</MenuItem>
                <MenuItem value={"group"}>Group Event</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="eventNameLabel" color="success">
                Event Name
              </InputLabel>
              <Select
                labelId="eventNameLabel"
                id="eventName"
                value={eventName}
                label="Event Name"
                autoWidth
                onChange={handleEventChange}
                className="w-full"
                disabled={eventType.length == 0}
                color="success"
                required
              >
                {eventType == "solo"
                  ? eventsJson.map((eve: any) => {
                      if (eve.eventType == "Solo") {
                        return (
                          <MenuItem key={eve.eventName} value={eve.eventName}>
                            {eve.eventName}
                          </MenuItem>
                        );
                      }
                    })
                  : eventsJson.map((eve: any) => {
                      if (eve.eventType == "Group") {
                        return (
                          <MenuItem key={eve.eventName} value={eve.eventName}>
                            {eve.eventName}
                          </MenuItem>
                        );
                      }
                    })}
              </Select>
            </FormControl>
            {eventType == "solo" ? (
              <TextField
                required
                variant="outlined"
                label="Roll No"
                color="success"
                onChange={(e) => {
                  setSoloRollNo(e.target.value);
                }}
              />
            ) : eventType == "group" && eventName.length > 0 ? (
              <>
                <TextField
                  variant="outlined"
                  label="Team Name"
                  color="success"
                  required
                  onChange={(e) => {
                    setTeamName(e.target.value);
                  }}
                />
                {Array.from({ length: minTeamMembers }).map((item, idx) => {
                  const labels = `Team member ${idx + 1} Roll No`;
                  return (
                    <TextField
                      variant="outlined"
                      label={labels}
                      required
                      key={idx}
                      color="success"
                      onChange={(e) => {
                        handleTeamMemberChange(idx, e.target.value);
                      }}
                    />
                  );
                })}
                {Array.from({ length: maxTeamMembers - minTeamMembers }).map(
                  (item, idx) => {
                    const labels = `Team member ${
                      idx + minTeamMembers
                    } Roll No`;
                    return (
                      <TextField
                        variant="outlined"
                        label={labels}
                        key={idx + 1 + minTeamMembers}
                        color="success"
                        onChange={(e) => {
                          handleTeamMemberChange(
                            idx + minTeamMembers,
                            e.target.value
                          );
                        }}
                      />
                    );
                  }
                )}
              </>
            ) : (
              <></>
            )}
          </div>
          <Button
            color="success"
            type="submit"
            variant="contained"
            sx={{ borderRadius: "2rem" }}
            className="w-fit m-6 flex justify-center items-center"
          >
            Submit
          </Button>
        </form>
      </div>
      <Modal
              open={open}
              onClose={() => {setOpen(false)}}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  className={"text-center"}
                  color={modalTitle == "Success" ? "sucess" : modalTitle == "Warning" ? "warning" : "error"}
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
    </div>
  );
};

export default RegisterEvent;
