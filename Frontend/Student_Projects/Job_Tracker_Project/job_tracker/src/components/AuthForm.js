import { Form } from 'react-router-dom';

import classes from "./AuthForm.module.css";

function AuthForm() {

  return (
      <div id="login-section">
        
            <Form id="loginForm" action="/auth" method="POST" className={classes.form}>
            <h1>Already registered? Log in!</h1>
                <div className="form-control">
                    <label htmlFor="loginEmail">Email:</label><br/>
                    <input type="email" id="loginEmail" name="loginEmail" required />
                </div>
                <br/>
                <div className="form-control">
                    <label htmlFor="loginPassword">Password:</label><br/>
                    <input type="password" id="loginPassword" name="loginPassword" required />
                </div>
                <br/>
                <button className={classes.btn} type="submit">LOG IN</button>
            </Form>
      </div>
  );
}

export default AuthForm;
