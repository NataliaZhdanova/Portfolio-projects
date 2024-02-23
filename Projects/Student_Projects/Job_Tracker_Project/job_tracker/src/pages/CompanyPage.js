import React from 'react';
import { useSubmit } from "react-router-dom";
import { useEffect } from "react";

import CompanyCard from "../components/CompanyCard";
import NavBar from "../components/NavBar";
import { getAuthToken, getTokenDuration } from '../utils/auth';

function CompanyPage() {
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
        <CompanyCard />
        </main>
    </div>  
);}

export default CompanyPage;