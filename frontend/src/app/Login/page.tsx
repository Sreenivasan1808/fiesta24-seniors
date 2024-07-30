"use client";
import React, { useState } from "react";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { axiosClient } from "../services/axiosClient";
import {setRefreshedTokens} from "../services/axiosClient";
import axios from "axios";

const LoginPage = () => {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");

  const [rollNoError, setRollNoError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();

  const validateForm = () => {
    let isValid = true;
    if (!rollNo || rollNo.trim().length == 0) {
      setRollNoError("Please enter your roll no");
      isValid = false;
    }
    if (!password || password.trim().length == 0) {
      setPasswordError("Please enter your password");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = validateForm();
    const formData = { Rollno: rollNo, password: password };
    console.log(formData);
    

    if (isValid == true) {
      console.log("valid")
      try {
        const response = await axiosClient.post(`userRoutes/login`, formData, {authorization:false})
        
        if (response.status == 200) {
          console.log("vetri");
          
          router.push("/");
          setRefreshedTokens(response.data);
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error);
          alert(`Error: ${error.message}`);
        } else {
          console.error("Unexpected error:", error);
          alert("An unexpected error occurred");
        }
      }
      
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div style={{ background: "#f5f5f5" }} className="rounded-xl shadow-xl">
          <form className="flex flex-col justify-center p-3 min-h-96 min-w-80" onSubmit={handleSubmit}>
            <h2 className="text-emerald-950 text-center text-3xl mb-5">
              Login
            </h2>
            {/* <label htmlFor="adminNo" className="mt-5 mx-2 text-gray-800">
              Admission Number
            </label> */}
            <TextField
              required
              id="rollNo"
              label="Roll Number"
              variant="outlined"
              color="success"
              onChange={(e) => {
                setRollNo(e.target.value);
                setRollNoError("");
              }}
              sx={{ marginTop: "2em" }}
              error={rollNoError.length > 0}
              helperText={rollNoError}
            />
            {/* <label htmlFor="pass" className="mt-3 mx-2 text-gray-800">
              Password
            </label> */}
            <TextField
              id="pass"
              required
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              color="success"
              sx={{ marginTop: "1em" }}
              error={passwordError.length > 0}
              helperText={passwordError}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div className="flex justify-center mt-4 my-1">
              <Button
                sx={{ borderRadius: "25px", minWidth: "6rem" }}
                variant="contained"
                type="submit"
                color="success"
                component={motion.button}
                whileTap={{ scale: 0.85 }}
              >
                Login
              </Button>
            </div>
            <div className="flex justify-center my-2">
              <Button
                sx={{ borderRadius: "25px", minWidth: "6rem" }}
                variant="outlined"
                href="/Register"
                type="button"
                color="success"
                component={motion.button}
                whileTap={{ scale: 0.85 }}
                onClick={() => router.push("/Register")}
              >
                Signup
              </Button>
            </div>
            {/* <Link
              className="flex justify-center text-blue-400 my-2"
              href="/Register"
            >
              Not Registered? Click here
            </Link> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
