"use strict";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idCourse = urlParams.get("idCurso");
const tbody = document.getElementById("unit-table");
const succesPost = document.getElementById("succes-post");
// console.log(tbody);
let unitHtml;
// CARGAR UNIDADES DEL GRUPO
async function loadUnit() {
  const units = await getAllByCourse(idCourse);
  if (units.code != 200) {
    console.log(`Error ${newUnit.message}`);
  } else {
    units.data.forEach((unidad) => {
      const { id, type, name } = unidad;
      unitHtml += `
      <tr>
        <td data-cell="Id">${id}</td>
        <td data-cell="Nombre">${name}</td>
        <td data-cell="Type">${type}</td>
      </tr>`;
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
        <p>Carrera de ${newUnit.data.name} Creada con éxito</p>
      `;
      succesPost.classList.add("aviso-click");
    }, 100);

    setTimeout(function () {
      succesPost.innerHTML = "";
      succesPost.classList.remove("aviso-click");
    }, 6500);
  }
});
