"use strict";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idStudent = urlParams.get("idStudent");
const contCursos = document.getElementById("container-cursos");
let courseStudentHtml = "";
async function loadCursosByStudent() {
  const cursosByStudent = await CourseStudGetByStudent(idStudent);
  if (cursosByStudent.code != 200) {
    alert(`Error ${newCursosByStudent.message}`);
  } else {
    cursosByStudent.data.forEach((cursoByStudent) => {
      const { id, name, description, idCourse } = cursoByStudent;
      courseStudentHtml += `
      <div class="card-cursos">
      <div class="text-card">
        <h4>${name}</h4>
        <div class="hr"></div>
        <p>${description}</p>
        <a href="../actividad/actividad.html?${idCourse}&idStudent=${idStudent}">Ver+</a>
      </div>
    </div>
      `;
    });
    contCursos.innerHTML = courseStudentHtml;
  }
}
