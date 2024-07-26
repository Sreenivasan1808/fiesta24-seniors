"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const AddParticipantPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div
        style={{
          width: "30rem",
          minHeight: "25rem",
          background: "#fafafa",
          minWidth: "20%",
        }}
        className="rounded-xl shadow-xl flex flex-col justify-center items-center"
      >
        <form className="flex flex-col justify-center items-center w-full">
          <h2 className="text-xl font-bold m-3 p-2">Add Participant</h2>
          <div className="grid grid-cols-1 gap-4 m-3">
            {/* <label htmlFor="rollNo" className="m-6">
              Roll Number
            </label> */}
            <TextField
              required
              id="rollNo"
              variant="outlined"
              color="success"
              label="Roll No"
              className="w-96"
            />

            {/* <label htmlFor="pass" className="m-6">
              Password
            </label> */}

            <TextField
              id="pass"
              required
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              color="success"
              label="Password"
              className="w-96"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* <label htmlFor="confirmpass" className="m-6">
              Confirm Password
            </label> */}
            <TextField
              id="confirmpass"
              required
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="current-password"
              color="success"
              label="Confirm Password"
              className="w-96"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <Button
            type="submit"
            color="success"
            variant="contained"
            className="w-52 m-6 flex justify-center items-center"
            sx={{ borderRadius: "2em" }}
          >
            Add Participant
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddParticipantPage;
