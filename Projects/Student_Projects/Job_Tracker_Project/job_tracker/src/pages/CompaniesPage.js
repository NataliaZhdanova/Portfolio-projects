import React from 'react';
import { useSubmit } from "react-router-dom";
import { useEffect } from "react";

import AllCompanies from "../components/AllCompanies";
import NavBar from "../components/NavBar";

import { getAuthToken, getTokenDuration } from '../utils/auth';

function CompaniesPage() {
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
          <AllCompanies />
        </main>
    </div>  
);}

export default CompaniesPage;