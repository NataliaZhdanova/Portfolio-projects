import AuthForm from "../components/AuthForm";
import RegForm from "../components/RegForm";
import { redirect } from "react-router-dom";

function AuthenticationPage() {
  return (
    <main id="reglog">
      <AuthForm />
      <RegForm />
    </main>
  
);}

export default AuthenticationPage;

export async function action({request}) {
  const data = await request.formData();
  const loginEmail = data.get("loginEmail");
  const loginPassword = data.get("loginPassword");
  const signupUsername = data.get("signupUsername");
  const signupEmail = data.get("signupEmail");
  const signupPassword = data.get("signupPassword");
  console.log(signupUsername);

  if (signupUsername === null) {
        const authData = {
          email: loginEmail,
          password: loginPassword,
        };
        console.log(authData);
        const response = await fetch("http://localhost:9000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(authData)
        });

        return redirect("/positions");
  } else {
      const regData = {
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
      };

      const response = await fetch("http://localhost:9000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(regData)
      });

      return redirect("/auth");
  };
}