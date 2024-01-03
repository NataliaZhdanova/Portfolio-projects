import * as React from 'react';
import { useState, useEffect } from "react";
import classes from "./AllCompanies.module.css";
import NewCompanyForm from './NewCompanyCard';

export default function AllCompanies() {
    const [companyData, setCompanyData] = useState([]);
    const [isAddingCompany, setIsAddingCompany] = useState(false);
  
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

    const handleAddCompanyClick = () => {
      setIsAddingCompany(true);
    };
  
    const handleSaveNewCompany = async () => {
      // Perform logic to save the new company data
      // After saving, reload the entire page
      setIsAddingCompany(false);
      await fetchData(); // Fetch updated data
      window.location.reload(); // Reload the entire page
    };
    
    return (
      <div>
        <h1>Companies</h1>
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Company URL</th>
              <th>Business Overview</th>
            </tr>
          </thead>
          <tbody>
            {companyData.map((company) => (
              <tr key={company.companyid}>
                <td>{company.companyname}</td>
                <td>{company.url}</td>
                <td>{company.businessoverview}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <div>
        <br></br>      
        <button className={classes.btn} type="button" id="addNewCompany" onClick={handleAddCompanyClick}>Add Company</button>
        {isAddingCompany && (
        <NewCompanyForm onSave={handleSaveNewCompany} onCancel={() => setIsAddingCompany(false)} />
        )}
      </div>
      </div>
      
      
    );
  };
    