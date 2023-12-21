const addCompanyBtn = document.getElementById("addNewCompany");

addCompanyBtn.addEventListener("click", () => {
    window.location.href = "/companies/new";
    fetch("/companies/new").catch (error => console.error("Error fetching page:", error));
});

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


