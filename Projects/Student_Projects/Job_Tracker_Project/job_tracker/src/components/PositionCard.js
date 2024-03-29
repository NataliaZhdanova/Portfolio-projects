// PositionsPage -> includes -> AllPositions
// AllPositions -> is extended by -> NewPositionCard
// AllPositions -> PositionPage -> includes -> PositionCard
// PositionCard -> includes -> ApplicationsForCompanyTable
// PositionCard -> is extended by -> ModalAddApplication (similar to NewApplicationCard)

import { Form } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import classes from "./PositionCard.module.css";
import { getAuthToken } from '../utils/auth.js';

import ModalAddApplication from './ModalAddApplication.js';
import ApplicationsForCompanyTable from './ApplicationsForCompanyTable.js';

export default function PositionCard() {
  const [positionData, setPositionData] = useState([]);
  const [positionArrData, setPositionArrData] = useState([]);
  const [applicationData, setApplicationData] = useState([]);

  const [isEdited, setIsEdited] = useState(false); 
  const [editedPositionTitle, setEditedPositionTitle] = useState('');
  const [editedPositionUrl, setEditedPositionUrl] = useState('');
  const [editedRequirements, setEditedRequirements] = useState('');
  const [editedKeywords, setEditedKeywords] = useState('');

  const [isModalApplicationOpen, setIsModalApplicationOpen] = useState(false);
  
  const token = getAuthToken();
  const positionId = window.location.pathname.split("/").pop();

// Fetch position data from the server

  const fetchData = async () => {
    try {      
      const response = await fetch('http://localhost:9000/positions/' + positionId, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token, 
        }
      }); 
      const data = await response.json();
      setPositionData(data[0]);
      setPositionArrData(data);
      return data;

    } catch (error) {
      console.error('Error fetching position data:', error);
    }
  };  

// Fetch application data from the server

  const fetchApplications = async () => {
    try {
      const response = await fetch('http://localhost:9000/applications/forposition/' + positionId, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token, 
        }
      }); 
      const data = await response.json();
      setApplicationData(data);
      return data;

    } catch (error) {
      console.error('Error fetching application data:', error);
    }
  };
  
  // Use ref to keep track of the function references

  const fetchDataRef = useRef(fetchData);
  const fetchApplicationsRef = useRef(fetchApplications);

// Fetch data when the component mounts

  useEffect(() => {
    fetchDataRef.current();
    fetchApplicationsRef.current();
  }, []);
 
// Update position data

  const updatePosition = async (positionid) => {
    try {
      
      const response = await fetch('http://localhost:9000/positions/update/' + positionid, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token, 
        },
        body: JSON.stringify({
          title: editedPositionTitle,
          url: editedPositionUrl,
          requirements: editedRequirements,
          keywords: editedKeywords,
        })
      });
      const data = await response.json();
      setPositionData(data.updatedPosition[0]);
      return data;

    } catch (error) {
      console.error('Error updating position:', error);
    }
  };

// Add new application

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
      setIsModalApplicationOpen(false);
      }
      return data;

    } catch (error) {
      console.error('Error adding application:', error);
    }
  };

// Handle Edit button click

  const handleEditClick = (e) => {
    setIsEdited(true); 
    setEditedPositionTitle(positionData.title);
    setEditedPositionUrl(positionData.url);
    setEditedRequirements(positionData.requirements);
    setEditedKeywords(positionData.keywords);
  }

// Handle form submit

  const handleSubmit = async (e) => {
    e.preventDefault();    
    updatePosition(positionData.positionid);
    if (updatePosition) {
      setIsEdited(false);
    }
  }

// Handle form submit and close

  const handleSubmitClose = async (e) => {
    e.preventDefault();    
    updatePosition(positionData.positionid);
    if (updatePosition) {
      setIsEdited(false);
      window.location.replace('/positions')
    }
  }

// Open and close modals for adding positions and applications

  const openModalApplication = () => {
    setIsModalApplicationOpen(true);
    console.log(positionData);
  };

  const closeModalApplication = () => {
    setIsModalApplicationOpen(false);
  };

  return (
    <div className={classes.positionpage}>
      <div className={classes.positionpageheader}>
        <h1 className={classes.positionh1}>Position Card</h1>
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
      <div className={classes.positiondata}>
        <Form id="companyForm" className={classes.form}>
                
          <div>
            <label htmlFor="positionTitle">Position Title</label><br/>
            {isEdited === false ? (
              <input type="text" className={classes.notedited} id="positionTitle" name="positionTitle" value={positionData.title} />
            ) : (
              <input type="text" className={classes.formedited} id="positionTitle" name="positionTitle" value={editedPositionTitle} onChange={(e) => setEditedPositionTitle(e.target.value)} />
            )}
          </div>
          <br/>
          <div>
            <label htmlFor="positionURL">Position URL</label><br/>
            {isEdited === false ? (
              <input type="text" className={classes.notedited} id="positionURL" name="positionURL" value={positionData.url} />
            ) : (
              <input type="text" className={classes.formedited} id="positionURL" name="positionURL" value={editedPositionUrl} onChange={(e) => setEditedPositionUrl(e.target.value)} />
            )}              
          </div>
          <br/>
          <div>
            <label htmlFor="requirements">Requirements</label><br/>
            {isEdited === false ? (
              <textarea className={classes.notedited} id="requirements" name="requirements" rows="5" cols="140" value={positionData.requirements} ></textarea>
            ) : (
              <textarea className={classes.formedited} id="requirements" name="requirements" rows="5" cols="140" value={editedRequirements} onChange={(e) => setEditedRequirements(e.target.value)} ></textarea>
            )}              
          </div>
          <br/>
          <div>
            <label htmlFor="keywords">Keywords</label><br/>
            {isEdited === false ? (
              <textarea className={classes.notedited} id="keywords" name="keywords" rows="5" cols="140" value={positionData.keywords} ></textarea>
            ) : (
              <textarea className={classes.formedited} id="keywords" name="keywords" rows="5" cols="140" value={editedKeywords} onChange={(e) => setEditedKeywords(e.target.value)} ></textarea>
            )}              
          </div>                    
        </Form>
      </div>
      <div className={classes.cardButtons}>
        {isEdited === false ? (
          <button className={classes.btn} onClick={() => window.location.replace('/positions')}>Back</button>
        ) : (
          <>
            <button className={classes.btn} type="submit" onClick={handleSubmit}>Save</button>
            <button className={classes.btn} type="submit" onClick={handleSubmitClose}>Save & Close</button>
            <button className={classes.btn} onClick={() => window.location.replace('/positions')}>Close without saving</button>
          </>
        )}
      </div>
      <br/>
      <div>
          {applicationData.length > 0 ? (
            <div className={classes.tableapplications}>
              <h2 className={classes.tableheader}>Applications</h2>
              <ApplicationsForCompanyTable data={applicationData} />    
              <br/>          
            </div>
          ) : (
            <div className={classes.tableapplications}>
              <h2 className={classes.tableheader}>Applications</h2>
              <p>You haven't applied for any positions in this company.</p>
              <br/>
              <button className={classes.btn} onClick={openModalApplication}>Add new application</button>
              {isModalApplicationOpen && <ModalAddApplication callback={addApplication} positiondata={positionArrData} onClose={closeModalApplication} />}
            <br/>
            </div>
          )} 
        
      </div>
      <br/>
      
    </div>
  );
}