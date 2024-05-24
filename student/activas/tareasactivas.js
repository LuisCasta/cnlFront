"use strict";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idCourse = urlParams.get("idCourse");
const idStudent = urlParams.get("idStudent");
const tbody = document.getElementById("unit-table");
const succesPost = document.getElementById("succes-post");
const hrefMentor = document.getElementById("href-mentor");
console.log(idCourse);
// console.log(idMentor);

// CARGAR UNIDADES DEL GRUPO
async function loadUnit() {
  let unitHtml = "";
  const units = await getAllByCourse(idCourse);
  console.log(units);
  if (units.code != 200) {
  } else {
    const countlessons = document.getElementById("spanTitle");
    countlessons.textContent = units.data.length;
    units.data.forEach((unidad) => {
      const { id, percentage, name, idCourse, description } = unidad;
      unitHtml += `
      <tr>
        <td data-cell="Nombre del parcial">
         <p data-tooltip="Editar" id='name_${id}' contenteditable="true" spellcheck="false">${name}</p>
        </td>
     <td data-cell="Porcentaje"><p id="percentage-${id}" contenteditable="true" spellcheck="false">${percentage}</p></td>
   
     <td data-cell="Descripción">
      <button data-description='${description}' 
      onclick="abrirDescripcion(${id})" id="description_${id}">Ver</button>
     </td>  
     <td data-cell="Gestionar parcial">
          <button data-tooltip='Entrar' class="edit">
          <a href="../actividad/actividad.html?idCourse=${idCourse}&idStudent=${idStudent}">
          <i class='bx bx-cog'></i>
            </a>
          </button>
        </td>
        </tr>
     `;
    });
    tbody.innerHTML = unitHtml;
  }
  // await loadTypeUnits();
  // await btnSelectConfig();
}

const modalDescription = document.getElementById("modal-description");
modalDescription.classList.add("ocultar");

async function abrirDescripcion(id) {
  const buttonId = obtainId(`description_${id}`);
  const description = buttonId.dataset.description;
  const modalDescription = obtainId("modal-description");
  const save = document.querySelector(".save-description");
  const parrafo = obtainId("descripcion-parrafo");
  parrafo.textContent = description;
  modalDescription.classList.remove("ocultar");
  modalDescription.classList.add("animaterate");
  save.setAttribute("id", `${id}`);
  // console.log(description, modalDescription, save, parrafo);
}
function cancelar() {
  const modalDescription = obtainId("modal-description");
  modalDescription.classList.add("ocultar");
  modalDescription.classList.remove("animaterate");
}

// CREAR UNA NUEVA UNIDAD
// const editorContent = document.querySelector(".ck-editor editable").textContent;
// console.log(editorContent);
