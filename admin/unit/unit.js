"use strict";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idCourse = urlParams.get("idCurso");
const tbody = document.getElementById("unit-table");
const succesPost = document.getElementById("succes-post");
let unitHtml = "";
// CARGAR UNIDADES DEL GRUPO
async function loadUnit() {
  const units = await getAllByCourse(idCourse);
  if (units.code != 200) {
    console.log(`Error ${newUnits.message}`);
  } else {
    const countlessons = document.getElementById("spanTitle");
    countlessons.textContent = units.data.length;
    units.data.forEach((unidad) => {
      const { id, type, name } = unidad;
      unitHtml += `
      <tr>
        <td data-cell="Id">${id}</td>
        <td data-cell="Nombre">${name}</td>
        <td data-cell="Type">${type}</td>
        <td data-cell="Add Lessons">
          <a href="../lessons/lessons.html?idCurso=${idCourse}&idUnit=${id}"><button>
          <i class='bx bxs-file-plus'></i>
          </button></a>
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
   <p>Creando nueva materia...</p>
 `;
  succesPost.classList.add("aviso-click");

  const newUnit = await create(data);
  if (newUnit.code != 200) alert(`Error ${newUnit.message}`);
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
