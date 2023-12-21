// Opening the "add new" page

const addPositionBtn = document.getElementById("addNewPosition");
addPositionBtn.addEventListener("click", () => {
    window.location.href = "/positions/new";
    fetch("/positions/new").catch (error => console.error("Error fetching page:", error));
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



