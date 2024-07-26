"use client"
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ApproveParticipants = () => {

  const [pendingParticipants, setPendingParticipants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("");
      if(response.status == 200){
        setPendingParticipants(response.data);
      }else{
        alert("Error fetching data");
        console.log(response.data);
      }
    }
    fetchData();
  }, [])

  if(!pendingParticipants || pendingParticipants.length == 0){
    return <h1>No participants to approve</h1>
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
            {/* {pendingParticipants.map((p) => {return <h1>hi</h1>})} */}
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
              <td><Button>Approve</Button> <Button>Reject</Button></td>
            </tr>
            <tr className="bg-white border-b ">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">White</td>
              <td className="px-6 py-4">Laptop PC</td>
              <td className="px-6 py-4">$1999</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Magic Mouse 2
              </th>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">$99</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ApproveParticipants
