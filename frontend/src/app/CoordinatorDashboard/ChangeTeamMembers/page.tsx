"use client";
import GroupEventRegisterForm from "@/components/GroupEventRegisterForm";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import eventsJson from "../../../../public/events.json";
import { axiosClient } from "@/app/services/axiosClient";

const ChangeTeamMembers = () => {
  const [rollNo, setRollNo] = useState("");
  const [eventName, setEventName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  const [minTeamMembers, setMinTeamMembers] = useState(0);
  const [maxTeamMembers, setMaxTeamMembers] = useState(0);
  const [teamMembers, setTeamMembers] = useState(Array.from({ length: maxTeamMembers }));

  const handleEventChange = (event: SelectChangeEvent) => {
    setEventName(event.target.value as string);
  };

  const handleTeamMemberChange = (idx: number, rollno: string) => {
    console.log(rollno);
    console.log(idx);
    
    let members = teamMembers;
    members[idx] = rollno;
    setTeamMembers(members);
  };

  // useEffect(() => {
  //   for (let event_ of eventsJson) {
  //     if (event_.eventName == eventName) {
  //       let minTeamMembers: any = 0;
  //       let maxTeamMembers: any = 0;

  //       if (event_.eventType == "Group") {
  //         minTeamMembers = event_.minTeamMembers;
  //         maxTeamMembers = event_.maxTeamMembers;
  //         setTeamMembers(Array.from({ length: maxTeamMembers }));
  //       }

  //       break;
  //     }
  //   }

  // }, [dataFetched]);

  const handleGetTeamList = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.get("coordinatorRoutes/getMembers", {
        params: { eventName: eventName, Rollno: rollNo.toLowerCase() },
      });
      if (response.status == 200) {
        for (let event_ of eventsJson) {
          if (event_.eventName == eventName) {
            let minTeamMembers1: any = 0;
            let maxTeamMembers1: any = 0;

            minTeamMembers1 = event_.minTeamMembers;
            maxTeamMembers1 = event_.maxTeamMembers;
            setTeamMembers(Array.from({ length: maxTeamMembers1 }));
            setMinTeamMembers(minTeamMembers1);
            setMaxTeamMembers(maxTeamMembers1);

            break;
          }
        }
        let team = Array.from({ length: maxTeamMembers });
        let newTeam = response.data.teamMembers;
        for(let i = 0; i < newTeam.length; i++){
          team[i] = newTeam[i];
        }
        setTeamName(response.data.teamName);
        setTeamMembers(team);
        setDataFetched(true);
      } else if (response.status == 201) {
        alert("You have not registered for this event");
<<<<<<< HEAD
      } else if (response.status == 206) {
        alert("repeated team members");
=======
        setDataFetched(false);
>>>>>>> f6dc527883f2dd964b70e9d0b64c0c9ae7b9800c
      } else {
        setDataFetched(false);
        alert(response.data);
      }
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    const response = await axiosClient.post("coordinatorRoutes/changeMember", {
      eventName: eventName,
<<<<<<< HEAD
      teamMembers: teamMembers,
=======
      teamMembers: teamMembers.map((e = e.toLowerCase())),
>>>>>>> f6dc527883f2dd964b70e9d0b64c0c9ae7b9800c
      teamName: teamName,
    });
    try {
      if (response.status == 200) {
        alert("Changed successfully");
      } else if (response.status == 201) {
        alert("One or more Invalid roll no");
      } else {
        alert(response.data);
      }
    } catch (error) {
      alert("something went wrong" + error);
      console.error(error);
    }
  };
  return (
    <>
      <div className="w-full m-4 rounded-2xl shadow-2xl border-2">
        <h1 className="text-lg m-4 ">Change Team members</h1>
        <div className="flex justify-center items-center">
          <FormControl className="w-72 m-4">
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
              color="success"
              required
            >
              {eventsJson.map((eve: any) => {
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
          <TextField
            variant="outlined"
            value={rollNo}
            label="Team Leader Roll no"
            color="success"
            onChange={(e) => setRollNo(e.target.value)}
          />
          <Button
            variant="contained"
            color="success"
            sx={{ borderRadius: "2rem" }}
            className="m-4"
            onClick={handleGetTeamList}
          >
            Get Team Members
          </Button>
        </div>
      </div>
<<<<<<< HEAD
      {teamName.length > 0 && teamMembers.length > 0 ? (
        <div className="w-full m-2 rounded-2xl shadow-2xl border-2">
          <form
            className="flex flex-col justify-center items-center w-full p-4"
            
=======
      {dataFetched ? (
        <div className="w-full m-2 rounded-2xl shadow-2xl border-2">
          <form
            className="flex flex-col justify-center items-center w-full p-4 m-4"
            onSubmit={handleTeamSubmit}
>>>>>>> f6dc527883f2dd964b70e9d0b64c0c9ae7b9800c
          >
            <Typography
              id="groupform"
              variant="h6"
              component="h2"
              className="text-center text-slate-800 m-3"
            >
              Team Info
            </Typography>
            <TextField
              required
              variant="outlined"
              label="Team Name"
              color="success"
              value={teamName}
              disabled
              className="my-2 w-full"
            />
            {Array.from({length: maxTeamMembers}).map((member, idx) => {
              let roll = teamMembers[idx];
              return (
                <TextField
                  variant="outlined"
                  label={
<<<<<<< HEAD
                    idx === 0
=======
                    idx == 0
>>>>>>> f6dc527883f2dd964b70e9d0b64c0c9ae7b9800c
                      ? "Team Leader Roll no"
                      : `Team Member ${idx + 1} Roll No`
                  }
                  color="success"
                  key={idx}
<<<<<<< HEAD
                  value={member}
                  onChange={(e) => {
                    const updatedTeam = [...teamMembers]; // Create a new array with the spread operator
                    updatedTeam[idx] = e.target.value; // Update the value at the current index
                    setTeamMembers(updatedTeam); // Set the new array as the state
=======
                  required = {idx <= minTeamMembers}
                  value={roll}
                  onChange={(e) => {
                    handleTeamMemberChange(idx, e.target.value.toLowerCase());
>>>>>>> f6dc527883f2dd964b70e9d0b64c0c9ae7b9800c
                  }}
                  className="my-2 w-full"
                />
              );
            })}

            <Button
              variant="contained"
              color="success"
              sx={{ borderRadius: "2rem" }}
<<<<<<< HEAD
              onClick={handleTeamSubmit}
            > 
=======
            >
>>>>>>> f6dc527883f2dd964b70e9d0b64c0c9ae7b9800c
              Submit
            </Button>
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ChangeTeamMembers;
