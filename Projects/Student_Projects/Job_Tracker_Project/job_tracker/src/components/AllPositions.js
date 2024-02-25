import * as React from 'react';
import { useState, useEffect, useRef } from "react";

import classes from "./AllPositions.module.css";
import NewPositionForm from './NewPositionCard';

import { getAuthToken } from '../utils/auth.js';
import { getUserId } from '../utils/userId.js';

export default function AllPositions() {    
    const [positionData, setPositionData] = useState([]);
    const [isAddingPosition, setIsAddingPosition] = useState(false);

    const token = getAuthToken();
    const userId = getUserId();

// Fetch positions data from the database
      
    const fetchData = async () => {
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
        console.error('Error fetching position data:', error);
      }
    };
// Use ref to store the function so that it can be called in useEffect

  const fetchDataRef = useRef(fetchData);

// Call the function in useEffect

    useEffect(() => {
      fetchDataRef.current();
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

const handleDeleteClick = (positionid) => {
  deletePosition(positionid);
}
  
    return (
      <div className={classes.positions}>
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
                <td><a href={`/positions/${position.positionid}`}>{position.title}</a></td>
                <td><a href={`${position.url}`}>{position.url}</a></td>
                <td>{position.requirements}</td>
                <td>{position.keywords}</td>
                <td>{position.discoverydate}</td>
                <td>
                  <button onClick={() => handleDeleteClick(position.positionid)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <div>
        <br></br>      
        <button className={classes.btn} type="button" id="addNewPosition" onClick={handleAddPositionClick}>Add Position</button>
          {isAddingPosition && (
          <NewPositionForm callback={addPosition} onCancel={() => setIsAddingPosition(false)} />
          )}
      </div>
      </div>
      
      
    );
  };
    