"use strict";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idCourse = urlParams.get("idCourse");
const idStudent = urlParams.get("idStudent");
const contCursos = document.getElementById("container-cursos");
let courseStudentHtml = "";
async function loadCursosByStudent() {
  // const actividadLink =
  const cursosByStudent = await CourseStudGetByStudent(idStudent);
  if (cursosByStudent.code != 200) {
    alert(`Error ${newCursosByStudent.message}`);
  } else {
    cursosByStudent.data.forEach((cursoByStudent) => {
      const { name, description, idCourse, score } = cursoByStudent;
      courseStudentHtml += `
      <div class="card-cursos">
      <div class="text-card">
        <h4>${name}</h4>
        <div class="hr"></div>
        <p>${description}</p>
        <span class=${score == null || 0 ? 'none-score' : 'display-score'}>${score}</span>
        <a  href="../tareas/activas.html?idCourse=${idCourse}&idStudent=${idStudent}">Ver + </a>
      </div>
    </div>
      `;
    });
    contCursos.innerHTML = courseStudentHtml;
  }
}

function obtainId(id) {
  const getId = document.getElementById(id);
  return getId;
}

const asignaturas = obtainId("asignaturas");

async function loadNotices() {
  const noticias = await getAllNotice();
  console.log(noticias);
  let noticesHtml = "";
  noticias.data.data.data.forEach((advice) => {
    const { notice, createdAt } = advice;
    const newDate = createdAt.slice(0, -14).replaceAll("-", "/");
    noticesHtml = `
    <div class="notification">
    <div class="name-notify">
      <h6>Aviso</h6>
      <label>${notice}</label>
    </div>
    <div class="fecha">
      <h6>fecha de publicación</h6>
      <p>${newDate}</p>
    </div>
  </div>
    `;
  });
  asignaturas.innerHTML = noticesHtml;
}
