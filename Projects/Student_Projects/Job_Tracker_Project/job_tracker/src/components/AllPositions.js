import * as React from 'react';
import { useState, useEffect, useRef } from "react";
import classes from "./AllPositions.module.css";
import NewPositionForm from './NewPositionCard';
import { getAuthToken } from '../utils/auth.js';
import { getUserId } from '../utils/userId.js';

export default function AllPositions() {    
    const [positionData, setPositionData] = useState([]);
    const [isAddingPosition, setIsAddingPosition] = useState(false);
    const [editingPosition, setEditingPosition] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedUrl, setEditedUrl] = useState('');
    const [editedRequirements, setEditedRequirements] = useState('');
    const [editedKeywords, setEditedKeywords] = useState('');

    const token = getAuthToken();
    const userId = getUserId();
      
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
        fetchData();
        return data;
      } catch (error) {
        console.error('Error deleting position:', error);
      }
    };

// Update a position in the database

    const updatePosition = async (positionid) => {
      try {
        const response = await fetch('http://localhost:9000/positions/update/' + positionid, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token, 
          },
          body: JSON.stringify({
            title: editedTitle,
            url: editedUrl,
            requirements: editedRequirements,
            keywords: editedKeywords,
          })
        });
        const data = await response.json();
        fetchData();
        return data; 
      } catch (error) {
        console.error('Error updating position:', error);
      }
    }; 

// Use ref to store the function so that it can be called in useEffect

const fetchDataRef = useRef(fetchData);

// Call the function in useEffect

    useEffect(() => {
      fetchDataRef.current();
    }, []);

// Handlers for adding, editing, and deleting positions

    const handleAddPositionClick = () => {
      setIsAddingPosition(true);
    };

    const handleEditClick = (position) => {
      setEditingPosition(position);
      setEditedTitle(position.title);
      setEditedUrl(position.url);
      setEditedRequirements(position.requirements);
      setEditedKeywords(position.keywords);
    }

    const handleCancelClick = () => {
      setEditingPosition(null);
    }

    const handleSaveClick = (positionid) => {
      updatePosition(positionid);
      setEditingPosition(null);
    }

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
                <td>{editingPosition === position ? <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} /> : position.title}</td>
                <td>{editingPosition === position ? <input type="text" value={editedUrl} onChange={(e) => setEditedUrl(e.target.value)} /> : position.url}</td>
                <td>{editingPosition === position ? <textarea rows="10" cols="50" value={editedRequirements} onChange={(e) => setEditedRequirements(e.target.value)} /> : position.requirements}</td>
                <td>{editingPosition === position ? <textarea rows="10" cols="50" value={editedKeywords} onChange={(e) => setEditedKeywords(e.target.value)} /> : position.keywords}</td>
                <td>{position.discoverydate}</td>
                <td>
                  {editingPosition === position ? (
                    <>
                      <button onClick={() => handleSaveClick(position.positionid)}>Save</button>
                      <button onClick={handleCancelClick}>Cancel</button>
                    </>
                  ) : (
                    <>
                    <button onClick={() => handleEditClick(position)}>Edit</button>
                    <button onClick={() => handleDeleteClick(position.positionid)}>Delete</button>
                    </>
                  )}
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
        <NewPositionForm onCancel={() => setIsAddingPosition(false)} />
        )}
      </div>
      </div>
      
      
    );
  };
    