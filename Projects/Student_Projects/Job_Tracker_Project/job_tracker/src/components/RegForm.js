// Authentication is handled by the following files:
// /pages/Authentication.js - displays components and sends data to the server
// /components/AuthForm.js - login component, only HTML
// /components/RegForm.js - (this file) - registration component, only HTML
// /backend/server.js - keeps session middleware
// /backend/routes/userRegLog.js - router
// /backend/models/user.js - user model keeps the CRUD DB logic
// /backend/controllers/users.js - keeps the login/registration data processing logic and creates a session

import { Form, useSubmit } from 'react-router-dom';
import classes from "./AuthForm.module.css";

function RegForm() {
  const submit = useSubmit();
  const handleSubmit = (e) => {
    e.preventDefault();
 
    submit(e.currentTarget.form);
    e.currentTarget.form.reset();
  };      
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
                    <input type="password" id="signupPassword" name="signupPassword" required minLength={8} />
                </div>
                <br/>
                <button className={classes.btn} type="submit" onClick={handleSubmit}>SIGN UP</button>
            </Form>
            
        </div>
  );
}

export default RegForm;

