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
    console.log(`Error ${newLesson.message}`);
  } else {
    const countlessons = document.getElementById("spanTitle");
    countlessons.textContent = lessons.data.length;
    lessons.data.forEach((lesson) => {
      const { name, description, id, dateStart } = lesson;
      hrefUnidad.href = `../unit/unit.html?idCurso=${idCourse}&idUnit=${id}`;
      lessonHtml += `
        <tr>
            <td data-cell="Id">${id}</td>
            <td data-cell="Nombre">${name}</td>
            <td data-cell="Descripción">${description}</td>
            <td data-cell="Inicio">${dateStart}</td>
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
        </tr>
        `;
    });
    tableAct.innerHTML = activityHtml;
  }
}
