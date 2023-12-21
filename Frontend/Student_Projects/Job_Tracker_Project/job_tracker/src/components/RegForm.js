import { Form } from 'react-router-dom';

import classes from "./AuthForm.module.css";

function RegForm() {

  return (
      <div className={classes.regsection}>
            <Form id="signupForm"  action="/auth" method="POST" className={classes.form}>
            <h1>New to the app? Register!</h1>
                <div className="form-control">
                    <label htmlFor="signupUsername">Username:</label><br/>
                    <input type="text" id="signupUsername" name="signupUsername" required />
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="signupEmail">Email:</label><br/>
                    <input type="email" id="signupEmail" name="signupEmail" required />
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="signupPassword">Password:</label><br/>
                    <input type="password" id="signupPassword" name="signupPassword" required />
                </div>
                <br/>
                <button className={classes.btn} type="submit">SIGN UP</button>
            </Form>
            
        </div>
  );
}

export default RegForm;

