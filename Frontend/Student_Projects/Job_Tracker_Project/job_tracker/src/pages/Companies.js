import React from 'react';
import AllCompanies from "../components/AllCompanies";
import NavBar from "../components/NavBar";
import { redirect } from "react-router-dom";

function CompaniesPage() {
  
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

  const companyData = {
          companyname: companyName,
          url: companyURL,
          businessoverview: businessOverview,
        };

  const response = await fetch("http://localhost:9000/companies/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(companyData)
  });
  return redirect("/companies");
};



