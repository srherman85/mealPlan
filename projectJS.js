// Add an event listener to the form submit button:
document.getElementById("mealPlanForm").addEventListener("submit", function(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Meal plan variables
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const meals = ['Breakfast', 'Snack1', 'Lunch', 'Snack2', 'Dinner'];

  // Create HTML Elements
  const displayTable = document.createElement("table");

  const displayTableHeaderRow = document.createElement("tr");
  displayTableHeaderRow.innerHTML = `<th>Day</th>${meals.map(meal => `<th>${meal}</th>`).join("")}`;
  displayTable.appendChild(displayTableHeaderRow);

  // Assign mealPlan variables
  daysOfWeek.forEach(day => {
    // Create row
    const row = document.createElement("tr");
    
    // Add the day of Week
    const dayCell = document.createElement("td");
    dayCell.textContent = day;
    row.appendChild(dayCell);

    // Add meals for each day
    meals.forEach(meal => {
      const inputName = `${day.toLowerCase()}${meal.replace(/\s+/g, "")}`;
      const inputValue = document.querySelector(`input[name="${inputName}"]`).value || "N/A";
      const cell = document.createElement("td");
      cell.textContent = inputValue;
      row.appendChild(cell);
    });
    displayTable.appendChild(row);
  });

  // Open new popup window
  var flyWindow = window.open('about:blank','myPop','width=1000,height=500,left=200,top=200');

  // Add contents of form to popup window
  if (flyWindow) {
    // Add HTML content to the popup window
    flyWindow.document.write('<!DOCTYPE html>');
    flyWindow.document.write('<html lang="en">');
    flyWindow.document.write('<head><title>Meal Plan</title></head>');
    flyWindow.document.write('<body>');
    flyWindow.document.write('<h1>Meal Plan</p>');
    // Display the table
    flyWindow.document.write(displayTable.outerHTML);
    // Print Button
    flyWindow.document.write('<button onclick="window.print()">Print</button>');
    // Download Button
    flyWindow.document.write('<button onclick="downloadPage()">Download</button>');
    // Download Function
    flyWindow.document.write('<script>');
    flyWindow.document.write('function downloadPage() {');
    flyWindow.document.write('  var content = document.documentElement.outerHTML;');
    flyWindow.document.write('  var blob = new Blob([content], { type: "text/html" });');
    flyWindow.document.write('  var link = document.createElement("a");');
    flyWindow.document.write('  link.href = URL.createObjectURL(blob);');
    flyWindow.document.write('  link.download = "mealPlan.html";');
    flyWindow.document.write('  link.click();');
    flyWindow.document.write('}');
    flyWindow.document.write('</script>');
    flyWindow.document.write('</body>');
    flyWindow.document.write('</html>');
  }
});

// Event listener for the 'Clear' button:
function clearForm() {
  document.getElementById("mealPlanForm").reset();
}

