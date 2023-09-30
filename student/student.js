"use strict";
let salida = "";
const myTable = document.getElementById("datos");
const succesPost = document.getElementById("succes-post");
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

async function getStudentById(id) {
  const student = await getById(id);

  if (student.status != 200)
    alert(`Error al obtener al estudiante con el id ${id}`);
  else {
    const { name, id } = student.data;

    return {
      name,
      id,
    };
  }
}

/**
 *
 * Btn create carrer
 *
 **/

const btnStudent = document.getElementById("agregar-alumno");
btnStudent.addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.getElementById("nameStud").value;
  const firstName = document.getElementById("fnameStud").value;
  const mail = document.getElementById("emailStud").value;
  const password = document.getElementById("pwStud").value;
  const secondName = document.getElementById("secondName").value;
  const birthdate = document.getElementById("birthDate").value;
  const mobilePhone = document.getElementById("mobile");

  const data = {
    name,
    firstName,
    secondName,
    birthdate,
    mobilePhone,
    mail,
    password,
  };

  succesPost.innerHTML = `
    <i class='bx bx-check-circle' style="background-color:#D1FADF;color:#039855;padding:10px;border-radius:8px"></i>
    <p>Creando nueva carrera...</p>
  `;
  succesPost.classList.add("aviso-click");
  const newStudent = await create(data);

  if (newStudent.code != 200) alert(`Error ${newStudent.message}`);
  else {
    alert(`ID de Carrera ${newStudent.data.id}`);
    succesPost.innerHTML = `
    <i class='bx bx-check-circle' style="background-color:#D1FADF;color:#039855;padding:10px;border-radius:8px"></i>
    <p>Carrera Creada con éxito</p>
  `;
    succesPost.classList.add("aviso-click");
  }
});
