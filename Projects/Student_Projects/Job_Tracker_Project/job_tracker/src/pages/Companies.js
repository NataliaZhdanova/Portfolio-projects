import React from 'react';
import { redirect, useSubmit } from "react-router-dom";
import { useEffect } from "react";

import AllCompanies from "../components/AllCompanies";
import NavBar from "../components/NavBar";
import { getAuthToken, getTokenDuration } from '../utils/auth';
import { getUserId } from '../utils/userId';

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

export async function action({request}) {
  const data = await request.formData();
  const companyName = data.get("companyName");
  const companyURL = data.get("companyURL");
  const businessOverview = data.get("businessOverview");
  const token = getAuthToken();
  const userId = getUserId();

  const companyData = {
          companyname: companyName,
          url: companyURL,
          businessoverview: businessOverview,
          userid: userId,
        };

  const response = await fetch("http://localhost:9000/companies/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token, 
    },
    body: JSON.stringify(companyData)
  });

  if (response.status === 200) {
    return redirect("/companies");
  };
};



