"use client";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import eventsJson from "../../public/events.json";
import axios from "axios";
import { saveAs } from 'file-saver';
import { axiosClient } from "@/app/services/axiosClient";

const DownloadParticipantList = () => {
  const [eventType, setEventType] = useState("");
  const [eventName, setEventName] = useState("");
  const handleTypeChange = (event: SelectChangeEvent) => {
    setEventType(event.target.value as string);
  };
  const handleEventChange = (event: SelectChangeEvent) => {
    setEventName(event.target.value as string);
  };

  const handleDownloadList = async () => {
    try {
      const response = await axiosClient.get(`coordinatorRoutes/download`, {params: {eventType: eventType, eventName: eventName}, responseType: "blob"})
      console.log(response.status);
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      saveAs(blob, `${eventName} participants.xlsx`);
    } catch (error) {
      
    }
  }

  return (
    <div className="w-full m-4 rounded-2xl shadow-2xl border-2">
      <h1 className="text-lg m-4 ">Download Participant List</h1>
      <div className="flex justify-center items-center">
        <FormControl className="w-72 m-4">
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
        <Button
          variant="contained"
          color="success"
          sx={{ borderRadius: "2rem" }}
          className="m-4"
          onClick={handleDownloadList}
        >
          Download
        </Button>
      </div>
    </div>
  );
};

export default DownloadParticipantList;
