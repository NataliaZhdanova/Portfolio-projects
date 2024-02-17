import { Form, useSubmit } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import classes from "./Company.module.css";
import { getAuthToken } from '../utils/auth.js';
import { getUserId } from '../utils/userId.js';

export default function Company() {
    const [companyData, setCompanyData] = useState([]);
    const [formData, setFormData] = useState({});
    const [isEdited, setIsEdited] = useState(false);
    const token = getAuthToken();
    const userId = getUserId();
      
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/companies/' + companyId, {
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

    const fetchDataRef = useRef(fetchData);

    useEffect(() => {
      fetchDataRef.current();
    }, []);

// Set initial form data when company data changes

  useEffect(() => {
    setFormData(companyData);
    setIsEdited(false);
  }, [companyData]);

  // Event handler to update form data on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    setIsEdited(true);
  };

  // Event handler to submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdited) {
      onSave(formData); // Pass updated data to onSave function
    }
  };

    return (
      <div className={classes.companyform}>
        <h1>Company Card</h1>
            <Form id="companyForm"  action="/companies" method="POST" className={classes.form} onSubmit={handleSubmit}>
            
                <div className="form-control">
                    <label htmlFor="companyName">Company Name:</label><br/>
                    <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} required />
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="companyURL">Company URL:</label><br/>
                    <input type="text" id="companyURL" name="companyURL" value={formData.companyURL} onChange={handleInputChange} required />
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="businessOverview">Business Overview:</label><br/>
                    <textarea id="businessOverview" name="businessOverview" rows="5" cols="140" value={formData.businessOverview} onChange={handleInputChange}></textarea>
                </div>
                <br/>
                <button className={classes.btn} type="submit" onClick={handleSubmit}>Save</button>
                <button className={classes.btn} type="submit" onClick={handleSubmitClose}>Save & Close</button>
                <button className={classes.btn} onClick={onCancel}>Close</button>
            </Form>
            
        </div>
  );
}
