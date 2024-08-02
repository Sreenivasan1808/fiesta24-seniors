"use client";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { motion } from "framer-motion";
import {axiosClient} from "../services/axiosClient";
import { useRouter } from "next/navigation";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const RegisterPage = () => {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [rollNoError, setRollNoError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const router = useRouter();

  const validateForm = (formData: {
    Rollno: string;
    password: string;
    confirmPassword: string;
  }) => {
    let isValid = true;
    if (!formData.Rollno || formData.Rollno.trim().length == 0) {
      setRollNoError("Please enter your roll no (eg: 21bcs183)");
      isValid = false;
    }
    if (!formData.password || formData.password.trim().length == 0) {
      setPasswordError("Please enter a valid password");
      isValid = false;
    }
    if (
      !formData.confirmPassword ||
      formData.confirmPassword.trim().length == 0
    ) {
      setConfirmPasswordError("Please enter a valid password");
      isValid = false;
    } else if (formData.confirmPassword != formData.password) {
      setConfirmPasswordError(
        "Confirm password and your password must be same"
      );
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(process.env.NEXT_PUBLIC_SERVER_URL);
    const formData = {
      Rollno: rollNo,
      password: password,
      confirmPassword: confirmPassword,
    };
    const isValid = validateForm(formData);
    if (isValid) {
      console.log(formData);
      setConfirmPassword("");
      setPassword("");
      setRollNo("");
      setConfirmPasswordError("");
      setRollNoError("");
      setConfirmPasswordError("");
      
      const response = await axiosClient.post(`userRoutes/register`, {...formData}, { Authorization: false });
      if (response.status == 200) {
        alert(
          "Registered successfully. Please wait until your account is verified by our coordinator"
        );
      } else if(response.status == 205){
        alert("The Roll no doesn't exist");
        console.log(response.data);
        
      }else if(response.status == 201){
        alert("You have already registered");
      }else{
        alert("Sorry! Something went wrong");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen shadow-xl">
        <div
          className="rounded-lg"
          style={{ background: "#f5f5f5", color: "#000" }}
        >
          <form
            className="flex flex-col justify-center p-3 min-h-96 min-w-80"
            onSubmit={handleSubmit}
          >
            <h2 className="text-emerald-950 text-center text-3xl mb-5">
              Register
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
              value={rollNo}
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

export default RegisterPage;
