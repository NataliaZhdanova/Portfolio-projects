// ApplicationsPage -> includes -> AllApplications
// AllApplications -> is extended by -> NewApplicationCard
// AllApplications -> ApplicationPage -> includes -> ApplicationCard

import { Form, useSubmit } from 'react-router-dom'
import classes from "./NewApplicationForm.module.css";
import { useState, useEffect } from "react";
import { getUserId } from '../utils/userId.js';

function NewApplicationForm({ positionData, callback, onCancel }) {
  const [positions, setPositions] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedStatus, setStatus] = useState("");
  const userId = getUserId();
  const data = positionData;
  const submit = useSubmit();
  
  const handleSubmit = (e) => {
  e.preventDefault();

  const addApplicationData = {
    status: selectedStatus,
    senddate: e.currentTarget.form.submissionDate.value,
    positionid: selectedPosition,
    userid: userId,
  };

  callback(addApplicationData);

  submit(e.currentTarget.form);
  e.currentTarget.form.reset(); 
      
  };
  
// Prepare data to populate company and position dropdowns

  const companyData = [];

  data.forEach(position => {
    const companyId = position.companyid;
    const existingCompany = companyData.find(company => company.companyid === companyId);
    if (!existingCompany) {
        companyData.push({
            companyid: companyId,
            companyname: position.companyname,
            positions: [[ position.positionid, position.title ]]
        });
    } else {
        
        existingCompany.positions.push([ position.positionid, position.title ]);
    }
});

console.log(companyData);

// Update positions dropdown when selected company changes

  useEffect(() => {
    if (selectedCompany) {
      const company = companyData.find(company => company.companyid === selectedCompany);
      setPositions(company.positions);
    } else {
      setPositions([]);
    }
  }, [selectedCompany]);

  const status = ["Applied", "Phone interview", "HR interview", "Technical interview", "CEO interview", "Offer received", "Offer accepted", "Rejected"];


  // Handle company selection change
  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  }; 

  // Handle position selection change
  const handlePositionChange = (event) => {
    setSelectedPosition(event.target.value);
  };

  // Handle status selection change 
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div className={classes.addnewform}>
      <h1>Add new Application</h1>
      <Form id="newApplicationForm" className={classes.form}>
            
        <div>
          <label htmlFor="companyName">Select company</label><br/>
          <select value={selectedCompany} onChange={handleCompanyChange} id="companyName" name="companyName" required>
            <option value="">Select Company</option>
            {companyData.map(company => (
                <option key={company.companyid} value={company.companyid}>{company.companyname}</option>
            ))}
          </select>
        </div>
        <br/>
        <div>
          <label htmlFor="positionTitle">Select position</label><br/>
          <select value={selectedPosition} onChange={handlePositionChange} id="positionTitle" name="positionTitle" required>
            <option value="">Select Position</option>
              {positions.map(position => (
                <option key={position[0]} value={position[0]}>{position[1]}</option>
              ))}
          </select>
        </div>
        <br/>
        <div>
        <label htmlFor="appStatus">Select application status</label><br/>
          <select value={selectedStatus} onChange={handleStatusChange} id="appStatus" name="appStatus" required>
            <option value="">Select application status</option>
              {status.map(element => (
                <option key="appStatus" value={element}>{element}</option>
              ))}
          </select>
        </div>
        <br/>
        <div>
        <label htmlFor="submissionDate">Submission date</label><br/>
        <input type="date" id="submissionDate" name="submissionDate" required />
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

export default NewApplicationForm;
