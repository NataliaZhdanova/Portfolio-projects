import React, { useState } from "react";
import { Form } from 'react-router-dom'
import classes from "./ModalAddApplication.module.css";

const ModalAddApplication = ({ callback, companydata, positiondata, onClose }) => {
    const positionData = positiondata;
    const companyData = companydata;
    const [selectedOption, setSelectedOption] = useState(null);
    
    const handleSubmit = (e) => {
    e.preventDefault(); 

    const addApplicationData = {        
        status: e.currentTarget.form.applicationStatus.value,
        senddate: e.currentTarget.form.sendDate.value,
        positionid: e.currentTarget.form.positionName.value,
        userid: companyData.userid
    };

    callback(addApplicationData);
         
    };
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };
    

    return (
        <div className={classes.modal}>
        <div className={classes.addnewform}>
        <h1>Add new Application</h1>
            <Form id="newApplicationForm" className={classes.form}>
            
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
                <br/>
                
                <button className={classes.btn} type="submit" onClick={handleSubmit}>SAVE</button>
                <button className={classes.btn} onClick={onClose}>Cancel</button>
            </Form>
            
        </div>
        </div>
        );
    }

export default ModalAddApplication;