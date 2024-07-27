"use client";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";

const ApproveParticipants = () => {
  const [pendingParticipants, setPendingParticipants] = useState([1,2,3,4]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("");
      if (response.status == 200) {
        setPendingParticipants(response.data);
      } else {
        alert("Error fetching data");
        console.log(response.data);
      }
    };
    // fetchData();
  }, []);

  const handleApproval = (e:any) => {};

  const handleRejection = (e:any) => {};

  if (!pendingParticipants || pendingParticipants.length == 0) {
    return <h1>No participants to approve</h1>;
  }

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
                Class
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
                <tr className="bg-white border-2 hover:border-green-300 ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    Apple MacBook Pro 17"
                  </th>
                  <td className="px-6 py-4">Silver</td>
                  <td className="px-6 py-4">Laptop</td>
                  <td className="px-6 py-4">$2999</td>
                  <td>
                    <Button
                      color="success"
                      variant="outlined"
                      onClick={() => handleApproval(this)}
                      className="mx-0.5"
                    >
                      <DoneIcon />
                    </Button>{" "}
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => handleRejection(this)}
                      className="mx-0.5"
                    >
                      <ClearIcon />
                    </Button>
                  </td>
                </tr>)
              })}

            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveParticipants;
