"use strict";
let user = localStorage.getItem("user");
let idStudent = 0;
if (user) {
  user = JSON.parse(user);
  idStudent = user.id;
} else {
  window.location.replace("../../index.html");
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idCourse = urlParams.get("idCourse");
const contCursos = document.getElementById("container-cursos");
let courseStudentHtml = "";
async function loadCursosByStudent() {
  // const actividadLink =
  const cursosByStudent = await CourseStudGetByStudent(idStudent);
  if (cursosByStudent.code != 200) {
    alert(`Error ${cursosByStudent.message}`);
  } else {
    cursosByStudent.data.forEach((cursoByStudent) => {
      const { name, idCourse, score, idMentor } = cursoByStudent;
      courseStudentHtml += `
      <div class="card-cursos">
      <div class="text-card">
        <h4>${name}</h4>
        <div style="margin-bottom:30px" class="hr"></div>
        <span class=${
          score == null || 0 ? "none-score" : "display-score"
        }>${score}</span>
        <a  href="../tareas/activas.html?idCourse=${idCourse}&idMentor=${idMentor}">Ver +</a>
      </div>
    </div>
      `;
    });
    contCursos.innerHTML = courseStudentHtml;
  }
}
async function obtainTotalCourses() {
  const totalCursos = await getTotalCourses(idStudent);

  if (totalCursos.code !== 200) {
    alert(`Error ${totalCursos.message}`);
    return;
  } 


  // 👉 Tomamos SOLO el primer objeto del array
  const firstCareer = totalCursos.data.data?.[0];
  console.log(firstCareer)

  if (!firstCareer) {
    console.warn("No hay datos de carrera");
    console.log(idStudent);
    return;
  }

  const totalCourses = firstCareer.totalCourses;
  const completedCourses = firstCareer.totalCoursesFinished;
  console.log(totalCourses,completedCourses)

  // Evitar división entre 0
  const safeTotal = totalCourses > 0 ? totalCourses : 1;

  let percentage = Math.round((completedCourses / safeTotal) * 100);
  if (percentage > 100) percentage = 100;

  // DOM
  const circle = document.getElementById("progressCircle");
  const percentText = document.getElementById("circlePercent");
  const detailText = document.getElementById("circleText");

  // Render
  circle.style.background = `
    conic-gradient(
      #2563eb ${percentage}%,
      #e5e7eb ${percentage}% 100%
    )
  `;

  percentText.textContent = `${percentage}%`;
  detailText.textContent = `${completedCourses} de ${totalCourses}`;

  // 100%
  if (percentage === 100) {
    circle.style.background = `
      conic-gradient(
        #16a34a 100%,
        #16a34a 0%
      )
    `;
    percentText.style.color = "#16a34a";
    detailText.textContent = "Programa completado 🎓";
  }
}


function obtainId(id) {
  const getId = document.getElementById(id);
  return getId;
}

const asignaturas = obtainId("asignaturas");

async function loadNotices() {
  const noticias = await getAllNotice();
  let noticesHtml = "";

  // Verificar si la respuesta es válida y si el array de noticias está vacío
  if (
    !noticias ||
    !noticias.data ||
    !noticias.data.data ||
    noticias.data.data.data.length === 0
  ) {
    noticesHtml = ` <div class="notification">
          <div class="name-notify">
            <h6>Aviso</h6>
            <label>No hay avisos en este momento</label>
          </div>
        </div>
      `;
  } else {
    // Si hay avisos, recorrerlos y generar el HTML
    noticias.data.data.data.forEach((advice) => {
      const { notice, createdAt } = advice;
      const newDate = createdAt.slice(0, -14).replaceAll("-", "/");

      noticesHtml += `
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
  }

  // Inserta el contenido generado en el HTML
  asignaturas.innerHTML = noticesHtml;
}
