"use client";
import React from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";

const AddParticipantPage = () => {
  return (
    <div className="w-full flex">
      <form className="flex flex-col justify-center items- m-8 w-full">
        <h2 className="text-lg font-bold">Add Participant</h2>
        <div className="flex flex-row">
          <label htmlFor="adminNo" className="m-6">Admission Number</label>
          <TextField
            required
            id="adminNo"
            label="Admission Number"
            variant="outlined"
            color="success"
            className="m-6"
          />
        </div>

        <div>
          <label htmlFor="adminNo" className="m-6">Password</label>
          <TextField
            id="pass"
            required
            label="Password"
            type="password"
            autoComplete="current-password"
            color="success"
            className="m-6"
          />
        </div>
      </form>
    </div>
  );
};

export default AddParticipantPage;
