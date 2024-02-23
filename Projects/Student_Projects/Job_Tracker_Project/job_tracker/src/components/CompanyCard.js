import { Form } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import classes from "./CompanyCard.module.css";
import { getAuthToken } from '../utils/auth.js';
import ModalAddPosition from './ModalAddPosition.js';
import PositionsTable from './PositionsTable.js';
// import ApplicationsTable from './ApplicationsTable.js';

export default function CompanyCard() {
  const [companyData, setCompanyData] = useState([]);
  const [positionsData, setPositionsData] = useState([]);
  // const [applicationsData, setApplicationsData] = useState([]);
  const [isEdited, setIsEdited] = useState(false); 
  const [editedCompanyName, setEditedCompanyName] = useState('');
  const [editedUrl, setEditedUrl] = useState('');
  const [editedBusinessOverview, setEditedBusinessOverview] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const fetchDataRef = useRef(fetchData);    

  useEffect(() => {
    fetchDataRef.current();
  }, []);

  const fetchPositions = async () => {
    try {
      const companyId = window.location.pathname.split("/").pop();
      const response = await fetch('http://localhost:9000/positions/all/' + companyId, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token, 
        }
      }); 
      const data = await response.json();
      setPositionsData(data);
      return data
    } catch (error) {
      console.error('Error fetching position data:', error);
    }
  };  
  
  const fetchPositionsRef = useRef(fetchPositions);

  useEffect(() => {
    fetchPositionsRef.current();
  }, []);

//   const fetchApplications = async () => {
//     try {
//       const companyId = window.location.pathname.split("/").pop();
//       const response = await fetch('http://localhost:9000/applications/all/' + companyId, {
//         method: "GET",
//         headers: {
//           "Authorization": "Bearer " + token, 
//         }
//       }); 
//       const data = await response.json();
//       setApplicationsData(data);
//       return data
//      } catch (error) {
//       console.error('Error fetching position data:', error);
//     }
//   };  

// const fetchApplicationsRef = useRef(fetchApplications);

// useEffect(() => {
//   fetchApplicationsRef.current();
// }, []);

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
      setPositionsData([...positionsData, data.savedPosition]);
      setIsModalOpen(false);
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          {positionsData.length > 0 ? (
            <div className={classes.tablepositions}>
              <h2>Positions</h2>
              <PositionsTable data={positionsData} />    
              <br/>          
            </div>
          ) : (
            <div className={classes.tablepositions}>
              <h2>Positions</h2>
              <p>You don't have any positions for this company. Bur you can start creating the first one!</p>
              <br/>
            </div>
          )}
          <div>
            <button className={classes.btn} onClick={openModal}>Add new position</button>
            {isModalOpen && <ModalAddPosition callback={addPosition} data={companyData} onClose={closeModal} />}
            <br/>
          </div>
        </div>

            {/* 
            <div className={classes.tableapplications}>
                <h2>Applications</h2>                              
                <ApplicationsTable data={positionsData} />  
            </div> */}
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
