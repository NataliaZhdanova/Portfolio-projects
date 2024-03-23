// CompaniesPage -> includes -> AllCompanies
// AllCompanies -> is extended by -> NewCompanyCard
// AllCompanies -> CompanyPage -> includes -> CompanyCard
// CompanyCard -> includes -> PositionsTable
// CompanyCard -> includes -> ApplicationsTable
// CompanyCard -> is extended by -> ModalAddPosition (similar to NewPositionCard)
// CompanyCard -> is extended by -> ModalAddApplication (similar to NewApplicationCard)

// PositionCard -> is extended by -> ModalAddApplication (similar to NewApplicationCard)

import React, { useState } from "react";
import { Form } from 'react-router-dom'
import classes from "./ModalAddApplication.module.css";
import { getUserId } from '../utils/userId.js'; 

const ModalAddApplication = ({ callback, positiondata, onClose }) => {
    const [selectedStatus, setStatus] = useState("");
    const [selectedPosition, setSelectedPosition] = useState("");
    const positionData = positiondata;
    const userId = getUserId();

    const status = ["Applied", "Phone interview", "HR interview", "Technical interview", "CEO interview", "Offer received", "Offer accepted", "Rejected"];
    
    const handleSubmit = (e) => {
    e.preventDefault(); 

    const addApplicationData = {        
        status: selectedStatus,
        senddate: e.currentTarget.form.submissionDate.value,
        positionid: selectedPosition,
        userid: userId,
    };

    callback(addApplicationData);
         
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
        <div className={classes.modal}>
        <div className={classes.addnewform}>
        <h1 className={classes.modalheader}>Add new Application</h1>
            <Form id="newApplicationForm" className={classes.form}>
            
                <div className="form-control">
                    <label htmlFor="positionTitle">Select Position</label><br/>
                    <select value={selectedPosition} onChange={handlePositionChange} id="positionTitle" name="positionTitle" required>
                    <option value="">Select Position</option>
                        {positionData.map((position) => (
                        <option key={position.positionid} value={position.positionid}>{position.title}</option>
                        ))}
                    </select>
                </div>
                <br/>

                <div className="form-control">
                    <label htmlFor="appStatus">Select application status</label><br/>
                    <select value={selectedStatus} onChange={handleStatusChange} id="appStatus" name="appStatus" required>
                        <option key="appStatus" value="">Select application status</option>
                        {status.map(element => (
                            <option value={element}>{element}</option>
                        ))}
                    </select>
                </div>
                <br/>

                <div className="form-control">
                    <label htmlFor="submissionDate">Application Send Date</label><br/>
                    <input type="date" id="submissionDate" name="submissionDate" required /><br/><br/>
                </div>
                <br/>
                <div className={classes.buttons}>
                    <button className={classes.btncancel} onClick={onClose}>Cancel</button>
                    <button className={classes.btnsave} type="submit" onClick={handleSubmit}>Save</button>
                </div>  
            </Form>
            
        </div>
        </div>
        );
    }

export default ModalAddApplication;