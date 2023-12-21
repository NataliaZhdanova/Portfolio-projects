const regNewUserForm = document.getElementById("signupForm");
const signupUsername = document.getElementById("signupUsername");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const saveFeedback = document.getElementById("saveFeedback");

regNewUserForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const username = signupUsername.value;
    const email = signupEmail.value;
    const password = signupPassword.value;
    let json = { username, email, password };
    try {
        const response = await fetch("/auth/register", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(json),
        });

        if (response.status === 200) {
            saveFeedback.innerHTML = "<p>The user is saved successfully!</p>";
            window.location.href = "/auth";
            fetch("/auth").catch (error => console.error("Error fetching page:", error));
        } else if (response.status === 400) {
            saveFeedback.innerHTML = "<p>This user already exists!</p>";

        } else {
            saveFeedback.innerHTML = "<p>The user is not saved. Please try again.</p>";
        }
    } catch (error) {
        console.error("Error during saving:", error.message);
        saveFeedback.innerHTML = "<p>The user is not saved. Please try again.</p>";
    }
});

const loginUserForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

loginUserForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = loginEmail.value;
    const password = loginPassword.value;
    let json = { email, password };
    try {
        const response = await fetch("/auth/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(json),
        });

        if (response.status === 200) {
            saveFeedback.innerHTML = "<p>The user is logged in successfully!</p>";
            window.location.href = "/companies";
            fetch("/companies").catch (error => console.error("Error fetching page:", error));
        } else if (response.status === 401) {
            saveFeedback.innerHTML = "<p>Invalid credentials!</p>";

        } else {
            saveFeedback.innerHTML = "<p>The user is not logged in. Please try again.</p>";
        }
    } catch (error) {
        console.error("Error during saving:", error.message);
        saveFeedback.innerHTML = "<p>The user is not logged in. Please try again.</p>";
    }
});
