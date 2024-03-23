// ApplicationsPage -> includes -> AllApplications
// AllApplications -> is extended by -> NewApplicationCard
// AllApplications -> ApplicationPage -> includes -> ApplicationCard

import { Form } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import classes from "./ApplicationCard.module.css";
import { getAuthToken } from '../utils/auth.js';

export default function ApplicationCard() {
  const [applicationData, setApplicationData] = useState([]);

  const [isEdited, setIsEdited] = useState(false); 
  const [editedStatus, setEditedStatus] = useState('');
 
  const token = getAuthToken();
  const applicationId = window.location.pathname.split("/").pop();

// Fetch application data from the server

  const fetchData = async () => {
    try {      
      const response = await fetch('http://localhost:9000/applications/' + applicationId, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token, 
        }
      }); 
      const data = await response.json();
      setApplicationData(data[0]);
      return data;

    } catch (error) {
      console.error('Error fetching application data:', error);
    }
  };  

  // Use ref to keep track of the function references

  const fetchDataRef = useRef(fetchData);

// Fetch data when the component mounts

  useEffect(() => {
    fetchDataRef.current();
  }, []);
 
// Update application data

    const status = ["Applied", "Phone interview", "HR interview", "Technical interview", "CEO interview", "Offer received", "Offer accepted", "Rejected"];

  const updateApplication = async (applicationid) => {
    try {
      
      const response = await fetch('http://localhost:9000/applications/update/' + applicationid, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token, 
        },
        body: JSON.stringify({
          status: editedStatus,
        })
      });
      const data = await response.json();
      setApplicationData(data.updatedApplication[0]);
      return data;

    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

// Handle status selection change 
    const handleStatusChange = (event) => {
        setEditedStatus(event.target.value);
    };

// Handle Edit button click

  const handleEditClick = (e) => {
    setIsEdited(true); 
    setEditedStatus(applicationData.status);
  }

// Handle form submit

  const handleSubmit = async (e) => {
    e.preventDefault();    
    updateApplication(applicationData.applicationid);
    if (updateApplication) {
      setIsEdited(false);
    }
  }

// Handle form submit and close

  const handleSubmitClose = async (e) => {
    e.preventDefault();    
    updateApplication(applicationData.applicationd);
    if (updateApplication) {
      setIsEdited(false);
      window.location.replace('/applications')
    }
  }

  return (
    <div className={classes.applicationpage}>
      <div className={classes.applicationpageheader}>
        <h1 className={classes.applicationh1}>Application Card</h1>
        {isEdited === false ? (
          <button className={classes.editbutton} onClick={handleEditClick}>
            <FontAwesomeIcon icon={faPen} size="xl" color={"#008080"} />
          </button>
        ) : (
          <div className={classes.editingbutton}>
            <FontAwesomeIcon icon={faPen} size="xl" color={"#a7a7a7"} />
          </div>
        )}
      </div>
      <div className={classes.applicationdata}>
        <Form id="companyForm" className={classes.form}>
                
          <div>
            <label htmlFor="positionTitle">Position Title</label><br/>
              <input type="text" className={classes.notedited} id="positionTitle" name="positionTitle" value={applicationData.title} />
          </div>
          <br/>
          <div>
            <label htmlFor="positionURL">Position URL</label><br/>
              <input type="text" className={classes.notedited} id="positionURL" name="positionURL" value={applicationData.url} />                         
          </div>
          <br/>
          <div>
            <label htmlFor="requirements">Application Status</label><br/>
            {isEdited === false ? (
              <input type="text" className={classes.notedited} id="appStatus" name="appStatus" value={applicationData.status} />
            ) : (
                <select value={editedStatus} onChange={handleStatusChange} className={classes.formedited} id="appStatus" name="appStatus" required>
                <option value="">Select application status</option>
                  {status.map(element => (
                    <option key="appStatus" value={element}>{element}</option>
                  ))}
              </select>
            )}              
          </div>
          <br/>
          <div>
            <label htmlFor="submissionDate">Submission Date</label><br/>
            <input type="text" className={classes.notedited} id="submissionDate" name="submissionDate" value={applicationData.senddate} />
       
          </div>       
        </Form>
      </div>
      <div className={classes.cardButtons}>
        {isEdited === false ? (
          <button className={classes.btn} onClick={() => window.location.replace('/applications')}>Back</button>
        ) : (
          <>
            <button className={classes.btn} type="submit" onClick={handleSubmit}>Save</button>
            <button className={classes.btn} type="submit" onClick={handleSubmitClose}>Save & Close</button>
            <button className={classes.btn} onClick={() => window.location.replace('/applications')}>Close without saving</button>
          </>
        )}
      </div>
    </div>
  );
}