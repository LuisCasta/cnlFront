"use strict";

const succesPost = document.getElementById("succes-post");
async function loadStudents() {
  let salida = "";
  const myTable = document.getElementById("tbody-data");
  const students = await getAllStudent();
  // console.log(students.data);
  if (students.code !== 200) {
    alert(`Error ${students.message}`);
  } else {
    students.data.map((student) => {
      const amountStudents = document.getElementById("spanTitle");
      amountStudents.textContent = students.data.length;
      const { name, firstName, mail, password, id, tag } = student;
      salida += `
      <tr>
       <td data-cell="Matrícula">
         <p id='tag_${id}' class="edit-input" contenteditable="true" data-tooltip="editar" spellcheck="false">${tag}</p>
        </td>
        <td data-cell="Nombre">
         <p id='name_${id}' class="edit-input" contenteditable="true" data-tooltip="editar" spellcheck="false">${name}</p>
        </td>
        <td data-cell="Primer apellido">
          <p id='first-name_${id}' class="edit-input" data-tooltip="editar" contenteditable="true" spellcheck="false">${firstName}</p>
        </td>
        <td data-cell="Correo">
          <p id='mail_${id}' class="edit-input" data-tooltip="editar" contenteditable="true" spellcheck="false">${mail}</p>
        </td>
        <td data-cell="Contraseña"> 
          <p id='password_${id}' class="edit-input" data-tooltip="editar" class='text-pw-student' contenteditable="true" spellcheck="false">
            ${password}
          </p>
        </td>
        <td class='td-select' data-cell="Seleccionar">
        <input value=${id} type="checkbox" class="chk-alumno"/></>
        <td data-cell="Acciones">
            <div class="actions">
            <button onclick="updateAlumno(${id})" data-tooltip="Editar" class="edit">
            <i class='bx bx-edit' ></i>
            </button>
            <button onclick="deleteAlumno(${id})" data-tooltip="Eliminar" class="edit">
            <i class='bx bxs-trash' ></i>
            </button>
            </div>
        </td>
       </tr>
  `;
      myTable.innerHTML = salida;
    });
  }
}

async function getStudentById(id) {
  const student = await getByIdStudent(id);

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
  const passwordTxt = document.getElementById("pwStud").value;
  const password = passwordTxt.trim();
  const secondName = document.getElementById("secondName").value;
  const birthdate = document.getElementById("birthDate").value;
  const mobilePhone = document.getElementById("mobile").value;
  const tag = document.getElementById("tag").value;

  const data = {
    name,
    firstName,
    secondName,
    birthdate,
    mobilePhone,
    mail,
    password,
    tag,
  };

  setTimeout(function () {
    succesPost.innerHTML = `
    <i class='bx bx-check-circle'></i>
    <p>Creando alumno...</p>`;
    succesPost.classList.add("aviso-click");
  }, 100);

  setTimeout(function () {
    succesPost.innerHTML = "";
    succesPost.classList.remove("aviso-click");
  }, 6500);

  const newStudent = await createStudent(data);

  if (newStudent.code != 200) alert(`Error ${newStudent.message}`);
  else {
    setTimeout(function () {
      succesPost.innerHTML = `
      <i class='bx bx-check-circle'></i>
      <p>Estudiante creado con éxito</p>`;
      succesPost.classList.add("aviso-click");
    }, 100);
    setTimeout(function () {
      succesPost.innerHTML = "";
      succesPost.classList.remove("aviso-click");
    }, 7000);

    await loadStudents();
  }
});

function obtainId(id) {
  const getID = document.getElementById(id);
  return getID;
}

const selectCareer = obtainId("carrera");

// Cargar las carreras

async function loadCareers() {
  let option = "";
  option += `
  <option>Selecciona una Carrera</option>
      `;
  const careers = await getAllAssigmentCareers();
  // console.log("estas son las carreras:", careers.data);
  if (careers.code != 200) {
    alert(`Error ${careers.message}`);
  } else {
    const countCareers = document.getElementById("spanTitle");
    countCareers.textContent = careers.data.length;
    careers.data.sort((a, b) => {
      return b.id - a.id;
    });
    careers.data.map((carrer) => {
      const { id, name } = carrer;
      option += `<option value=${id}>${name}</option>`;
    });
    selectCareer.innerHTML = option;
  }
}

async function changeCareer() {
  let periodos = "";
  periodos += `<option>Selecciona un periodo</option>`;
  const period = obtainId("period");
  console.log(period);
  const careerValue = obtainId("carrera").value;
  console.log(careerValue);
  const periods = await getAllPeriod(careerValue);
  console.log("estas son los periodos:", periods.data);

  if (periods.code != 200) {
    alert(`Error ${periods.message}`);
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
  let groupsHtml = "";
  groupsHtml += `<option>Selecciona un Grupo</option>`;
  const selectorGroups = obtainId("groups");
  const selectorPeriod = obtainId("period").value;
  const groups = await getAllGroup(selectorPeriod);
  console.log("estas son los grupos:", groups.data);

  if (groups.code != 200) {
    alert(`Error ${groups.message}`);
  } else {
    groups.data.map((group) => {
      const { id, name } = group;
      groupsHtml += `<option value=${id}>${name}</option>`;
    });

    selectorGroups.innerHTML = groupsHtml;
  }
}

async function changeGroup() {
  // console.log("entra");
  let cursosHtml = "";
  cursosHtml += `<option>Selecciona una asignatura</option>`;
  const selectorCursos = obtainId("cursos");
  const selectorGrupos = obtainId("groups").value;
  // console.log(selectorGroups, selectorPeriod);
  const cursos = await getAllCursos(selectorGrupos);
  console.log("estas son los cursos:", cursos.data);

  console.log(cursos);
  if (cursos.code != 200) {
    alert(`Error ${cursos.message}`);
  } else {
    cursos.data.map((curso) => {
      const { idCourse, nameCourse } = curso;
      cursosHtml += `<option value=${idCourse}>${nameCourse}</option>`;
    });

    selectorCursos.innerHTML = cursosHtml;
    console.log(selectorCursos);
  }
}

function filtrar() {
  console.log("ok");
  const idCourse = obtainId("cursos").value;
  console.log(idCourse);
}

async function loadCheckBoxes() {
  const checkboxes = document.querySelectorAll(".chk-alumno");
  const idStudents = [];
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      idStudents.push(checkbox.value);
    }
  });
  const idCourse = obtainId("cursos").value;
  // console.log(idCourse);
  // console.log("IDs de alumnos seleccionados:", idStudents, "IdCurso", idCourse);
  const data = await assigmentStudent(idCourse, idStudents);
  if (data.code == 200) {
    setTimeout(function () {
      succesPost.innerHTML = `
      <i class='bx bx-check-circle' ></i>
      <p>Alumnos asignados a la Asignaturacon éxito</p>`;
      succesPost.classList.add("aviso-click");
    }, 100);
    setTimeout(function () {
      succesPost.innerHTML = "";
      succesPost.classList.remove("aviso-click");
    }, 2000);
    succesPost.innerHTML = "";
  } else if (data.code == 500) {
    setTimeout(function () {
      succesPost.innerHTML = `
      <i class='bx bx-check-circle' ></i>
      <p>Error al asignar alumnos a la Asignatura</p>`;
      succesPost.classList.add("aviso-click");
    }, 100);
    setTimeout(function () {
      succesPost.innerHTML = "";
      succesPost.classList.remove("aviso-click");
    }, 2000);
  } else {
    setTimeout(function () {
      succesPost.innerHTML = `
      <i class='bx bx-check-circle'></i>
      <p>Error información duplicada al asignar el alumno</p>`;
      succesPost.classList.add("aviso-click");
    }, 100);
    setTimeout(function () {
      succesPost.innerHTML = "";
      succesPost.classList.remove("aviso-click");
    }, 2000);
  }
}

async function updateAlumno(studentId) {
  if (confirm("¿Estás seguro de que deseas continuar?")) {
    const name = obtainId(`name_${studentId}`).textContent;
    const firstName = obtainId(`first-name_${studentId}`).textContent;
    const mail = obtainId(`mail_${studentId}`).textContent;
    const passwordText = obtainId(`password_${studentId}`).textContent;
    const tag = document.getElementById(`tag_${studentId}`).textContent;
    const password = passwordText.trim();

    const updateData = await updateStudent({
      studentId,
      name,
      firstName,
      mail,
      password,
      tag,
    });

    if (updateData.code != 200) {
      alert(`Error al actualizar al alumno ${studentId} ${name} `);
    } else {
      setTimeout(function () {
        succesPost.innerHTML = `
        <i class='bx bx-check-circle'></i>
        <p>Estudiante actualizado con éxito</p>`;
        succesPost.classList.add("aviso-click");
      }, 100);
      setTimeout(function () {
        succesPost.innerHTML = "";
        succesPost.classList.remove("aviso-click");
      }, 7000);
    }
  } else {
    setTimeout(function () {
      succesPost.innerHTML = `
      <i class='bx bx-x' ></i>
      <p>Operación Cancelada</p>`;
      succesPost.classList.add("aviso-click");
    }, 100);
  }
  await loadStudents();
}

async function deleteAlumno(studentId) {
  if (confirm("¿Estás seguro de que deseas eliminar al alumno?")) {
    const deleteData = await deleteStudent({
      studentId,
    });

    if (deleteData.code != 200) {
      alert(`Error al eliminar al alumno ${studentId}`);
    } else {
      setTimeout(function () {
        succesPost.innerHTML = `
        <i class='bx bx-check-circle' ></i>
        <p>Estudiante eliminado con éxito</p>`;
        succesPost.classList.add("aviso-click");
      }, 100);
      setTimeout(function () {
        succesPost.innerHTML = "";
        succesPost.classList.remove("aviso-click");
      }, 7000);
      // const myTable = document.getElementById("tbody-data");
      // myTable.innerHTML = "";
      // await getAll();
    }
  } else {
    setTimeout(function () {
      succesPost.innerHTML = `
      <i class='bx bx-x' ></i>
      <p>Operación Cancelada</p>`;
      succesPost.classList.add("aviso-click");
    }, 100);

    location.reload();
  }
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
