import { useState, useEffect, useRef } from "react";
import { Form, useSubmit } from 'react-router-dom'
import classes from "./NewPositionForm.module.css";
import { getAuthToken } from '../utils/auth.js';
import { getUserId } from '../utils/userId.js';

function NewPositionForm({ onCancel }) {
  const [companyData, setCompanyData] = useState([]);
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
        <h1>Add new Position</h1>
            <Form id="newPositionForm"  action="/positions" method="POST" className={classes.form}>
            
                <div className="form-control">
                    <label htmlFor="companyName">Select Company:</label><br/>
                    <select id="companyName" name="companyName" required>
                        {companyData.map((company) => (
                            <option key={company.companyid} value={company.companyid}>{company.companyname}</option>
                        ))}
                    </select>
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="positionTitle">Position Title:</label><br/>
                    <input type="text" id="positionTitle" name="positionTitle" required />
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="positionURL">Company URL:</label><br/>
                    <input type="text" id="positionURL" name="positionURL" required />
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="requirements">Requirements:</label><br/>
                    <textarea id="requirements" name="requirements" rows="5" cols="140"></textarea>
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="keywords">Keywords:</label><br/>
                    <textarea id="keywords" name="keywords" rows="5" cols="140"></textarea>
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="discoveryDate">Discovery Date:</label><br/>
                    <input type="text" id="discoveryDate" name="discoveryDate" required /><br/><br/>
                </div>
                <button className={classes.btn} type="submit" onClick={handleSubmit}>SAVE</button>
                <button className={classes.btn} onClick={onCancel}>Cancel</button>
            </Form>
            
        </div>
  );
}

export default NewPositionForm;

