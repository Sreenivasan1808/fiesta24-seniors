"use client";
import React, { useState } from "react";
import Input from "@mui/material/Input";
import { Button, TextField } from "@mui/material";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const RegisterPage = () => {
  const [formData, setFormData] = useState();

  return (
    <>

      <div className="flex justify-center items-center min-h-screen shadow-md">
        <div className="rounded-lg" style={{background: "#f5f5f5", color: "#000"}}>
          <form className="flex flex-col justify-center p-3 min-h-96 min-w-80">
            <h2 className="text-emerald-950 text-center text-3xl mb-5">
              Register
            </h2>
            {/* <label htmlFor="adminNo" className="mt-5 mx-2 text-gray-800">
              Admission Number
            </label> */}
            <TextField
              required
              id="adminNo"
              label="Admission Number"
              variant="outlined"
              color="success"
              sx={{ marginTop: "2em" }}
            />
            {/* <label htmlFor="pass" className="mt-3 mx-2 text-gray-800">
              Password
            </label> */}
            <TextField
              id="pass"
              required
              label="Password"
              type="password"
              color="success"
              autoComplete="current-password"
              sx={{ marginTop: "1em" }}
            />
            {/* <label htmlFor="confirmpass" className="mt-3 mx-2 text-gray-800">
              Confirm Password
            </label> */}
            <TextField
              id="confirmpass"
              required
              label="Confirm Password"
              type="password"
              color="success"
              autoComplete="current-password"
              sx={{ marginTop: "1em" }}
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
