const addApplicationForm = document.getElementById("addApplicationForm");
const companyDropdown = document.getElementById("companyDropdown");
const positionDropdown = document.getElementById("positionDropdown");
const applicationStatus = document.getElementById("applicationStatus");
const sendDate = document.getElementById("sendDate");
const applicationComments = document.getElementById("applicationComments");
const saveFeedback = document.getElementById("saveFeedback");

// Fetch company names from the server
fetch("/positions/noapp")
.then(response => response.json())
.then(position => {
  const positionDropdown = document.getElementById("positionDropdown");

  // Add options to the dropdown
  position.forEach(position => {
    const option = document.createElement('option');
    option.value = position.title;
    option.text = position.title;
    option.id = position.positionid;
    positionDropdown.add(option);
  });
})
.catch(error => console.error('Error fetching positions:', error));

// Function to handle dropdown change
function handleDropdownChange(dropdown) {
    // Get the selected option
    const selectedOption = dropdown.options[dropdown.selectedIndex];

    // Get the ID from the selected option's value attribute
    const positionId = selectedOption.id;

    // Log or use the companyId as needed
    return positionId;
  }


addApplicationForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const positionid = handleDropdownChange(positionDropdown);
    const status = applicationStatus.value;
    const senddate = sendDate.value;
    const commentstext = applicationComments.value;
    let json = { positionid, status, senddate, commentstext };
    try {
        const response = await fetch("/applications/new", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(json),
        });

        if (response.status === 200) {
            saveFeedback.innerHTML = "<p>The application is saved successfully!</p>";
            window.location.href = "/applications";
            fetch("/applications").catch (error => console.error("Error fetching page:", error));
        } else if (response.status === 400) {
            saveFeedback.innerHTML = "<p>This application already exists!</p>";

        } else {
            saveFeedback.innerHTML = "<p>The application is not saved. Please try again.</p>";
        }
    } catch (error) {
        console.error("Error during saving:", error.message);
        saveFeedback.innerHTML = "<p>The application is not saved. Please try again.</p>";
    }
});



