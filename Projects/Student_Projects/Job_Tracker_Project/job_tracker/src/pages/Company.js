import React from 'react';
import { useSubmit } from "react-router-dom";
import { useEffect } from "react";

import Company from "../components/CompanyCard";
import NavBar from "../components/NavBar";
import { getAuthToken, getTokenDuration } from '../utils/auth';
import { getUserId } from '../utils/userId';

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
        <Company />
        </main>
    </div>  
);}

export default CompanyPage;