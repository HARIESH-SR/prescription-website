// Add a listener for removing medicine rows (optional)
document.getElementById("invoiceForm").addEventListener("click", function(event) {
  if (event.target.classList.contains("removeMedicine")) {
    event.preventDefault();
    event.target.closest(".medicine").remove();
  }
});

document.getElementById("addMedicine").addEventListener("click", function() {
  var medicineTable = document.getElementById("medicineTable").getElementsByTagName('tbody')[0];

  var newRow = document.createElement("tr");
  newRow.className = "medicine";

  newRow.innerHTML = `
  <td><input type="text" class="medicineName"  placeholder="Enter Medicine Name" required></td>
  <td><input type="number" class="morningDosage" placeholder="Enter Morning Dosage" min=0 required></td>
  <td><input type="number" class="noonDosage" min=0 placeholder="Enter Noon Dosage" required></td>
  <td><input type="number" class="nightDosage" min=0 placeholder="Enter Night Dosage" required></td>
  <td><button type="button" class="removeMedicine">Remove</button></td>
  `;

  medicineTable.appendChild(newRow);
});

document.getElementById("invoiceForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var patientName = document.getElementById("patientName").value;
  var medicines = document.getElementsByClassName("medicine");

  var prescription = {}; // Create an empty object to store medicine details

  for (var i = 0; i < medicines.length; i++) {
    var medicine = medicines[i];
    var medicineName = medicine.getElementsByClassName("medicineName")[0].value;
    var morningDosage = medicine.getElementsByClassName("morningDosage")[0].value;
    var noonDosage = medicine.getElementsByClassName("noonDosage")[0].value;
    var nightDosage = medicine.getElementsByClassName("nightDosage")[0].value;

    // Add medicine details to the prescription object
    prescription[medicineName] = {
      M: morningDosage,
      A: noonDosage,
      N: nightDosage
    };
  }

  // Now 'prescription' contains medicine details in the required format

  var invoiceOutput = document.getElementById("invoiceOutput");
  invoiceOutput.innerHTML = '';

  var invoiceHeader = document.createElement("h2");
  invoiceHeader.textContent = "Prescription";
  invoiceOutput.appendChild(invoiceHeader);

  var patientNamePara = document.createElement("p");
  patientNamePara.textContent = "Patient's Name: " + patientName;
  invoiceOutput.appendChild(patientNamePara);

  // Create a table for displaying medicine details
  var medicineTable = document.createElement("table");
  medicineTable.className = "invoiceTable";

  var tableHeader = document.createElement("tr");
  var medicineNameHeader = document.createElement("th");
  medicineNameHeader.textContent = "Medicine Name";
  var morningDosageHeader = document.createElement("th");
  morningDosageHeader.textContent = "Morning Dosage";
  var noonDosageHeader = document.createElement("th");
  noonDosageHeader.textContent = "Noon Dosage";
  var nightDosageHeader = document.createElement("th");
  nightDosageHeader.textContent = "Night Dosage";

  tableHeader.appendChild(medicineNameHeader);
  tableHeader.appendChild(morningDosageHeader);
  tableHeader.appendChild(noonDosageHeader);
  tableHeader.appendChild(nightDosageHeader);

  medicineTable.appendChild(tableHeader);

  for (var medicineName in prescription) {
    var medicineData = prescription[medicineName];

    var tableRow = document.createElement("tr");
    var medicineNameCell = document.createElement("td");
    medicineNameCell.textContent = medicineName;
    var morningDosageCell = document.createElement("td");
    morningDosageCell.textContent = medicineData.M;
    var noonDosageCell = document.createElement("td");
    noonDosageCell.textContent = medicineData.A;
    var nightDosageCell = document.createElement("td");
    nightDosageCell.textContent = medicineData.N;

    tableRow.appendChild(medicineNameCell);
    tableRow.appendChild(morningDosageCell);
    tableRow.appendChild(noonDosageCell);
    tableRow.appendChild(nightDosageCell);

    medicineTable.appendChild(tableRow);
  }

  invoiceOutput.appendChild(medicineTable);

  // Create a QR code with the prescription JSON data
  var qrCodeContainer = document.createElement("div");
  var qrCode = new QRCode(qrCodeContainer, {
    text: JSON.stringify(prescription), // Use the JSON representation as data for QR code
    width: 200, // Adjust width for desired size
    height: 200 // Adjust height for desired size
  });

  invoiceOutput.appendChild(qrCodeContainer);

  invoiceOutput.style.display = "block";
});