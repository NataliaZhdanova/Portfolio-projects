import React, { useState, useEffect } from 'react';
import { Form } from 'react-router-dom';

import classes from "./NewPositionForm.module.css";

function NewApplicationForm({ onCancel }) {
  const [companyData, setCompanyData] = useState([]);
  const [positionData, setPositionData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    // Fetch company data when the component mounts
    fetchCompanyData();
    fetchPositionData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      const response = await fetch('http://localhost:9000/companies/all'); 
      const data = await response.json();
      setCompanyData(data);
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

  const fetchPositionData = async () => {
    try {
      const response = await fetch('http://localhost:9000/positions/all'); 
      const data = await response.json();
      setPositionData(data);
    } catch (error) {
      console.error('Error fetching position data:', error);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };


return (
      <div className={classes.addnewform}>
        <h1>Add new Application</h1>
            <Form id="newApplicationForm"  action="/applications" method="POST" className={classes.form}>
            
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
                    <label htmlFor="positionName">Select Position:</label><br/>
                    <select id="positionName" name="positionName" value={selectedOption} onChange={handleOptionChange}>
                    {positionData.map((position) => (
                      <option value={position.positionid}>
                        {position.title}
                      </option>
                    ))}
                    </select>
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="applicationStatus">Application Status:</label><br/>
                    <select id="applicationStatus" name="applicationStatus" value={selectedOption} onChange={handleOptionChange}>
                        <option value="Sent">Sent</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Phone Interview">Phone Interview</option>
                        <option value="HR Interview">HR Interview</option>
                        <option value="Technical Interview">Technical Interview</option>
                        <option value="CEO Interview">CEO Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Offer Accepted">Offer Accepted</option>
                    </select>
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="sendDate">Application Send Date:</label><br/>
                    <input type="text" id="sendDate" name="sendDate" required /><br/><br/>
                </div>
                <button className={classes.btn} type="submit">SAVE</button>
                <button className={classes.btn} onClick={onCancel}>Cancel</button>
            </Form>
            
        </div>
  );
}

export default NewApplicationForm;

