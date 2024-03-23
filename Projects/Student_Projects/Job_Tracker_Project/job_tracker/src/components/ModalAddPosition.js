// CompaniesPage -> includes -> AllCompanies
// AllCompanies -> is extended by -> NewCompanyCard
// AllCompanies -> CompanyPage -> includes -> CompanyCard
// CompanyCard -> includes -> PositionsTable
// CompanyCard -> includes -> ApplicationsTable
// CompanyCard -> is extended by -> ModalAddPosition (similar to NewPositionCard)
// CompanyCard -> is extended by -> ModalAddApplication (similar to NewApplicationCard) 

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
        <h1 className={classes.modalheader}>Add new Position</h1>
            <Form id="newPositionForm" className={classes.form}>
            
                <div className="form-control">
                    <label htmlFor="positionTitle">Position Title</label><br/>
                    <input type="text" id="positionTitle" name="positionTitle" required />
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="positionURL">Position URL</label><br/>
                    <input type="text" id="positionURL" name="positionURL" required />
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="requirements">Requirements</label><br/>
                    <textarea id="requirements" name="requirements" rows="5" cols="140"></textarea>
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="keywords">Keywords</label><br/>
                    <textarea id="keywords" name="keywords" rows="5" cols="140"></textarea>
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="discoveryDate">Discovery Date</label><br/>
                    <input type="date" id="discoveryDate" name="discoveryDate" required /><br/><br/>
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

export default ModalAddPosition;