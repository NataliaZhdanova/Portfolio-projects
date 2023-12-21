const addNewCompanyForm = document.getElementById("add-new-company");
const companyName = document.getElementById("companyName");
const companyURL = document.getElementById("companyURL");
const isStartup = document.getElementById("isStartup");
const businessOverview = document.getElementById("businessOverview");
const saveFeedback = document.getElementById("saveFeedback");

addNewCompanyForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const companyname = companyName.value;
    const url = companyURL.value;
    const startup = isStartup.value;
    const businessoverview = businessOverview.value;
    let json = { companyname, url, startup, businessoverview };
    try {
        const response = await fetch("/companies/new", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(json),
        });

        if (response.status === 200) {
            saveFeedback.innerHTML = "<p>The company is saved successfully!</p>";
            window.location.href = "/companies";
            fetch("/companies").catch (error => console.error("Error fetching page:", error));
        } else if (response.status === 400) {
            saveFeedback.innerHTML = "<p>This company already exists!</p>";

        } else {
            saveFeedback.innerHTML = "<p>The company is not saved. Please try again.</p>";
        }
    } catch (error) {
        console.error("Error during saving:", error.message);
        saveFeedback.innerHTML = "<p>The company is not saved. Please try again.</p>";
    }
});
