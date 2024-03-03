// ApplicationsPage -> includes -> AllApplications
// AllApplications -> is extended by -> NewApplicationCard
// AllApplications -> ApplicationPage -> includes -> ApplicationCard

import React from 'react';
import { useSubmit } from "react-router-dom";
import { useEffect } from "react";

import ApplicationCard from "../components/ApplicationCard";
import NavBar from "../components/NavBar";
import { getAuthToken, getTokenDuration } from '../utils/auth';

function ApplicationPage() {
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
        <ApplicationCard />
        </main>
    </div>  
);}

export default ApplicationPage;