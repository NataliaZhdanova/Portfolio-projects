import React from 'react';
import { useSubmit } from "react-router-dom";
import { useEffect } from "react";

import AllApplications from "../components/AllApplications";
import NavBar from "../components/NavBar";
import { getAuthToken, getTokenDuration } from '../utils/auth';
import { getUserId } from '../utils/userId';

function ApplicationsPage() {
  const token = getAuthToken();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post"});
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post"});
    }, tokenDuration);
  }, [token, submit]);
  
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
  const token = getAuthToken();
  const userId = getUserId();

  const applicationData = {
          companyid: companyId,
          positionid: positionId,
          status: applicationStatus,
          senddate: sendDate,
        };

  const response = await fetch("http://localhost:9000/applications/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
    body: JSON.stringify(applicationData)
  });
  if (response.status === 200) {
    window.location.reload();
    return null;
  };
};



