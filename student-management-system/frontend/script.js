const API_BASE_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {
  await loadStudents();
});

// Handle form submission
document.getElementById("studentForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const studentId = this.dataset.editing; // Check if editing an existing student

  if (studentId) {
    // Update existing student
    await fetch(`${API_BASE_URL}/api/students/${studentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age })
    });
    delete this.dataset.editing; // Reset edit mode
  } else {
    // Add new student
    await fetch(`${API_BASE_URL}/api/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age })
    });
  }

  this.reset(); // Clear form fields
  await loadStudents();
});

// Load students and prevent duplicate table entries
async function loadStudents() {
  const response = await fetch(`${API_BASE_URL}/api/students`);
  const students = await response.json();
  const tableBody = document.querySelector("#studentsTable tbody");

  tableBody.innerHTML = ""; // ✅ Clears previous data before adding new

  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>
        <button class="edit" onclick="prepareEdit(${student.id}, '${student.name}', ${student.age})">✏ Edit</button>
        <button class="delete" onclick="deleteStudent(${student.id})">❌ Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Delete student
async function deleteStudent(id) {
  await fetch(`${API_BASE_URL}/api/students/${id}`, { method: "DELETE" });
  await loadStudents();
}

// Prepare form for editing
function prepareEdit(id, name, age) {
  document.getElementById("name").value = name;
  document.getElementById("age").value = age;
  document.getElementById("studentForm").dataset.editing = id; // ✅ Store editing ID
}
