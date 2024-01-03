import React from 'react';
import AllPositions from "../components/AllPositions";
import NavBar from "../components/NavBar";
import { redirect } from "react-router-dom";

function PositionsPage() {
  
 return (
    <div>
        <NavBar />
        <main>
        <AllPositions />
        </main>
    </div>   
  
);}

export default PositionsPage;

export async function action({request}) {
  const data = await request.formData();
  console.log(data);
  const companyId = data.get("companyName");
  const positionTitle = data.get("positionTitle");
  const positionURL = data.get("positionURL");
  const requirements = data.get("requirements");
  const keywords = data.get("keywords");
  const discoveryDate = data.get("discoveryDate");

  const positionData = {
          companyid: companyId,
          title: positionTitle,
          url: positionURL,
          requirements: requirements,
          keywords: keywords,
          discoverydate: discoveryDate,
        };

  const response = await fetch("http://localhost:9000/positions/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(positionData)
  });
  return redirect("/positions");
};



