"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, InputAdornment, Modal, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { axiosClient, logout } from "../services/axiosClient";
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

  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    logout();
  }, []) 

  const handleForgotPassword = async () => {
    setModalOpen(false);
    try {
      const response = await axiosClient.post("userRoutes/forgetpassword", {Rollno: rollNo});
      if(response.status == 200){
        alert("Please check your mail address to get your new password");
      }else if(response.status == 404){
        alert("Invalid Roll No");
      }
    } catch (error) {
      alert("Server error");
      console.error(error);
      
    }
  } 

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
        } else if(response.status == 401){
          alert(response.data);
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
            <p className="text-base text-green-800 text-center hover:cursor-pointer hover:text-green-600" onClick={() =>  {setModalOpen(true);}}>Forgot password? Click here</p>
            {/* <Link
              className="flex justify-center text-blue-400 my-2"
              href="/Register"
            >
              Not Registered? Click here
            </Link> */}
          </form>
        </div>
      </div>

      <Modal
              open={modalOpen}
              onClose={() => {
                setModalOpen(false);
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
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  className={"text-center m-2"}
                  
                > Forgot Password</Typography>
                <TextField className="m-2" variant="outlined" color="success" label="Roll No" onChange={(e) => {setRollNo(e.target.value)}}/>
                <Button onClick={handleForgotPassword} variant="contained" color="success" sx={{borderRadius: "2rem"}}>Submit</Button>
              </Box>
            </Modal>
    </>
  );
};

export default LoginPage;
