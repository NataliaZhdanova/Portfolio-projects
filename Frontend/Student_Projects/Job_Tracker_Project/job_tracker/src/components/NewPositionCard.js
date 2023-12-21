import React, { useState, useEffect } from 'react';
import { Form } from 'react-router-dom';

import classes from "./NewPositionForm.module.css";

function NewPositionForm({ onCancel }) {
  const [companyData, setCompanyData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    // Fetch company data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:9000/companies/all'); 
      const data = await response.json();
      setCompanyData(data);
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };


return (
      <div className={classes.addnewform}>
        <h1>Add new Position</h1>
            <Form id="newPositionForm"  action="/positions" method="POST" className={classes.form}>
            
                <div className="form-control">
                    <label htmlFor="companyName">Select Company:</label><br/>
                    <select id="companyName" name="companyName" value={selectedOption} onChange={handleOptionChange}>
                    {companyData.map((company) => (
                      <option value={company.companyid}>
                        {company.companyname}
                      </option>
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
                <button className={classes.btn} type="submit">SAVE</button>
                <button className={classes.btn} onClick={onCancel}>Cancel</button>
            </Form>
            
        </div>
  );
}

export default NewPositionForm;

