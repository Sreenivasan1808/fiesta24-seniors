"use client";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";

interface Participant {
  Rollno: string,
  name: string,
  branch: string,
  year: number,
  mail: string
}

const ApproveParticipants = () => {
  const [pendingParticipants, setPendingParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/coordinatorRoutes/dashboard`
    );
    if (response) setIsLoading(false);
    console.log(response.status);
    if (response.status == 204) {
      setPendingParticipants([]);
      console.log("No data");
    } else if (response.status == 200) {
      console.log(response.data);
      setPendingParticipants(response.data);
    } else {
      alert("Error fetching data");
      console.log(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApproval = async (e: any) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/coordinatorRoutes/accept`, {mail: e});
      if(response.status == 200){
        alert("Approved user");
        console.log(response.data);
        fetchData();
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
      
    }
    
  };

  const handleRejection = (e: any) => {};

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else if (!pendingParticipants || pendingParticipants.length == 0) {
    return (
      <h1 className="text-center flex justify-center items-center font-semibold text-xl m-4">
        No participants to approve
      </h1>
    );
  } else {
    return (
      <div>
        <div className="relative overflow-x-hidden m-4">
          <table
            className="w-full text-sm text-left text-gray-500 rounded-2xl border"
            style={{ maxWidth: "98%" }}
          >
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-gray-800 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Roll No
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Department
                </th>
                <th scope="col" className="px-6 py-3">
                  Year
                </th>
                <th scope="col" className="px-6 py-3">
                  Approve
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingParticipants &&
                pendingParticipants.map &&
                pendingParticipants.map((item, index) => {
                  return (
                    <tr className="bg-white border-2 hover:border-green-300" key={item.mail}>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {item.Rollno}
                      </td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.branch}</td>
                      <td className="px-6 py-4">{item.year}</td>
                      <td>
                        <Button
                          color="success"
                          variant="outlined"
                          onClick={() => handleApproval(item.mail)}
                          className="mx-0.5"
                        >
                          <DoneIcon />
                        </Button>{" "}
                        <Button
                          color="error"
                          variant="outlined"
                          onClick={() => handleRejection(item.mail)}
                          className="mx-0.5"
                        >
                          <ClearIcon />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default ApproveParticipants;
