import * as React from 'react';
import { useState, useEffect, useRef } from "react";

import classes from "./AllApplications.module.css";
import NewApplicationForm from './NewApplicationCard';

import { getAuthToken } from '../utils/auth.js';
import { getUserId } from '../utils/userId.js';

export default function AllApplications() {    
  const [applicationData, setApplicationData] = useState([]);
  const [isAddingApplication, setIsAddingApplication] = useState(false);

  const token = getAuthToken();
  const userId = getUserId();
      
  const fetchData = async () => {
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

  const fetchDataRef = useRef(fetchData);

// Call the function in useEffect

  useEffect(() => {
    fetchDataRef.current();
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

// Handlers for adding and deleting companies

const handleAddApplicationClick = () => {
  setIsAddingApplication(true);
};

const handleDeleteClick = (applicationid) => {
  deleteApplication(applicationid);
}
    return (
      <div className={classes.applications}>
        <h1>Applications</h1>
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Position Title</th>
              <th>Position URL</th>
              <th>Application Status</th>
              <th>Send Date</th>
            </tr>
          </thead>
          <tbody>
            {applicationData.map((application) => (
              <tr key={application.applicationid}>
                <td>{application.companyname}</td>
                <td><a href={`/applications/${application.applicationid}`}>{application.title}</a></td>
                <td><a href={`${application.url}`}>{application.url}</a></td>
                <td>{application.status}</td>
                <td>{application.senddate}</td>
                <td>
                    <button onClick={() => handleDeleteClick(application.applicationid)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <div>
        <br></br>      
        <button className={classes.btn} type="button" id="addNewApplication" onClick={handleAddApplicationClick}>Add Application</button>
          {isAddingApplication && (
          <NewApplicationForm callback={addApplication} onCancel={() => setIsAddingApplication(false)} />
        )}
      </div>
      </div>
      
      
    );
  };
    