"use client";
import React from "react";

import { Button, TextField } from "@mui/material";
import { motion } from "framer-motion";

const LoginPage = () => {
  return (
    <>

      <div className="flex justify-center items-center min-h-screen">
        <div style={{background: "#fafafa"}} className="rounded-xl" >
          <form className="flex flex-col justify-center p-3 min-h-96 min-w-80">
            <h2 className="text-emerald-950 text-center text-3xl mb-5">
              Login
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
              autoComplete="current-password"
              color="success"
              sx={{ marginTop: "1em" }}
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
            <div className="flex justify-center my-1">
              <Button
                sx={{ borderRadius: "25px", minWidth: "6rem" }}
                variant="outlined"
                href="/Register"
                type="button"
                color="success"
                component={motion.button}
                whileTap={{ scale: 0.85 }}
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
