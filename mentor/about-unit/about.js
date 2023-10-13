"use strict";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idUnit = urlParams.get("idUnit");
const idCourse = urlParams.get("idCurso");
const tbody = document.getElementById("table-lesson");
const succesPost = document.getElementById("succes-post");
const hrefUnidad = document.getElementById("href-unidad");
const tableAct = document.getElementById("table-activity");
// const hreMentor = document.getElementById("");

let lessonHtml;
async function loadAllLessonsByUnit() {
  const lessons = await getAllByUnit(idUnit);

  if (lessons.code != 200) {
    // console.log(`Error ${newLesson.message}`);
  } else {
    const countlessons = document.getElementById("spanTitle");
    countlessons.textContent = lessons.data.length;
    lessons.data.forEach((lesson) => {
      const { name, description, id } = lesson;
      hrefUnidad.href = `../unit/unit.html?idCurso=${idCourse}&idUnit=${id}`;
      lessonHtml += `
        <tr>
            <td data-cell="Id">${id}</td>
            <td data-cell="Nombre">${name}</td>
            <td data-cell="Descripción">${description}</td>
            <td data-cell="Actions">
            <div class="actions">
              <button data-id="${id}" class="eliminar"><i class='bx bx-trash'></i></button>
              <button data-id="${id}" class="editar"><i class='bx bx-edit' ></i></button>
              </div>
          </td>
          <td data-cell="Lesson+">
          <a href="../lessons/lessons.html?idCurso=${idCourse}&idUnit=${id}"><i class='bx bx-bookmark-plus'></i></a></td>
        </tr>
        `;
    });
    tbody.innerHTML = lessonHtml;
  }
}

// Mostrar en tabla las actividades

let activityHtml;
async function loadActivityByUnit() {
  const activities = await getByUnitActivity(idUnit);

  if (activities.code != 200) {
    console.log(`Error ${newActivity.message}`);
  } else {
    // const countlessons = document.getElementById("spanTitle");
    // countlessons.textContent = lessons.data.length;
    activities.data.forEach((activity) => {
      const { name, description, id, dateStart } = activity;
      //   hrefUnidad.href = `../unit/unit.html?idCurso=${idCourse}&idUnit=${id}`;
      activityHtml += `
        <tr>
            <td data-cell="Id">${id}</td>
            <td data-cell="Nombre">${name}</td>
            <td data-cell="Descripción">${description}</td>
            <td data-cell="Inicio">${dateStart}</td>
            <td data-cell="Actividad+">
            <button><i class='bx bxs-vial'></i></button>
            </td>
        </tr>
        `;
    });
    tableAct.innerHTML = activityHtml;
  }
}

//Listar los alumnos por Curso
let studentIdCourse;
async function loadStudentByIdCourse() {
  const studentsidCourse = await CourseStudGetByCourse(idCourse);
  if (studentsidCourse.code != 200) {
    console.log(newStudentsIdCourse.message);
  } else {
    studentsidCourse.data.forEach((studentId) => {
      const { id, name, firstName } = studentsidCourse;
      studentIdCourse += `
      <tr>
      <td data-cell="Id">${id}</td>
      <td data-cell="Nombre">${name}</td>
      <td data-cell="Descripción">${firstName}</td>
      <td data-cell="Actions">
      <button><i class='bx bxs-user-check'></i></button>
      </td>
  </tr>
  `;
    });
  }
}
