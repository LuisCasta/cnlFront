"use strict";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idCourse = urlParams.get("idCurso");
const tbody = document.getElementById("unit-table");
const succesPost = document.getElementById("succes-post");
let unitHtml;
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
  const newUnit = await create(data);
  if (newUnit.code != 200) {
    setTimeout(function () {
      succesPost.classList.add("aviso-click");
      succesPost.innerHTML = `
        <i class='bx bx-error' 
        style="background-color:##FEE4E2;color:
        #D92D20;padding:10px;border-radius:8px">
        </i>
        <p>${newUnit.message}</p>`;
    }, 10);

    setTimeout(function () {
      succesPost.innerHTML = "";
      succesPost.classList.remove("aviso-click");
    }, 6500);
  } else {
    setTimeout(function () {
      succesPost.innerHTML = `
        <i class='bx bx-check-circle' style="color:#039855;padding:10px;border-radius:8px"></i>
        <p>Unidad de ${newUnit.data.name} Creada con éxito</p>
      `;
      succesPost.classList.add("aviso-click");
    }, 100);

    setTimeout(function () {
      succesPost.innerHTML = "";
      succesPost.classList.remove("aviso-click");
    }, 6500);
  }
});
