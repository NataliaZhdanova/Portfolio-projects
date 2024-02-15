import React from 'react';
import { useSubmit } from "react-router-dom";
import { useEffect } from "react";

import AllPositions from "../components/AllPositions";
import NavBar from "../components/NavBar";
import { getAuthToken, getTokenDuration } from '../utils/auth';
import { getUserId } from '../utils/userId';

function PositionsPage() {
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
        <AllPositions />
        </main>
    </div>   
  
);}

export default PositionsPage;

export async function action({request}) {
  const data = await request.formData();
  const companyId = data.get("companyName");
  const positionTitle = data.get("positionTitle");
  const positionURL = data.get("positionURL");
  const requirements = data.get("requirements");
  const keywords = data.get("keywords");
  const discoveryDate = data.get("discoveryDate");
  const token = getAuthToken();
  const userId = getUserId();

  const positionData = {
          title: positionTitle,
          url: positionURL,
          requirements: requirements,
          keywords: keywords,
          discoverydate: discoveryDate,
          companyid: companyId,
          userid: userId,
        };

  const response = await fetch("http://localhost:9000/positions/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
    body: JSON.stringify(positionData)
  });

  if (response.status === 200) {
    window.location.reload();
    return null;
  };
};



