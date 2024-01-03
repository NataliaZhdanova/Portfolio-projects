import * as React from 'react';
import { useState, useEffect } from "react";
import classes from "./AllCompanies.module.css";
import NewApplicationForm from './NewApplicationCard';

export default function AllApplications() {
    
    const [applicationData, setApplicationData] = useState([]);
    const [isAddingApplication, setIsAddingApplication] = useState(false);
  
    useEffect(() => {
      // Fetch position data when the component mounts
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/applications/all'); 
        const data = await response.json();
        setApplicationData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const handleAddApplicationClick = () => {
      setIsAddingApplication(true);
    };
  
    const handleSaveNewApplication = async () => {
      // Perform logic to save the new company data
      // After saving, reload the entire page
      setIsAddingApplication(false);
      await fetchData(); // Fetch updated data
      window.location.reload(); // Reload the entire page
    };
  
    return (
      <div>
        <h1>Applications</h1>
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Position Title</th>
              <th>Position URL</th>
              <th>Discovery Date</th>
              <th>Application Status</th>
              <th>Application Send Date</th>
            </tr>
          </thead>
          <tbody>
            {applicationData.map((application) => (
              <tr key={application.applicationid}>
                <td>{application.companyname}</td>
                <td>{application.title}</td>
                <td>{application.url}</td>
                <td>{application.discoverydate}</td>
                <td>{application.status}</td>
                <td>{application.senddate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <div>
        <br></br>      
        <button className={classes.btn} type="button" id="addNewApplication" onClick={handleAddApplicationClick}>Add Application</button>
        {isAddingApplication && (
        <NewApplicationForm onSave={handleSaveNewApplication} onCancel={() => setIsAddingApplication(false)} />
        )}
      </div>
      </div>
      
      
    );
  };
    