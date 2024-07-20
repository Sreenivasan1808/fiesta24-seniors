"use client"
import React, { useState } from "react";
import Input from "@mui/material/Input";
import { Button } from "@mui/material";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const RegisterPage = () => {
  const [formData, setFormData] = useState();

  return (
    <>
      <Navbar></Navbar>
      <div className="flex justify-center items-center min-h-screen shadow-md">
        <div className="bg-slate-200 rounded-lg">
          <form className="flex flex-col justify-center p-3 min-h-96 min-w-80">
            <h2 className="text-emerald-950 text-center text-3xl mb-5">
              Register
            </h2>
            <label htmlFor="adminNo" className="mt-5 mx-2 text-gray-800">
              Admission Number
            </label>
            <Input type="text" name="adminNo" id="adminNo" />
            <label htmlFor="pass" className="mt-3 mx-2 text-gray-800">
              Password
            </label>
            <Input type="password" name="pass" id="pass" />
            <label htmlFor="confirmpass" className="mt-3 mx-2 text-gray-800">
              Confirm Password
            </label>
            <Input type="password" name="confirmpass" id="confirmpass" />
            <div className="flex justify-center mt-5">
              <Button sx={{borderRadius: '25px'}} variant="contained">Register</Button>
            </div>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default RegisterPage;
