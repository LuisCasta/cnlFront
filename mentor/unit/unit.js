"use strict";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idCourse = urlParams.get("idCurso");
const idMentor = urlParams.get("idMentor");
const tbody = document.getElementById("unit-table");
const succesPost = document.getElementById("succes-post");
const hrefMentor = document.getElementById("href-mentor");
// console.log(idMentor);

// CARGAR UNIDADES DEL GRUPO
async function loadUnit() {
  let unitHtml = "";
  const units = await getAllByCourse(idCourse);
  if (units.code != 200) {
    // console.log(`Error ${newunits.message}`);
  } else {
    const countlessons = document.getElementById("spanTitle");
    countlessons.textContent = units.data.length;
    // console.log(units.data);
    units.data.forEach((unidad) => {
      const { id, percentage, name, idCourse, description } = unidad;
      hrefMentor.href = `../mentor/mentor.html?idMentor=${idMentor}`;
      unitHtml += `
      <tr>
        <td data-cell="Nombre del parcial">
         <p data-tooltip="Editar" id='name_${id}' contenteditable="true" spellcheck="false">${name}</p>
        </td>
     <td data-cell="Porcentaje"><p id="percentage-${id}" contenteditable="true" spellcheck="false">${percentage}</p></td>
   
     <td data-cell="Descripción">
      <button class="btn-show" data-tooltip="Ver" data-description='${description}' 
      onclick="abrirDescripcion(${id})" id="description_${id}"><i class='bx bxs-show bx-sm'></i></button>
     </td>  
     <td data-cell="Gestionar parcial">
          <button data-tooltip='Gestionar' class="edit">
          <a href="../about-unit/about.html?idCurso=${idCourse}&idUnit=${id}">
              <i class='bx bx-cog'></i>
            </a>
          </button>
        </td>
        <td data-cell="Acciones">
        <div class="actions">
          <button id='btn_${id}' onclick='updateUnit(${id})' data-type="${percentage}" data-idcurso='${idCourse}'  data-tooltip='Guardar' data-id="${id}" class='edit'>
           <i class='bx bx-edit' ></i>
          </button>
          <button onclick='delUnit(${id})' data-tooltip='Eliminar'  class='edit'>
            <i class='bx bx-trash' ></i>
          </button>
        </div>
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

const createBtnUnit = document.getElementById("agregar-unidad");
createBtnUnit.addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name-unit-form").value;
  const percentage = document.getElementById("percentage").value;
  const description = document.getElementById("description").value;
  console.log(description);
  const data = { name, percentage, idCourse, description };

  // Succes Post
  succesPost.innerHTML = `
      <i class='bx bx-loader-circle bx-spin' ></i>
      <p>Creando nueva tarea activa...</p>
    `;
  succesPost.classList.add("aviso-click");

  const newUnit = await create(data);
  if (newUnit.code != 200) alert(`Error ${newUnit.message}`);
  else {
    succesPost.innerHTML = `
    <i class='bx bx-check-circle bx-tada' style="color:#38b000"></i>
      <p>Tarea activa: ${name} creado con éxito</p>
    `;
    succesPost.classList.add("aviso-click");
  }
  setTimeout(function () {
    location.reload();
  }, 4000);
});

/**
 * @description Update Unit
 */
async function updateUnit(unitId) {
  if (confirm("¿Estás seguro de que deseas continuar?")) {
    const name = obtainId(`name_${unitId}`).textContent;
    const btn = obtainId(`btn_${unitId}`);
    const percentage = obtainId(`percentage-${unitId}`).textContent;
    const idCourse = btn.getAttribute("data-idcurso");
    const description = obtainId("descripcion-parrafo").value;
    const updateData = await updateUnitMentor({
      unitId,
      name,
      idCourse,
      type: 0,
      percentage,
      description,
    });

    if (updateData.code != 200) {
      alert(`Error al actualizar la tarea activa ${unitId} ${name}`);
    } else {
      setTimeout(function () {
        succesPost.innerHTML = `
        <i class='bx bx-check-circle'></i>
        <p>Tarea activa actualizada con éxito</p>`;
        succesPost.classList.add("aviso-click");
      }, 100);
      setTimeout(function () {
        succesPost.innerHTML = "";
        succesPost.classList.remove("aviso-click");
      }, 4000);
    }
  }
}

async function delUnit(unitId) {
  if (confirm("¿Estás seguro de que deseas eliminar la Tarea?")) {
    const deleteData = await deleteUnit({
      unitId,
    });

    if (deleteData.code != 200) {
      alert(`Error al eliminar la tarea ${unitId}`);
    } else {
      setTimeout(function () {
        succesPost.innerHTML = `
        <i class='bx bx-check-circle' ></i>
        <p>Tarea eliminada con éxito</p>`;
        succesPost.classList.add("aviso-click");
      }, 100);
      setTimeout(function () {
        succesPost.innerHTML = "";
        succesPost.classList.remove("aviso-click");
      }, 7000);
    }
  } else {
    setTimeout(function () {
      succesPost.innerHTML = `
      <i class='bx bx-x' ></i>
      <p>Operación Cancelada</p>`;
      succesPost.classList.add("aviso-click");
    }, 100);
    location.reload();
  }
}
