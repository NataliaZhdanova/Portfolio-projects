// Authentication is handled by the following files:
// /pages/Authentication.js - (this file) - displays components and sends data to the server
// /components/AuthForm.js - login component, only HTML
// /components/RegForm.js - registration component, only HTML
// /backend/server.js - keeps session middleware
// /backend/routes/userRegLog.js - router
// /backend/models/user.js - user model keeps the CRUD DB logic
// /backend/controllers/users.js - keeps the login/registration data processing logic and creates a session

import { redirect, useActionData } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import RegForm from "../components/RegForm";
import classes from "../components/AuthForm.module.css";

// Authentication Page itself assembled from AuthForm and RegForm components

function AuthenticationPage() {
  const data = useActionData();

  return (
    <div>
      {data && <p>{data.error}{data.message}</p>}
      <main className={classes.reglog}>
        <AuthForm />
        <RegForm />
      </main>
    </div>
  
);}

export default AuthenticationPage;

// This function handles the login and registration data processing

export async function action({request}) {
  const data = await request.formData();
  const loginEmail = data.get("loginEmail");
  const loginPassword = data.get("loginPassword");
  const signupUsername = data.get("signupUsername");
  const signupEmail = data.get("signupEmail");
  const signupPassword = data.get("signupPassword");

  if (signupUsername === null) {
        const authData = {
          email: loginEmail,
          password: loginPassword,          
        };
        
        const response = await fetch('http://localhost:9000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(authData),
          credentials: 'include'
        });
        const data = await response.json();

        const token = data.token;
        const userId = data.userId;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem('expiration', expiration.toISOString());
        
        if (response.status === 200) {
            return redirect("/companies");
        } else {
          return data;
        };
        
  } else {
      const regData = {
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
      };

      const response = await fetch('http://localhost:9000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(regData),
        credentials: 'include'
      });

      const data = await response.json()

      return data;

  };
}

