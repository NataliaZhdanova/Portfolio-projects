import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from "react";

import classes from "./AllCompanies.module.css";
import NewCompanyForm from './NewCompanyCard';

import { getAuthToken } from '../utils/auth.js';
import { getUserId } from '../utils/userId.js';

export default function AllCompanies() {
    const [companyData, setCompanyData] = useState([]);
    const [isAddingCompany, setIsAddingCompany] = useState(false);

    const [editingCompany, setEditingCompany] = useState(null);
    const [editedCompanyName, setEditedCompanyName] = useState('');
    const [editedUrl, setEditedUrl] = useState('');
    const [editedBusinessOverview, setEditedBusinessOverview] = useState('');     

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
        setCompanyData(companyData.map(company => {
          if (company.companyid === companyid) {
            return {
              ...company,
              companyname: editedCompanyName,
              url: editedUrl,
              businessoverview: editedBusinessOverview
            };
          }
          return company;
        }));
        return data;
      } catch (error) {
        console.error('Error updating company:', error);
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
        console.log(data.savedCompany);
        if (response.status === 201) {
        setCompanyData([...companyData, data.savedCompany]);
        setIsAddingCompany(false);
        }
        return data;
      } catch (error) {
        console.error('Error adding company:', error);
      }
    };


    // const addCompany = useCallback(async (companyData) => {
    //   try {
    //     const response = await fetch('http://localhost:9000/companies/new', {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": "Bearer " + token, 
    //       },
    //       body: JSON.stringify(companyData)
    //     });
    //     const data = await response.json();
    //     setCompanyData([...companyData, data]);
    //     return data;
    //   } catch (error) {
    //     console.error('Error adding company:', error);
    //   }
    // }, [companyData]);

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
          <NewCompanyForm callback={addCompany} onCancel={() => setIsAddingCompany(false)} />
          )}
        </div>
      </div>
            
    );
  };
    