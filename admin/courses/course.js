"use strict";
let cursoHtml = "";
const tbody = document.getElementById("tbody-cursos");
const succesPost = document.getElementById("succes-post");
const fomSelect = document.getElementById("form-header");
const formMentor = document.getElementById("form-mentor");

// Params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idGroup = urlParams.get("idGroup");
const idCareer = urlParams.get("idCarrera");
async function loadCursos() {
  //   obtener cursos e info cursos
  const infoId = await getInfo(idCareer);
  await buildSelectSubjects(infoId.data);
  const cursos = await getAll(idGroup);

  //Obtener Mentores
  await obtenerIdMentor();

  if (cursos.code != 200) {
    alert(`Error ${newCurso.message}`);
  } else {
    const countCursos = document.getElementById("spanTitle");
    countCursos.textContent = cursos.data.length;
    cursos.data.map((curso) => {
      const {
        idCourse,
        nameCourse,
        nameMentor,
        description,
        idGroup,
        idMentor,
        proyect,
        task,
        exam,
        firstName,
        status
      } = curso;
  
      cursoHtml += `
              <tr>
                <td data-cell="Nombre de la asignatura">
                  <p id='curso_${idCourse}' contenteditable='true' spellcheck='false'>${nameCourse}</p>
                </td>
                <td data-cell="Tutor">
                <p id='docente_${idCourse}'>${nameMentor} ${firstName}</p>
              </td>
                <td data-cell="Descripción">
                  <p id='description_${idCourse}' contenteditable='true' spellcheck='false'>${description}</p>
                </td>
                   <td data-cell="Estatus">
                      <select id="status_${idCourse}" value=${status}> 
                        <option value="open">open</option>
                        <option value="finished">finished</option>
                        <option value="read-only">readonly</option>
                      </select>
                   </td>
                <td data-cell="Acciones">
                  <div class="actions">
                    <button class='edit'  onclick="upCurso(${idCourse})" 
                      data-idgroup=${idGroup} 
                      data-idmentor=${idMentor} 
                      data-proyect=${proyect}  
                      data-task=${task}  
                      data-exam=${exam}  
                      data-tooltip='Actualizar' 
                      id='btn_${idCourse}' 
                      class="editar">
                      <i class='bx bx-refresh'></i>
                    </button>
                    <button onclick="delCurso(${idCourse})" data-tooltip='Eliminar' class='edit' 
                     data-id="${idCourse}" class="eliminar"><i class='bx bx-trash'></i>
                    </button>
                    <button onclick="showStudents(${idCourse})" data-tooltip='Ver alumnos' class='edit' 
                     data-id="${idCourse}" class="eliminar"><i class='bx bx-group' style='color:#4ba070'></i>
                    </button>
                  </div>
                </td>
              </tr>
            `;
    });
    tbody.innerHTML = cursoHtml;
  }
}

async function showStudents(idCourse) {
  const alumnos = await CourseStudGetByCourse(idCourse);
  const container = document.getElementById("list-student");
  container.classList.add("card-header-2", "list-student");
  container.classList.remove("opacity");
  const ulHtml = document.getElementById("ul-student");
  document.body.style.overflow = "hidden";
  let html = "";
  alumnos.data.map((alumno) => {
    const { name, firstName, secondName } = alumno;
    // console.log(name, firstName, secondName);
    html += `<li><i class='bx bx-check check-list'></i> ${name} ${firstName} ${secondName}</li>`;
    ulHtml.innerHTML = html;
  });
}

function cerrarLista() {
  document.body.style.overflow = "";
  const container = document.getElementById("list-student");
  container.classList.remove("card-header-2", "list-student");
  container.classList.add("opacity");
  const ulHtml = document.getElementById("ul-student");
  ulHtml.innerHTML = "";
}

async function buildSelectSubjects(subjects) {
  let select;
  subjects.forEach((subject) => {
    const { Id, Materia, Periodo } = subject;
    select += `
    <option value="${Id}">${Periodo} - ${Materia}</option>
    `;
  });
  fomSelect.innerHTML = select;
}

//Función para Obtner los ids Mentor
async function obtenerIdMentor() {
  let mentorSelect;
  const mentores = await getAllMentor();
  mentores.data.forEach((mentor) => {
    const { id, name, firstName } = mentor;
    mentorSelect += `
        <option value=${id}>${name} ${firstName}</option>
        `;
  });
  formMentor.innerHTML = mentorSelect;
}

async function getCourseById(idCourse) {
  const curso = await getById(id);

  if (curso.status != 200)
    alert(`Error al obtener el curso con el id ${idCourse}`);
  else {
    const { name, description, id } = curso.data;

    return {
      name,
      idCourse,
      description,
    };
  }
}

/**
 *
 * Btn create carrer
 *
 **/
const btnCurso = document.getElementById("agregar-curso");
btnCurso.addEventListener("click", async (e) => {
  e.preventDefault();
  //   const code = document.getElementById("idCarrera").value;
  const name = document.getElementById("name-curso-form").value;
  const description = document.getElementById("descripcion-curso").value;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idGroup = urlParams.get("idGroup");

  //   Obtner el id de Value de Subject
  const idSubject = document.querySelector("#form-header").value;

  //OBTENER EL ID DEL VALUE DEL MENTOR
  const idMentor = document.getElementById("form-mentor").value;
  // Envíamos valores en 0 de task, exam, proyect
  const data = {
    name,
    description,
    idMentor,
    idSubject,
    idGroup,
    task: 0,
    exam: 0,
    proyect: 0,
  };
  // Succes Post
  succesPost.innerHTML = `
   <i class='bx bx-loader-circle bx-spin' ></i>
   <p>Creando un nuevo curso...</p>
 `;
  succesPost.classList.add("aviso-click");
  const newCurso = await create(data);
  if (newCurso.code != 200) alert(`Error ${newCurso.message}`);
  else {
    succesPost.innerHTML = `
 <i class='bx bx-check-circle bx-tada' style="color:#38b000"></i>
   <p>Curso: ${name} creado con éxito</p>
 `;
    succesPost.classList.add("aviso-click");
  }
  setTimeout(function () {
    location.reload();
  }, 4000);
});

// Update
async function upCurso(courseId) {
  if (confirm("¿Estás seguro de que deseas continuar?")) {
    const nameCourse = obtainId(`curso_${courseId}`).textContent;
    const description = obtainId(`description_${courseId}`).textContent;
    const btn = obtainId(`btn_${courseId}`);
    const task = btn.getAttribute("data-task");
    const idGroup = btn.getAttribute("data-idgroup");
    const idMentor = btn.getAttribute("data-idmentor");
    const proyect = btn.getAttribute("data-proyect");
    const exam = btn.getAttribute("data-exam");
    const status = obtainId(`status_${courseId}`).value;
    const updateData = await updateCourseAdmin({
      courseId,
      name: nameCourse,
      description,
      task,
      exam,
      proyect,
      idGroup,
      idMentor,
      status
    });

    

    if (updateData.code != 200) {
      alert(`Error al actualizar el grupo ${courseId} ${nameCourse} `);
    } else {
      setTimeout(function () {
        succesPost.innerHTML = `
        <i class='bx bx-check-circle'></i>
        <p>Asignatura actualizada con éxito</p>`;
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
}

async function delCurso(courseId) {
  if (confirm("¿Estás seguro de que deseas eliminar este Grupo?")) {
    console.log(courseId);
    const deleteData = await deleteGroup({
      courseId,
    });

    if (deleteData.code != 200) {
      alert(`Error al eliminar el Grupo ${courseId}`);
    } else {
      setTimeout(function () {
        succesPost.innerHTML = `
        <i class='bx bx-check-circle' ></i>
        <p>Grupo eliminado con éxito</p>`;
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

    location.reload();
  }
}
