//1)          After dom load we perform the operation on form and table => DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById("studentForm");
    const studentTableBody = document.querySelector("#studentTable tbody");
//   -------------------------- LOCALSTORAGE-----------------
    // Load students from local storage
    const loadStudents = () => {
      const students = JSON.parse(localStorage.getItem("students")) || [];
      students.forEach(addStudentToTable);
    };
  
    // Save students to local storage
    const saveStudents = () => {
      const rows = Array.from(studentTableBody.children);
      const students = rows.map(row => ({
        name: row.children[0].textContent,
        id: row.children[1].textContent,
        email: row.children[2].textContent,
        contact: row.children[3].textContent,
      }));
      localStorage.setItem("students", JSON.stringify(students));
    };
    //--------------------------------------------------------------------
  
    //2) -------------------- Add student to table dynamically create the <tr> and add in table
    const addStudentToTable = ({ name, id, email, contact }) => {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${name}</td>
        <td>${id}</td>
        <td>${email}</td>
        <td>${contact}</td>
        <td>
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </td>
      `;
  
      studentTableBody.appendChild(row);
    };
  
    // 3)-----------------------Handle form submission
    studentForm.addEventListener("submit", (e) => {
        // console.log("=====>   ",e)
        // console.log("===>  ",e.preventDefault());
        
      e.preventDefault();  // use for without default reload we can store the data  but when we are not define yhen page tr reload honar mnje honar
  
      const name = document.getElementById("studentName").value.trim();
      const id = document.getElementById("studentID").value.trim();
      const email = document.getElementById("emailID").value.trim();
      const contact = document.getElementById("contactNumber").value.trim();
  
      // ------------------ Validation
      if (!name || !id || !email || !contact) {
        alert("All fields are required!");
        return;
      }
  
      if (!/^\d+$/.test(id) || !/^\d+$/.test(contact)) {
        alert("Student ID and Contact Number must be numbers!");
        return;
      }
  
      if (!/^[a-zA-Z\s]+$/.test(name)) {
        alert("Name must contain only letters!");
        return;
      }
  
      addStudentToTable({ name, id, email, contact });
      saveStudents();
  
      studentForm.reset();
    });
  
    //4)-----------------  Edit and delete functionality
    studentTableBody.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete")) {
        e.target.closest("tr").remove();
        saveStudents();
      } else if (e.target.classList.contains("edit")) {
        const row = e.target.closest("tr");
        document.getElementById("studentName").value = row.children[0].textContent;  // studentName ala
        document.getElementById("studentID").value = row.children[1].textContent;
        document.getElementById("emailID").value = row.children[2].textContent;
        document.getElementById("contactNumber").value = row.children[3].textContent;
        row.remove();
        saveStudents();
      }
    });
  
    loadStudents();
  });
  