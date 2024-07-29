import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

const GroupEventRegisterForm = (props: any) => {
  return (
    <Box sx={{ overflowY: "scroll", scrollTimeline: "0" }} className="w-full">
      <form
        className="flex flex-col justify-center items-center w-full p-4"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("group form");

          props.handleTeamInfoSubmit(e);
        }}
      >
        <Typography
          id="groupform"
          variant="h6"
          component="h2"
          className="text-center text-slate-800 m-3"
        >
          Team Info
        </Typography>
        <TextField
          required
          onChange={(e) => {
            props.handleTeamNameChange(e.target.value);
          }}
          variant="outlined"
          label="Team Name"
          color="success"
          className="my-2 w-full"
        />
        {Array.from({ length: props.minTeamMembers }).map((item, idx) => {
          const labels = `Team member ${idx + 1} Roll No`;
          return (
            <TextField
              required
              key={idx}
              onChange={(e) => {
                props.handleTeamMemberChange(idx, e.target.value);
              }}
              variant="outlined"
              label={labels}
              color="success"
              className="my-2 w-full"
            />
          );
        })}
        {Array.from({
          length: props.maxTeamMembers - props.minTeamMembers,
        }).map((item, idx) => {
          const labels = `Team member ${
            idx + 1 + props.minTeamMembers
          } Roll No`;
          return (
            <TextField
              key={idx}
              onChange={(e) => {
                props.handleTeamMemberChange(idx+props.minTeamMembers, e.target.value);
              }}
              variant="outlined"
              label={labels}
              color="success"
              className="my-2 w-full"
            />
          );
        })}
        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{ borderRadius: "2rem" }}
          className="m-4"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default GroupEventRegisterForm;
