// ApplicationsPage -> includes -> AllApplications
// AllApplications -> includes -> ApplicationsTable
// AllApplications -> is extended by -> NewApplicationCard
// AllApplications -> ApplicationPage -> includes -> ApplicationCard 

import * as React from 'react';
import { useState, useEffect, useRef } from "react";

import classes from "./AllApplications.module.css";
import NewApplicationForm from './NewApplicationCard';
import ApplicationsTable from './ApplicationsTable';

import { getAuthToken } from '../utils/auth.js';
import { getUserId } from '../utils/userId.js';

export default function AllApplications() {    
  const [applicationData, setApplicationData] = useState([]);
  const [isAddingApplication, setIsAddingApplication] = useState(false);
  const [positionData, setPositionData] = useState([]);

  const token = getAuthToken();
  const userId = getUserId();

// Fetch positions data from the database for drop-down menus
      
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

// Fetch applications data from the database

  const fetchApplicationsData = async () => {
    try {
      const response = await fetch('http://localhost:9000/applications/all/' + userId, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token, 
        }
      }); 
      const data = await response.json();
      setApplicationData(data);
      return data
    } catch (error) {
      console.error('Error fetching application data:', error);
    }
  };

// Use ref to store the function so that it can be called in useEffect

  const fetchPositionsDataRef = useRef(fetchPositionsData);
  const fetchApplicationsDataRef = useRef(fetchApplicationsData);

// Call the function in useEffect

  useEffect(() => {
    fetchPositionsDataRef.current();
    fetchApplicationsDataRef.current();
  }, []); 

// Delete an application from the database

  const deleteApplication = async (applicationid) => {
    try {
      const response = await fetch('http://localhost:9000/applications/delete/' + applicationid, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + token, 
        }
      }); 
      const data = await response.json();
      setApplicationData(applicationData.filter(application => application.applicationid !== applicationid));
      return data;
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  }; 

// Add a new company to the database

const addApplication = async (addApplicationData) => {
  try {
    const response = await fetch('http://localhost:9000/applications/new', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token, 
      },
      body: JSON.stringify(addApplicationData)
    });
    const data = await response.json();
    if (response.status === 201) {
    setApplicationData([...applicationData, data.savedApplication]);
    setIsAddingApplication(false);
    }
    return data;
  } catch (error) {
    console.error('Error adding application:', error);
  }
};

// Handlers for adding and deleting applications

const handleAddApplicationClick = () => {
  setIsAddingApplication(true);
};

return (
  <div className={classes.applications}>
    <h1>Applications</h1>
    <div className={classes.tableapplications}>
      <ApplicationsTable callback={deleteApplication} data={applicationData} />    
      <br/>          
    </div>
    <div>
      <button className={classes.btn} type="button" id="addNewApplication" onClick={handleAddApplicationClick}>Add Application</button>
      </div> 
          {isAddingApplication && (
            <div className={classes.addapplication}>
            <NewApplicationForm positionData={positionData} callback={addApplication} onCancel={() => setIsAddingApplication(false)} />
            </div>
        )}
      </div>
    
    );
  };
    