import * as React from 'react';
import { useState, useEffect } from "react";
import classes from "./AllCompanies.module.css";
import NewPositionForm from './NewPositionCard';

export default function AllPositions() {
    
    const [positionData, setPositionData] = useState([]);
    const [isAddingPosition, setIsAddingPosition] = useState(false);
  
    useEffect(() => {
      // Fetch position data when the component mounts
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/positions/all'); 
        const data = await response.json();
        setPositionData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const handleAddPositionClick = () => {
      setIsAddingPosition(true);
    };
  
    const handleSaveNewPosition = async () => {
      // Perform logic to save the new company data
      // After saving, reload the entire page
      setIsAddingPosition(false);
      await fetchData(); // Fetch updated data
      window.location.reload(); // Reload the entire page
    };
  
    return (
      <div>
        <h1>Positions</h1>
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Position Title</th>
              <th>Position URL</th>
              <th>Requirements</th>
              <th>Keywords</th>
              <th>Discovery Date</th>
            </tr>
          </thead>
          <tbody>
            {positionData.map((position) => (
              <tr key={position.positionid}>
                <td>{position.companyname}</td>
                <td>{position.title}</td>
                <td>{position.url}</td>
                <td>{position.requirements}</td>
                <td>{position.keywords}</td>
                <td>{position.discoverydate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <div>
        <br></br>      
        <button className={classes.btn} type="button" id="addNewPosition" onClick={handleAddPositionClick}>Add Position</button>
        {isAddingPosition && (
        <NewPositionForm onSave={handleSaveNewPosition} onCancel={() => setIsAddingPosition(false)} />
        )}
      </div>
      </div>
      
      
    );
  };
    