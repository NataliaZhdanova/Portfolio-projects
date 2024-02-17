import { Form, useSubmit } from 'react-router-dom';
import classes from "./NewCompanyForm.module.css";
import { getUserId } from '../utils/userId';

function NewCompanyForm({ callback, onCancel }) {

    const userId = getUserId();

    const submit = useSubmit();
    
    const handleSubmit = (e) => {
    e.preventDefault();

    const addCompanyData = {
        companyname: e.currentTarget.form.companyName.value,
        url: e.currentTarget.form.companyURL.value,
        businessoverview: e.currentTarget.form.businessOverview.value,
        userid: userId,
    };

    callback(addCompanyData);
 
    submit(e.currentTarget.form);
    e.currentTarget.form.reset(); 
        
    };

    return (
      <div className={classes.addnewform}>
        <h1>Add new Company</h1>
            <Form id="newCompanyForm" className={classes.form}>
            
                <div className="form-control">
                    <label htmlFor="companyName">Company Name:</label><br/>
                    <input type="text" id="companyName" name="companyName" required />
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="companyURL">Company URL:</label><br/>
                    <input type="text" id="companyURL" name="companyURL" required />
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="businessOverview">Business Overview:</label><br/>
                    <textarea id="businessOverview" name="businessOverview" rows="5" cols="140"></textarea>
                </div>
                <br/>
                <button className={classes.btn} type="submit" onClick={handleSubmit}>SAVE</button>
                <button className={classes.btn} onClick={onCancel}>Cancel</button>
            </Form>
            
        </div>
  );
}

export default NewCompanyForm;
