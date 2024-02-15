import * as React from 'react';
import { useState, useEffect, useRef } from "react";
import classes from "./AllCompanies.module.css";
import NewCompanyForm from './NewCompanyCard';
import { getAuthToken } from '../utils/auth.js';
import { fetchData } from '../utils/fetchData.js';

export default function AllCompanies() {
    const [companyData, setCompanyData] = useState([]);
    const [isAddingCompany, setIsAddingCompany] = useState(false);
    const [editingCompany, setEditingCompany] = useState(null);
    const [editedCompanyName, setEditedCompanyName] = useState('');
    const [editedUrl, setEditedUrl] = useState('');
    const [editedBusinessOverview, setEditedBusinessOverview] = useState('');     

    const token = getAuthToken();

// Fetch company data from the database
    
    const getCompanyData = () => {
      fetchData()
      .then(data => {
        setCompanyData(data);
      })
      .catch(error => {
        console.error('Error fetching company data:', error);
      });

    }

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
        getCompanyData();
        return data;
      } catch (error) {
        console.error('Error deleting company:', error);
      }
    };

// Update a company in the database

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
        getCompanyData();
        return data;
      } catch (error) {
        console.error('Error updating company:', error);
      }
    };           

// Use ref to store the function so that it can be called in useEffect

    const fetchDataRef = useRef(getCompanyData);

// Call the function in useEffect

    useEffect(() => {
      fetchDataRef.current();
    }, []);

// Handlers for adding, editing, and deleting companies

    const handleAddCompanyClick = () => {
      setIsAddingCompany(true);
    };

    const handleEditClick = (company) => {
      setEditingCompany(company);
      setEditedCompanyName(company.companyname);
      setEditedUrl(company.url);
      setEditedBusinessOverview(company.businessoverview);
    }

    const handleCancelClick = () => {
      setEditingCompany(null);
    }

    const handleSaveClick = (companyid) => {
      updateCompany(companyid);
      setEditingCompany(null);
    }

    const handleDeleteClick = (companyid) => {
      deleteCompany(companyid);
    }
    
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
                <td>{editingCompany === company ? <input type="text" value={editedCompanyName} onChange={(e) => setEditedCompanyName(e.target.value)} /> : company.companyname}</td>
                <td>{editingCompany === company ? <input type="text" value={editedUrl} onChange={(e) => setEditedUrl(e.target.value)} /> : company.url}</td>
                <td>{editingCompany === company ? <textarea rows="10" cols="50" value={editedBusinessOverview} onChange={(e) => setEditedBusinessOverview(e.target.value)} /> : company.businessoverview}</td>
                <td>
                  {editingCompany === company ? (
                    <>
                      <button onClick={() => handleSaveClick(company.companyid)}>Save</button>
                      <button onClick={handleCancelClick}>Cancel</button>
                    </>
                  ) : (
                    <>
                    <button onClick={() => handleEditClick(company)}>Edit</button>
                    <button onClick={() => handleDeleteClick(company.companyid)}>Delete</button>
                    </>
                  )}
                </td>
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
    