import DownloadParticipantList from "@/components/DownloadParticipantList";
import React from "react";


const CoordinatorDashboardPage = () => {
  return (
    <div className="min-h-screen w-full">
      <h1 className="text-xl font-semibold text-center m-4">Dashboard</h1>
      <DownloadParticipantList></DownloadParticipantList>
    </div>
  );
};

export default CoordinatorDashboardPage;
