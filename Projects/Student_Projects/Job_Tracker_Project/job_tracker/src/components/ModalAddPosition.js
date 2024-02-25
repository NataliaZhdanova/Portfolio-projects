import { Form } from 'react-router-dom'
import classes from "./ModalAddPosition.module.css";

const ModalAddPosition = ({ callback, data, onClose }) => {
    const companyData = data;
    
    const handleSubmit = (e) => {
    e.preventDefault();

    const addPositionData = {        
        url: e.currentTarget.form.positionURL.value,
        title: e.currentTarget.form.positionTitle.value,
        requirements: e.currentTarget.form.requirements.value,
        keywords: e.currentTarget.form.keywords.value,
        discoverydate: e.currentTarget.form.discoveryDate.value,
        companyid: companyData.companyid,
        userid: companyData.userid
    };

    callback(addPositionData);
         
    };
    return (
        <div className={classes.modal}>
        <div className={classes.addnewform}>
        <h1>Add new Position</h1>
            <Form id="newPositionForm" className={classes.form}>
            
                <div className="form-control">
                    <label htmlFor="positionTitle">Position Title:</label><br/>
                    <input type="text" id="positionTitle" name="positionTitle" required />
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="positionURL">Position URL:</label><br/>
                    <input type="text" id="positionURL" name="positionURL" required />
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="requirements">Requirements:</label><br/>
                    <textarea id="requirements" name="requirements" rows="5" cols="140"></textarea>
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="keywords">Keywords:</label><br/>
                    <textarea id="keywords" name="keywords" rows="5" cols="140"></textarea>
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="discoveryDate">Discovery Date:</label><br/>
                    <input type="text" id="discoveryDate" name="discoveryDate" required /><br/><br/>
                </div>
                <button className={classes.btn} type="submit" onClick={handleSubmit}>SAVE</button>
                <button className={classes.btn} onClick={onClose}>Cancel</button>
            </Form>
            
        </div>
        </div>
        );
    }

export default ModalAddPosition;