// ApplicationsPage -> is extended by -> NewApplicationCard
// ApplicationsPage -> ApplicationPage -> includes -> ApplicationCard

import { useState, useEffect, useRef } from "react";
import { Form, useSubmit } from 'react-router-dom'
import classes from "./NewApplicationForm.module.css";
import { getAuthToken } from '../utils/auth.js';
import { getUserId } from '../utils/userId.js';

function NewApplicationForm({ onCancel }) {
    const [companyData, setCompanyData] = useState([]);
    const [positionData, setPositionData] = useState([]);
    const token = getAuthToken();
    const userId = getUserId();

    // Fetch all companies from the database

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:9000/companies/all/' + userId, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token, 
        }
      }); 
      const data = await response.json();
      setCompanyData(data);
      return data
     } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

  // Use ref to store the function so that it can be called in useEffect

  const fetchDataRef = useRef(fetchData);

  // Call the function in useEffect
  
  useEffect(() => {
    fetchDataRef.current();
  }, []);


    const submit = useSubmit();
    const handleSubmit = (e) => {
    e.preventDefault();
 
    submit(e.currentTarget.form);
    e.currentTarget.form.reset(); 
  };

    return (
      <div className={classes.addnewform}>
        <h1>Add new Application</h1>
            <Form id="newApplicationForm" className={classes.form}>
            
                <div className="form-control">
                    <label htmlFor="companyName">Company Name:</label><br/>
                    <input type="text" id="companyName" name="companyName" required />
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="companyURL">Company URL:</label><br/>
                    <input type="text" id="companyURL" name="companyURL" required />
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="businessOverview">Business Overview:</label><br/>
                    <textarea id="businessOverview" name="businessOverview" rows="5" cols="140"></textarea>
                </div>
                <br/>
                <button className={classes.btn} type="submit" onClick={handleSubmit}>SAVE</button>
                <button className={classes.btn} onClick={onCancel}>Cancel</button>
            </Form>
            
        </div>
  );
}

export default NewApplicationForm;
