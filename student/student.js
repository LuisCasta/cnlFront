"use strict";
let salida = "";
const myTable = document.getElementById("datos");

async function loadStudents() {
  const students = await getAll();
  if (students.code !== 200) {
    alert(`Error ${newStudent.message}`);
  } else {
    students.data.map((student) => {
      const amountStudents = document.getElementById("spanTitle");
      amountStudents.textContent = students.data.length;
      const { name, firstName, mail, password } = student;
      salida += `
      <tr>
        <td data-cell="Name">${name}</td>
        <td data-cell="FirstName">${firstName}</td>
        <td data-cell="Mail">${mail}</td>
        <td data-cell="PW">${password}</td>
        <td data-cell="Actions">
            <div class="actions">
            <button class="eliminar"><i class='bx bx-trash'></i></button>
            <button class="editar"><i class='bx bx-edit' ></i></button>
            </div>
        </td>
       </tr>
  `;
    });
    myTable.innerHTML = salida;
  }
}
