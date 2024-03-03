// PositionsPage -> includes -> AllPositions
// AllPositions -> includes -> PositionsTable
// AllPositions -> is extended by -> NewPositionCard
// AllPositions -> PositionPage -> includes -> PositionCard
// PositionCard -> includes -> ApplicationsTable
// PositionCard -> is extended by -> ModalAddApplication (similar to NewApplicationCard)

import * as React from 'react';
import { useState, useEffect, useRef } from "react";

import classes from "./AllPositions.module.css";
import NewPositionForm from './NewPositionCard';
import PositionsTable from './PositionsTable';

import { getAuthToken } from '../utils/auth.js';
import { getUserId } from '../utils/userId.js';

export default function AllPositions() {    
  const [positionData, setPositionData] = useState([]);
  const [isAddingPosition, setIsAddingPosition] = useState(false);
  const [companyData, setCompanyData] = useState([]);

  const token = getAuthToken();
  const userId = getUserId();


// Fetch all companies from the database for the drop-down menu

  const fetchCompaniesData = async () => {
    try {
      const response = await fetch('http://localhost:9000/companies/all/' + userId, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token, 
        }
      }); 
      const data = await response.json();
      setCompanyData(data);
      return data
     } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

// Fetch positions data from the database
      
  const fetchPositionsData = async () => {
    try {
      const response = await fetch('http://localhost:9000/positions/all/' + userId, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token, 
        }
      }); 
      const data = await response.json();
      setPositionData(data);
      return data
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };

// Use ref to store the function so that it can be called in useEffect
  const fetchCompaniesDataRef = useRef(fetchCompaniesData);
  const fetchPositionsDataRef = useRef(fetchPositionsData);

// Call the function in useEffect

  useEffect(() => {
    fetchCompaniesDataRef.current();
    fetchPositionsDataRef.current();
  }, []);

// Delete a position from the database

  const deletePosition = async (positionid) => {
    try {
      const response = await fetch('http://localhost:9000/positions/delete/' + positionid, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + token, 
        }
      });
      const data = await response.json();
      setPositionData(positionData.filter(position => position.positionid !== positionid));
      return data;
    } catch (error) {
      console.error('Error deleting position:', error);
    }
  };

// Add a new position to the database 

  const addPosition = async (addPositionData) => {
    try {
      const response = await fetch('http://localhost:9000/positions/new', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token, 
        },
        body: JSON.stringify(addPositionData)
      });
      const data = await response.json();
      if (response.status === 201) {
      setPositionData([...positionData, data.savedPosition]);
      setIsAddingPosition(false);
      }
      return data;
    } catch (error) {
      console.error('Error adding position:', error);
    }
  };

// Handlers for adding and deleting positions 

  const handleAddPositionClick = () => {
    setIsAddingPosition(true);
  };

  return (
      <div className={classes.positions}>
        <h1>Positions</h1>
        <div className={classes.tablepositions}>
          <PositionsTable callback={deletePosition} data={positionData} />    
          <br/>          
        </div>
        <br></br>
        <div>
        <br></br>      
        <button className={classes.btn} type="button" id="addNewPosition" onClick={handleAddPositionClick}>Add Position</button>
          {isAddingPosition && (
          <NewPositionForm companyData={companyData} callback={addPosition} onCancel={() => setIsAddingPosition(false)} />
          )}
      </div>
      </div>
      
      
    );
  };
    