// Opening the "add new" page

const addApplicationBtn = document.getElementById("addNewApplication");
addApplicationBtn.addEventListener("click", () => {
    window.location.href = "/applications/new";
    fetch("/applications/new").catch (error => console.error("Error fetching page:", error));
});

// Fetching all positions to display in the drop-down list

fetch("/positions/all")
.then(response => response.json())
.then(position => {
  const positionDropdown = document.getElementById("positionDropdown");

// Adding options to the drop-down list
  position.forEach(position => {
    const option = document.createElement('option');
    option.value = position.title;
    option.text = position.title;
    option.id = position.positionid;
    positionDropdown.add(option);
  });
})
.catch(error => console.error('Error fetching position names:', error));

// Fetching all applications to display in the drop-down list
fetch("/applications/all")
.then(response => response.json())
.then(application => {
  const applicationDropdown = document.getElementById("applicationDropdown");

  // Add options to the dropdown
  application.forEach(application => {
    const option = document.createElement('option');
    option.value = position.title;
    option.text = position.title;
    option.id = application.applicationid;
    applicationDropdown.add(option);
  });
})
.catch(error => console.error('Error fetching company names:', error));



