"use strict";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idCourse = urlParams.get("idCurso");
const idMentor = urlParams.get("idMentor");
const tbody = document.getElementById("unit-table");
const succesPost = document.getElementById("succes-post");
const hrefMentor = document.getElementById("href-mentor");
let unitHtml = "";
// CARGAR UNIDADES DEL GRUPO
async function loadUnit() {
  const units = await getAllByCourse(idCourse);
  if (units.code != 200) {
    // console.log(`Error ${newunits.message}`);
  } else {
    const countlessons = document.getElementById("spanTitle");
    countlessons.textContent = units.data.length;
    units.data.forEach((unidad) => {
      const { id, type, name } = unidad;
      hrefMentor.href = `../mentor.html?idMentor=${idMentor}`;
      unitHtml += `
      <tr>
        <td data-cell="Id">${id}</td>
        <td data-cell="Nombre">${name}</td>
        <td data-cell="Type">${type}</td>
        <td data-cell="Add Lessons">
          <a class="a-unit" href="../about-unit/about.html?idCurso=${idCourse}&idUnit=${id}">Ver unidad</a>
        </td>
        <td data-cell="Actions">
        <div class="actions">
          <button data-id="${id}"><i class='bx bx-edit' ></i></button>
          <button data-id="${id}"><i class='bx bx-trash' ></i></button>
        </div>
        </td>
        </tr>
     `;
    });
    tbody.innerHTML = unitHtml;
  }
}

// CREAR UNA NUEVA UNIDAD

const createBtnUnit = document.getElementById("agregar-unidad");
createBtnUnit.addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name-unit-form").value;
  const type = document.getElementById("type-unit").value;
  const data = { name, type, idCourse };

  // Succes Post
  succesPost.innerHTML = `
      <i class='bx bx-loader-circle bx-spin' ></i>
      <p>Creando nueva Unidad...</p>
    `;
  succesPost.classList.add("aviso-click");

  const newUnit = await create(data);
  if (newUnit.code != 200) alert(`Error ${newUnit.message}`);
  else {
    succesPost.innerHTML = `
    <i class='bx bx-check-circle bx-tada' style="color:#38b000"></i>
      <p>Unidad: ${name} creada con éxito</p>
    `;
    succesPost.classList.add("aviso-click");
  }
  setTimeout(function () {
    location.reload();
  }, 4000);
});
