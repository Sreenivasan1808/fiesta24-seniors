import DownloadParticipantList from "@/components/DownloadParticipantList";
import React from "react";


const CoordinatorDashboardPage = () => {
  return (
    <div className="min-h-screen">
      Dashboard
      <DownloadParticipantList></DownloadParticipantList>
    </div>
  );
};

export default CoordinatorDashboardPage;
