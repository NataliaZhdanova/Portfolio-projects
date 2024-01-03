import { Form } from 'react-router-dom';

import classes from "./NewCompanyForm.module.css";

function NewCompanyForm({ onCancel }) {
  return (
      <div className={classes.addnewform}>
        <h1>Add new Company</h1>
            <Form id="newCompanyForm"  action="/companies" method="POST" className={classes.form}>
            
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
                <button className={classes.btn} type="submit">SAVE</button>
                <button className={classes.btn} onClick={onCancel}>Cancel</button>
            </Form>
            
        </div>
  );
}

export default NewCompanyForm;
