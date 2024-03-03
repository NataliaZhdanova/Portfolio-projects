// CompaniesPage -> includes -> AllCompanies
// AllCompanies -> is extended by -> NewCompanyCard
// Allcompanies -> includes -> CompaniesTable
// AllCompanies -> CompanyPage -> includes -> CompanyCard
// CompanyCard -> includes -> PositionsTable
// CompanyCard -> includes -> ApplicationsTable
// CompanyCard -> is extended by -> ModalAddPosition (similar to NewPositionCard)
// CompanyCard -> is extended by -> ModalAddApplication (similar to NewApplicationCard)
// 

import * as React from 'react';
import { useState, useEffect, useRef } from "react";

import classes from "./AllCompanies.module.css";
import NewCompanyForm from './NewCompanyCard';
import CompaniesTable from './CompaniesTable';

import { getAuthToken } from '../utils/auth.js';
import { getUserId } from '../utils/userId.js'; 

export default function AllCompanies() {
  const [companyData, setCompanyData] = useState([]);
  const [isAddingCompany, setIsAddingCompany] = useState(false);       

  const token = getAuthToken();
  const userId = getUserId();

// Fetch company data from the database
    
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

// Delete a company from the database

  const deleteCompany = async (companyid) => {
    try {
      const response = await fetch('http://localhost:9000/companies/delete/' + companyid, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + token, 
        }
      });
      const data = await response.json();
      setCompanyData(companyData.filter(company => company.companyid !== companyid));
      return data;
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  }; 

// Add a new company to the database

  const addCompany = async (addCompanyData) => {
    try {
      const response = await fetch('http://localhost:9000/companies/new', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token, 
        },
        body: JSON.stringify(addCompanyData)
      });
      const data = await response.json();
      if (response.status === 201) {
      setCompanyData([...companyData, data.savedCompany]);
      setIsAddingCompany(false);
      }
      return data;
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

// Handlers for adding and deleting companies

  const handleAddCompanyClick = () => {
    setIsAddingCompany(true);
  };

   
  return (
      <div className={classes.companies}>
        <h1>Companies</h1>
        <div className={classes.tablecompanies}>
            <CompaniesTable callback={deleteCompany} data={companyData} />    
            <br/>          
        </div>
        <br></br>
        <div>
          <br></br>      
          <button className={classes.btn} type="button" id="addNewCompany" onClick={handleAddCompanyClick}>Add Company</button>
          {isAddingCompany && (
          <NewCompanyForm callback={addCompany} onCancel={() => setIsAddingCompany(false)} />
          )}
        </div>
      </div>
            
    );
  };
    