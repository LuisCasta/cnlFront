"use strict";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idUnit = urlParams.get("idUnit");
const idCourse = urlParams.get("idCurso");
const tbody = document.getElementById("table-lesson");
const succesPost = document.getElementById("succes-post");

let lessonHtml = "";
async function loadAllLessonsByUnit() {
  const lessons = await getAllByUnit(idUnit);

  if (lessons.code != 200) {
    console.log(`Error ${newLesson.message}`);
  } else {
    const countlessons = document.getElementById("spanTitle");
    countlessons.textContent = lessons.data.length;
    lessons.data.forEach((lesson) => {
      const { name, description, id, dateStart } = lesson;
      const newDate = dateStart.slice(0, -14).replaceAll("-", "/");
      lessonHtml += `
        <tr>
            <td data-cell="Nombre">${name}</td>
            <td data-cell="Descripción">${description}</td>
            <td data-cell="Inicio">${newDate}</td>
        </tr>
        `;
    });
    tbody.innerHTML = lessonHtml;
  }
}

// CREAR UNA NUEVA CLASE

const btnLesson = document.getElementById("agregar-clase");

btnLesson.addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name-clase-form").value;
  const description = document.getElementById("des-clase").value;
  //   const startClass = document.getElementById("start-class").value;
  //   const endClass = document.getElementById("end-class").value;
  const data = { name, description, idUnit, idCourse };
  // Succes Post
  succesPost.innerHTML = `
   <i class='bx bx-loader-circle bx-spin' ></i>
   <p>Creando nueva lección...</p>
 `;
  succesPost.classList.add("aviso-click");

  const newLesson = await create(data);
  if (newLesson.code != 200) alert(`Error ${newLesson.message}`);
  else {
    succesPost.innerHTML = `
 <i class='bx bx-check-circle bx-tada' style="color:#38b000"></i>
   <p>Lección: ${name} creada con éxito</p>
 `;
    succesPost.classList.add("aviso-click");
  }

  setTimeout(function () {
    location.reload();
  }, 4000);
});
