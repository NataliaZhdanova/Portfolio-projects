import { Form } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import classes from "./CompanyCard.module.css";
import { getAuthToken } from '../utils/auth.js';
import ModalAddPosition from './ModalAddPosition.js';
import ModalAddApplication from './ModalAddApplication.js';
import PositionsTable from './PositionsTable.js';
import ApplicationsTable from './ApplicationsTable.js';

export default function CompanyCard() {
  const [companyData, setCompanyData] = useState([]);
  const [positionData, setPositionData] = useState([]);
  const [applicationData, setApplicationData] = useState([]);
  const [isEdited, setIsEdited] = useState(false); 
  const [editedCompanyName, setEditedCompanyName] = useState('');
  const [editedUrl, setEditedUrl] = useState('');
  const [editedBusinessOverview, setEditedBusinessOverview] = useState('');
  const [isModalPositionOpen, setIsModalPositionOpen] = useState(false);
  const [isModalApplicationOpen, setIsModalApplicationOpen] = useState(false);
  const token = getAuthToken();
      
  const fetchData = async () => {
    try {
      const companyId = window.location.pathname.split("/").pop();
      const response = await fetch('http://localhost:9000/companies/' + companyId, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token, 
        }
      }); 
      const data = await response.json();
      setCompanyData(data[0]);
      return data

    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

  const fetchPositions = async () => {
    try {
      const companyId = window.location.pathname.split("/").pop();
      const response = await fetch('http://localhost:9000/positions/' + companyId, {
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

  const fetchApplications = async () => {
    try {
      const companyId = window.location.pathname.split("/").pop();
      const response = await fetch('http://localhost:9000/applications/' + companyId, {
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
  
  const fetchDataRef = useRef(fetchData);
  const fetchPositionsRef = useRef(fetchPositions);
  const fetchApplicationsRef = useRef(fetchApplications);   

  useEffect(() => {
    fetchDataRef.current();
    fetchPositionsRef.current();
    fetchApplicationsRef.current();
  }, []);
 
  const updateCompany = async (companyid) => {
    try {
      
      const response = await fetch('http://localhost:9000/companies/update/' + companyid, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token, 
        },
        body: JSON.stringify({
          companyname: editedCompanyName,
          url: editedUrl,
          businessoverview: editedBusinessOverview
        })
      });
      const data = await response.json();
      setCompanyData(data.updatedCompany[0]);
      return data;
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

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
      setIsModalPositionOpen(false);
      }
      return data;
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

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
      console.error('Error adding company:', error);
    }
  };


  const handleEditClick = (e) => {
    setIsEdited(true); 
    setEditedCompanyName(companyData.companyname);
    setEditedUrl(companyData.url);
    setEditedBusinessOverview(companyData.businessoverview);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();    
    updateCompany(companyData.companyid);
    if (updateCompany) {
      setIsEdited(false);
    }
  }

  const handleSubmitClose = async (e) => {
    e.preventDefault();    
    updateCompany(companyData.companyid);
    if (updateCompany) {
      setIsEdited(false);
      window.location.replace('/companies')
    }
  }

  const openModalPosition = () => {
    setIsModalPositionOpen(true);
  };

  const closeModalPosition = () => {
    setIsModalPositionOpen(false);
  };

  const openModalApplication = () => {
    setIsModalApplicationOpen(true);
  };

  const closeModalApplication = () => {
    setIsModalApplicationOpen(false);
  };

  return (
      <div className={classes.companypage}>
        <div className={classes.companypageheader}>
          <h1 className={classes.companyh1}>Company Card</h1>
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
        <div className={classes.companydata}>
          <Form id="companyForm" className={classes.form}>
                
            <div className="form-control">
              <label htmlFor="companyName">Company Name:</label><br/>
              {isEdited === false ? (
                <input type="text" id="companyName" name="companyName" value={companyData.companyname} />
              ) : (
                <input type="text" id="companyName" name="companyName" value={editedCompanyName} onChange={(e) => setEditedCompanyName(e.target.value)} />
              )}
            </div>
            <br/>
            <div className="form-control">
              <label htmlFor="companyURL">Company URL:</label><br/>
              {isEdited === false ? (
                <input type="text" id="companyURL" name="companyURL" value={companyData.url} />
              ) : (
                <input type="text" id="companyURL" name="companyURL" value={editedUrl} onChange={(e) => setEditedUrl(e.target.value)} />
              )}              
            </div>
            <br/>
            <div className="form-control">
              <label htmlFor="businessOverview">Business Overview:</label><br/>
              {isEdited === false ? (
                <textarea id="businessOverview" name="businessOverview" rows="5" cols="140" value={companyData.businessoverview} ></textarea>
              ) : (
                <textarea id="businessOverview" name="businessOverview" rows="5" cols="140" value={editedBusinessOverview} onChange={(e) => setEditedBusinessOverview(e.target.value)} ></textarea>
              )}              
            </div>
                    
          </Form>
          <br/>
        </div>
        <div>
          {positionData.length > 0 ? (
            <div className={classes.tablepositions}>
              <h2>Positions</h2>
              <PositionsTable data={positionData} />    
              <br/>          
            </div>
          ) : (
            <div className={classes.tablepositions}>
              <h2>Positions</h2>
              <p>You don't have any positions for this company. But you could create the first one!</p>
              <br/>
            </div>
          )}
          <div>
            <button className={classes.btn} onClick={openModalPosition}>Add new position</button>
            {isModalPositionOpen && <ModalAddPosition callback={addPosition} data={companyData} onClose={closeModalPosition} />}
            <br/>
          </div>
        </div>
        <div>
          {applicationData.length > 0 ? (
            <div className={classes.tableapplications}>
              <h2>Applications</h2>
              <ApplicationsTable data={applicationData} />    
              <br/>          
            </div>
          ) : (
            <div className={classes.tableapplications}>
              <h2>Applications</h2>
              <p>You don't have any applications for this company. But you could create the first one!</p>
              <br/>
            </div>
          )}
          <div>
            <button className={classes.btn} onClick={openModalApplication}>Add new application</button>
            {isModalApplicationOpen && <ModalAddApplication callback={addApplication} companydata={companyData} positiondata={positionData} onClose={closeModalApplication} />}
            <br/>
          </div>
        </div>
            <div className={classes.cardButtons}>
            {isEdited === false ? (
              <button className={classes.btn} onClick={() => window.location.replace('/companies')}>Back</button>
            ) : (
              <>
                <button className={classes.btn} type="submit" onClick={handleSubmit}>Save</button>
                <button className={classes.btn} type="submit" onClick={handleSubmitClose}>Save & Close</button>
                <button className={classes.btn} onClick={() => window.location.replace('/companies')}>Close without saving</button>
              </>
            )}
            </div>
        </div>
  );
}
