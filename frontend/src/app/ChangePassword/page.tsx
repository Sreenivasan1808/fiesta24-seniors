"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { axiosClient } from "../services/axiosClient";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrPassword, setShowCurrPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateForm = () => {
    if (confirmPassword != password) {
      setConfirmPasswordError(
        "Confirm password and your password must be same"
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    validateForm();
    try {
      const response = await axiosClient.post(
        "/coordinatorRoutes/participantpasswordchange",
        { currentpassword: currentPassword, newpassword: password }
      );
      if (response.status == 200) {
        alert("Password changed");
      } else if (response.status == 201) {
        alert("Invalid Roll No");
      }
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleClickShowCurrPassword = () => {
    setShowCurrPassword(!showCurrPassword);
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen shadow-2xl min-w-fit p-4">
        <div
          className="rounded-2xl"
          style={{ background: "#f5f5f5", color: "#000" }}
        >
          <form
            className="flex flex-col justify-center p-3 min-h-96 min-w-80"
            onSubmit={handleSubmit}
          >
            <h2 className="text-emerald-950 text-center text-3xl mb-5">
              Change Password
            </h2>
            {/* <label htmlFor="adminNo" className="mt-5 mx-2 text-gray-800">
              Admission Number
            </label> */}
            <TextField
              required
              id="currpass"
              label="Current Password"
              variant="outlined"
              type={showCurrPassword ? "text" : "password"}
              color="success"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
              sx={{ marginTop: "2em" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowCurrPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* <label htmlFor="pass" className="mt-3 mx-2 text-gray-800">
              Password
            </label> */}
            <TextField
              id="pass"
              required
              label="New Password"
              type={showPassword ? "text" : "password"}
              color="success"
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              value={password}
              autoComplete="current-password"
              sx={{ marginTop: "1em" }}
              error={passwordError.length > 0}
              helperText={passwordError}
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
            {/* <label htmlFor="confirmpass" className="mt-3 mx-2 text-gray-800">
              Confirm Password
            </label> */}
            <TextField
              id="confirmpass"
              required
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              color="success"
              value={confirmPassword}
              autoComplete="current-password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError("");
              }}
              sx={{ marginTop: "1em" }}
              error={confirmPasswordError.length > 0}
              helperText={confirmPasswordError}
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
            <div className="flex justify-center mt-5">
              <Button
                sx={{ borderRadius: "25px" }}
                variant="contained"
                type="submit"
                color="success"
                component={motion.button}
                whileTap={{ scale: 0.85 }}
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
