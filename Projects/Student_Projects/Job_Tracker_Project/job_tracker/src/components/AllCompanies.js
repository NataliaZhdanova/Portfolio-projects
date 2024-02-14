import * as React from 'react';
import { useState, useEffect, useRef } from "react";
import classes from "./AllCompanies.module.css";
import NewCompanyForm from './NewCompanyCard';
import { getAuthToken } from '../utils/auth.js';
import { getUserId } from '../utils/userId.js';

export default function AllCompanies() {
    const [companyData, setCompanyData] = useState([]);
    const [isAddingCompany, setIsAddingCompany] = useState(false);
    const token = getAuthToken();
    const userId = getUserId();
    let url = 'http://localhost:9000/companies/all/' + userId

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
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

    const handleAddCompanyClick = () => {
      setIsAddingCompany(true);
    };
  
 
    return (
      <div className={classes.companies}>
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
        <NewCompanyForm onCancel={() => setIsAddingCompany(false)} />
        )}
      </div>
      </div>
      
      
    );
  };
    