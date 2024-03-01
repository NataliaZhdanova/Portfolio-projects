// PositionsPage -> includes -> AllPositions
// AllPositions -> is extended by -> NewPositionCard
// AllPositions -> PositionPage -> includes -> PositionCard
// PositionCard -> includes -> ApplicationsTable
// PositionCard -> is extended by -> ModalAddApplication (similar to NewApplicationCard)

import React from 'react';
import { useSubmit } from "react-router-dom";
import { useEffect } from "react";

import PositionCard from "../components/PositionCard";
import NavBar from "../components/NavBar";
import { getAuthToken, getTokenDuration } from '../utils/auth';

function PositionPage() {
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
        <PositionCard />
        </main>
    </div>  
);}

export default PositionPage;