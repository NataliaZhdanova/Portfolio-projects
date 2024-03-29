// CompaniesPage -> includes -> AllCompanies
// AllCompanies -> is extended by -> NewCompanyCard
// AllCompanies -> CompanyPage -> includes -> CompanyCard
// CompanyCard -> includes -> PositionsForCompanyTable
// CompanyCard -> includes -> ApplicationsForCompanyTable
// CompanyCard -> is extended by -> ModalAddPosition (similar to NewPositionCard)
// CompanyCard -> is extended by -> ModalAddApplication (similar to NewApplicationCard)

import { Form } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import classes from "./CompanyCard.module.css";
import { getAuthToken } from '../utils/auth.js';

import ModalAddPosition from './ModalAddPosition.js';
import ModalAddApplication from './ModalAddApplication.js';
import PositionsForCompanyTable from './PositionsForCompanyTable.js';
import ApplicationsForCompanyTable from './ApplicationsForCompanyTable.js';

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

  const companyId = window.location.pathname.split("/").pop();

// Fetch company data from the server

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:9000/companies/' + companyId, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token, 
        }
      }); 
      const data = await response.json();
      setCompanyData(data[0]);
      console.log(companyData);
      return data;

    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

// Fetch position data from the server

  const fetchPositions = async () => {
    try {  
      const response = await fetch('http://localhost:9000/positions/forcompany/' + companyId, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token, 
        }
      }); 
      const data = await response.json();
      setPositionData(data);
      return data;

    } catch (error) {
      console.error('Error fetching position data:', error);
    }
  };  

// Fetch application data from the server 

  const fetchApplications = async () => {
    try {
       const response = await fetch('http://localhost:9000/applications/forcompany/' + companyId, {
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
  const fetchPositionsRef = useRef(fetchPositions);
  const fetchApplicationsRef = useRef(fetchApplications);

// Fetch data when the component mounts

  useEffect(() => {
    fetchDataRef.current();
    fetchPositionsRef.current();
    fetchApplicationsRef.current();
  }, []);
 
// Update company data

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

// Add new position

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
      console.error('Error adding position:', error);
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
    setEditedCompanyName(companyData.companyname);
    setEditedUrl(companyData.url);
    setEditedBusinessOverview(companyData.businessoverview);
  }

// Handle form submit

  const handleSubmit = async (e) => {
    e.preventDefault();    
    updateCompany(companyData.companyid);
    if (updateCompany) {
      setIsEdited(false);
    }
  }

// Handle form submit and close

  const handleSubmitClose = async (e) => {
    e.preventDefault();    
    updateCompany(companyData.companyid);
    if (updateCompany) {
      setIsEdited(false);
      window.location.replace('/companies')
    }
  }

// Open and close modals for adding positions and applications

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
                
          <div>
            <label htmlFor="companyName">Company Name</label><br/>
            {isEdited === false ? (
              <input type="text" className={classes.notedited} id="companyName" name="companyName" value={companyData.companyname} />
            ) : (
              <input type="text" className={classes.formedited} id="companyName" name="companyName" value={editedCompanyName} onChange={(e) => setEditedCompanyName(e.target.value)} />
            )}
          </div>
          <br/>
          <div>
            <label htmlFor="companyURL">Company URL</label><br/>
            {isEdited === false ? (
              <input type="text" className={classes.notedited} id="companyURL" name="companyURL" value={companyData.url} />
            ) : (
              <input type="text" className={classes.formedited} id="companyURL" name="companyURL" value={editedUrl} onChange={(e) => setEditedUrl(e.target.value)} />
            )}              
          </div>
          <br/>
          <div>
            <label htmlFor="businessOverview">Business Overview</label><br/>
            {isEdited === false ? (
              <textarea className={classes.notedited} id="businessOverview" name="businessOverview" rows="5" cols="140" value={companyData.businessoverview} ></textarea>
            ) : (
              <textarea className={classes.formedited} id="businessOverview" name="businessOverview" rows="5" cols="140" value={editedBusinessOverview} onChange={(e) => setEditedBusinessOverview(e.target.value)} ></textarea>
            )}              
          </div>                    
        </Form>
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
      <br/>
      <div>
        {positionData.length > 0 ? (
          <>
          <div className={classes.tablepositions}>
            <h2 className={classes.tableheader}>Positions</h2>
            <PositionsForCompanyTable data={positionData} />    
            <br/>          
          </div>
          <div>
            <button className={classes.btn} onClick={openModalPosition}>Add new position</button>
            {isModalPositionOpen && <ModalAddPosition callback={addPosition} data={companyData} onClose={closeModalPosition} />}
            <br/>
          </div>
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
            </div>
          )}
          <div>
            <button className={classes.btn} onClick={openModalApplication}>Add new application</button>
              {isModalApplicationOpen && <ModalAddApplication callback={addApplication} positiondata={positionData} onClose={closeModalApplication} />}
            <br/>
          </div>
          </div>
          </>
        ) : (
          <>
          <div className={classes.tablepositions}>
            <h2 className={classes.tableheader}>Positions</h2>
            <p>You don't have any positions for this company. But you could create the first one!</p>
            <br/>
          </div>
          <div>
            <button className={classes.btn} onClick={openModalPosition}>Add new position</button>
            {isModalPositionOpen && <ModalAddPosition callback={addPosition} data={companyData} onClose={closeModalPosition} />}
            <br/>
          </div>
          </>
        )}          
      </div>
    </div>
  );
}
