// PositionsPage -> includes -> AllPositions
// AllPositions -> is extended by -> NewPositionCard
// AllPositions -> PositionPage -> includes -> PositionCard
// PositionCard -> includes -> ApplicationsTable
// PositionCard -> is extended by -> ModalAddApplication (similar to NewApplicationCard) 

import { Form, useSubmit } from 'react-router-dom'
import { useState } from "react";
import classes from "./NewPositionForm.module.css";
import { getUserId } from '../utils/userId.js';

function NewPositionForm({ companyData, callback, onCancel }) {
  const [selectedCompany, setSelectedCompany] = useState("");
  const userId = getUserId();
  const data = companyData;
  console.log(data);

  const submit = useSubmit();
  
  const handleSubmit = (e) => {
  e.preventDefault();

  const addPositionData = {
    url: e.currentTarget.form.positionURL.value,
    title: e.currentTarget.form.positionTitle.value,
    requirements: e.currentTarget.form.requirements.value,
    keywords: e.currentTarget.form.keywords.value,
    discoverydate: e.currentTarget.form.discoveryDate.value,
    companyid: selectedCompany,
    userid: userId,
  }; 

  callback(addPositionData);

  submit(e.currentTarget.form);
  e.currentTarget.form.reset(); 
      
  };

  // Handle company selection change
  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  }; 

  return (
    <div className={classes.addnewform}>
      <h1>Add new Position</h1>
      <Form id="newPositionForm" className={classes.form}>
            
        <div>
          <label htmlFor="companyName">Select Company</label><br/>
          <select value={selectedCompany} onChange={handleCompanyChange} id="companyName" name="companyName" required>
          <option value="">Select company</option>
            {data.map((company) => (
              <option key={company.companyid} value={company.companyid}>{company.companyname}</option>
            ))}
          </select>
        </div>
        <br/>
        <div>
          <label htmlFor="positionTitle">Position Title</label><br/>
          <input type="text" id="positionTitle" name="positionTitle" required />
        </div>
        <br/>
        <div>
          <label htmlFor="positionURL">Position URL</label><br/>
          <input type="text" id="positionURL" name="positionURL" required />
        </div>
        <br/>
        <div>
          <label htmlFor="requirements">Requirements</label><br/>
          <textarea id="requirements" name="requirements" rows="5" cols="140"></textarea>
        </div>
        <br/>
        <div>
          <label htmlFor="keywords">Keywords</label><br/>
          <textarea id="keywords" name="keywords" rows="5" cols="140"></textarea>
        </div>
        <br/>
        <div>
          <label htmlFor="discoveryDate">Discovery Date</label><br/>
          <input type="date" id="discoveryDate" name="discoveryDate" required />
        </div>
        <br/>
        <div className={classes.buttons}>
        <button className={classes.btn} onClick={onCancel}>Cancel</button>
        <button className={classes.btn} type="submit" onClick={handleSubmit}>Save</button>
        </div>
      </Form>
            
    </div>
  );
}

export default NewPositionForm;

