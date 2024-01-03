import React from 'react';
import AllApplications from "../components/AllApplications";
import NavBar from "../components/NavBar";
import { redirect } from "react-router-dom";


function ApplicationsPage() {
  
 return (
    <div>
        <NavBar />
        <main>
        <AllApplications />
        </main>
    </div>   
  
);}

export default ApplicationsPage;

export async function action({request}) {
  const data = await request.formData();
  const companyId = data.get("companyName");
  const positionId = data.get("positionName");
  const applicationStatus = data.get("applicationStatus");
  const sendDate = data.get("sendDate");

  const applicationData = {
          companyid: companyId,
          positionid: positionId,
          status: applicationStatus,
          senddate: sendDate,
        };

  const response = await fetch("http://localhost:9000/applications/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(applicationData)
  });
  return redirect("/applications");
};



