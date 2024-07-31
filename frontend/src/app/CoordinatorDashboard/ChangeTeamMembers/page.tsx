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
import React, { useState } from "react";
import eventsJson from "../../../../public/events.json";
import { axiosClient } from "@/app/services/axiosClient";

const ChangeTeamMembers = () => {
  const [rollNo, setRollNo] = useState("");
  const [eventName, setEventName] = useState("");
  const [teamName, setTeamName] = useState("asf");
  const [teamMembers, setTeamMembers] = useState(Array.from({ length: 0 }));

  const handleEventChange = (event: SelectChangeEvent) => {
    setEventName(event.target.value as string);
  };

  const handleGetTeamList = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.get("", {
        params: { eventName: eventName, Rollno: rollNo },
      });
      if (response.status == 200) {
        setTeamName(response.data.teamName);
        setTeamMembers(response.data.teamMembers);
      } else if (response.status == 201) {
        alert("You have not registered for this event");
      } else {
        alert(response.data);
      }
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    const response = await axiosClient.post("", {eventName: eventName, teamMembers: teamMembers, teamName: teamName});
    try {
        
        if(response.status == 200){
            alert("Changed successfully");
        }else if(response.status == 201){
            alert("One or more Invalid roll no");
        }else{
            alert(response.data)
        }
    } catch (error) {
        alert("something went wrong" + error);
        console.error(error);
        
    }
  }
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
      {teamName.length > 0 ? (
        <div className="w-full m-2 rounded-2xl shadow-2xl border-2">
          <form className="flex flex-col justify-center items-center w-full p-4" onSubmit={handleTeamSubmit}>
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
              onChange={(e) => setTeamName(e.target.value)}
              className="my-2 w-full"
            />
            {teamMembers.map((member, idx) => {
              return (
                <TextField
                  variant="outlined"
                  label="Team Name"
                  color="success"
                  value={member}
                  onChange={(e) => {
                    let team = teamMembers;
                    team[idx] = e.target.value;
                    setTeamMembers(team);
                  }}
                  className="my-2 w-full"
                />
              );
            })}

            <Button variant="contained" color="success" sx={{borderRadius: "2rem"}}>Submit</Button>
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ChangeTeamMembers;
