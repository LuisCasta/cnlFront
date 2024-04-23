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
      const { name, firstName, mail, password, id } = student;

      salida += `
      <tr>
      <td data-cell="ID"><p>${id}</p></td>

        <td data-cell="Name"><p>${name}</p></td>
        <td data-cell="FirstName"><p>${firstName}</p></td>
        <td data-cell="Mail"><p>${mail}</p></td>
        <td data-cell="PW"><p class='text-pw-student'>${password.slice(
          0,
          6
        )}</p></td>
        <td data-cell="Seleccionar"><input value=${id} type="checkbox" class="chk-alumno"/></>
        <td data-cell="Acciones">
            <div class="actions">
            <button data-tooltip="Eliminar" class="eliminar"><i class='bx bx-trash'></i></button>
            <button data-tooltip="Editar" class="editar"><i class='bx bx-edit' ></i></button>
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
  //SELECCIONAR ALUMNOS PARA AGREGAR A CURSOS

  // document.addEventListener("DOMContentLoaded", function () {
  //   const checkboxes = document.querySelectorAll(".chk-alumno");
  //   const btnMostrarIds = document.getElementById("btn-mostrar-ids");
  //   btnMostrarIds.addEventListener("click", function () {
  //     const idsSeleccionados = [];
  //     checkboxes.forEach(function (checkbox) {
  //       console.log(checkbox);
  //       if (checkbox.checked) {
  //         idsSeleccionados.push(checkbox.value);
  //       }
  //     });
  //     console.log("IDs de alumnos seleccionados:", idsSeleccionados);
  //   });
  // });
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
  const mobilePhone = document.getElementById("mobile").value;

  const data = {
    name,
    firstName,
    secondName,
    birthdate,
    mobilePhone,
    mail,
    password,
  };

  setTimeout(function () {
    succesPost.innerHTML = `
    <i class='bx bx-check-circle' style="background-color:#D1FADF;color:#039855;padding:10px;border-radius:8px"></i>
    <p>Creando nueva carrera...</p>`;
    succesPost.classList.add("aviso-click");
  }, 100);

  setTimeout(function () {
    succesPost.innerHTML = "";
    succesPost.classList.remove("aviso-click");
  }, 6500);

  const newStudent = await create(data);

  if (newStudent.code != 200) alert(`Error ${newStudent.message}`);
  else {
    setTimeout(function () {
      succesPost.innerHTML = `
      <i class='bx bx-check-circle' style="background-color:#D1FADF;color:#039855;padding:10px;border-radius:8px"></i>
      <p>Estudiante cread0 con éxito</p>`;
      succesPost.classList.add("aviso-click");
    }, 100);
    setTimeout(function () {
      succesPost.innerHTML = "";
      succesPost.classList.remove("aviso-click");
    }, 7000);
  }
});

function obtainId(id) {
  const getID = document.getElementById(id);
  return getID;
}

const selectCareer = obtainId("carrera");

// Cargar las carreras
let option = "";
async function loadCareers() {
  option += `
  <option>Selecciona una Carrera</option>
      `;
  const careers = await getAllAssigmentCareers();
  if (careers.code != 200) {
    alert(`Error ${newCareer.message}`);
  } else {
    const countCareers = document.getElementById("spanTitle");
    countCareers.textContent = careers.data.length;
    careers.data.sort((a, b) => {
      return b.id - a.id;
    });
    careers.data.map((carrer) => {
      const { id, name } = carrer;
      option += `
    <option value=${id}>${name}</option>
          
            `;
    });
    selectCareer.innerHTML = option;
  }
}

async function changeCareer() {
  let periodos = "";
  periodos += `
  <option>Selecciona un periodo</option>
      `;
  const period = obtainId("period");
  console.log(period);
  const careerValue = obtainId("carrera").value;
  console.log(careerValue);
  const periods = await getAllPeriod(careerValue);
  if (periods.code != 200) {
    alert(`Error ${newPeriods.message}`);
  } else {
    periods.data.map((item) => {
      const { id, name } = item;
      periodos += `
      <option value=${id}>${name}</option>
          `;
    });

    period.innerHTML = periodos;
  }
}

async function changePeriod() {
  console.log("entra");
  let groupsHtml = "";
  groupsHtml += `
      <option>Selecciona un Grupo</option>
          `;
  const selectorGroups = obtainId("groups");

  const selectorPeriod = obtainId("period").value;
  console.log(selectorGroups, selectorPeriod);
  const groups = await getAllGroup(selectorPeriod);
  if (groups.code != 200) {
    alert(`Error ${groups.message}`);
  } else {
    groups.data.map((group) => {
      const { id, name } = group;
      groupsHtml += `
      <option value=${id}>${name}</option>
          `;
    });

    selectorGroups.innerHTML = groupsHtml;
  }
}

async function changeGroup() {
  console.log("entra");
  let cursosHtml = "";
  cursosHtml += `
  <option>Selecciona un Curso</option>
      `;
  const selectorCursos = obtainId("cursos");

  const selectorGrupos = obtainId("groups").value;
  // console.log(selectorGroups, selectorPeriod);
  const cursos = await getAllCursos(selectorGrupos);
  if (cursos.code != 200) {
    alert(`Error ${cursos.message}`);
  } else {
    cursos.data.map((curso) => {
      const { id, name } = curso;
      cursosHtml += `
      <option value=${id}>${name}</option>
          `;
    });

    selectorCursos.innerHTML = cursosHtml;
  }
}

function loadCheckBoxes() {
  const checkboxes = document.querySelectorAll(".chk-alumno");
  const idsSeleccionados = [];
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      idsSeleccionados.push(checkbox.value);
    }
  });
  const idCourse = obtainId("cursos").value;
  console.log(
    "IDs de alumnos seleccionados:",
    idsSeleccionados,
    "IdCurso",
    idCourse
  );

  const selectorCourse = obtainId("cursos").value;

  // llamar api
}

const btnAlumno = obtainId("alumnos-id");
const btnAsig = obtainId("asignacion");

const alumnosList = obtainId("alumnos-list");
const asignados = obtainId("asignados");

function ocultarAsignacion() {
  asignados.classList.add("hide");
  alumnosList.classList.add("show");
  asignados.classList.remove("show");
}

function ocultarAlumnosLista() {
  asignados.classList.add("show");
  alumnosList.classList.add("hide");
  alumnosList.classList.remove("show");
}

btnAsig.addEventListener("click", ocultarAlumnosLista);
btnAlumno.addEventListener("click", ocultarAsignacion);
