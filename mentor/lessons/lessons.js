"use strict";
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const idUnit = urlParams.get("idUnit");
// const idCourse = urlParams.get("idCurso");
const tbody2 = document.getElementById("table-lesson");

// const hrefUnidad = document.getElementById("href-unidad");

let lessonHtml2;
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
      lessonHtml2 += `
        <tr>
            <td data-cell="Id">${id}</td>
            <td data-cell="Nombre">${name}</td>
            <td data-cell="Descripción">${description}</td>
            <td data-cell="Inicio">${dateStart}</td>
        </tr>
        `;
    });
    tbody2.innerHTML = lessonHtml2;
  }
}

// CREAR UNA NUEVA CLASE

const btnLesson2 = document.getElementById("agregar-clase");

btnLesson2.addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name-clase-form").value;
  const description = document.getElementById("des-clase").value;
  //   const startClass = document.getElementById("start-class").value;
  //   const endClass = document.getElementById("end-class").value;
  const data = { name, description, idUnit, idCourse };

  // Succes Post
  succesPost.innerHTML = `
      <i class='bx bx-loader-circle bx-spin' ></i>
      <p>Creando nueva materia...</p>
    `;
  succesPost.classList.add("aviso-click");

  const newLesson = await create(data);
  if (newLesson.code != 200) alert(`Error ${newLesson.message}`);
  else {
    succesPost.innerHTML = `
    <i class='bx bx-check-circle bx-tada' style="color:#38b000"></i>
      <p>Materia: ${name} creada con éxito</p>
    `;
    succesPost.classList.add("aviso-click");
  }

  setTimeout(function () {
    location.reload();
  }, 4000);
});
