const addPositionForm = document.getElementById("addPositionForm");
const companyDropdown = document.getElementById("companyDropdown");
const positionName = document.getElementById("positionName");
const positionURL = document.getElementById("positionURL");
const requirementsField = document.getElementById("requirements");
const keywordsField = document.getElementById("keywords");
const discoveryDate = document.getElementById("discoveryDate");
const saveFeedback = document.getElementById("saveFeedback");

// Fetch company names from the server
fetch("/companies/all")
.then(response => response.json())
.then(company => {
  const companyDropdown = document.getElementById("companyDropdown");

  // Add options to the dropdown
  company.forEach(company => {
    const option = document.createElement('option');
    option.value = company.companyname;
    option.text = company.companyname;
    option.id = company.companyid;
    companyDropdown.add(option);
  });
})
.catch(error => console.error('Error fetching company names:', error));

// Function to handle dropdown change
function handleDropdownChange(dropdown) {
    // Get the selected option
    const selectedOption = dropdown.options[dropdown.selectedIndex];

    // Get the ID from the selected option's value attribute
    const companyId = selectedOption.id;

    // Log or use the companyId as needed
    return companyId;
  }


addPositionForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const companyid = handleDropdownChange(companyDropdown);
    const title = positionName.value;
    const url = positionURL.value;
    const requirements = requirementsField.value;
    const keywords = keywordsField.value;
    const discoverydate = discoveryDate.value
    let json = { companyid, title, url, requirements, keywords, discoverydate };
    try {
        const response = await fetch("/positions/new", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(json),
        });

        if (response.status === 200) {
            saveFeedback.innerHTML = "<p>The position is saved successfully!</p>";
            window.location.href = "/positions";
            fetch("/positions").catch (error => console.error("Error fetching page:", error));
        } else if (response.status === 400) {
            saveFeedback.innerHTML = "<p>This position already exists!</p>";

        } else {
            saveFeedback.innerHTML = "<p>The position is not saved. Please try again.</p>";
        }
    } catch (error) {
        console.error("Error during saving:", error.message);
        saveFeedback.innerHTML = "<p>The position is not saved. Please try again.</p>";
    }
});



