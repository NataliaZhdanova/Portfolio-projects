// PositionsPage -> includes -> AllPositions
// AllPositions -> is extended by -> NewPositionCard
// AllPositions -> PositionPage -> includes -> PositionCard
// PositionCard -> includes -> ApplicationsTable
// PositionCard -> is extended by -> ModalAddApplication (similar to NewApplicationCard)

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

