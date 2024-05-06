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
      const { id, type, name, idCourse } = unidad;
      hrefMentor.href = `../mentor/mentor.html?idMentor=${idMentor}`;
      unitHtml += `
      <tr>
        <td data-cell="Nombre del parcial">
         <p data-tooltip="Editar" id='name_${id}' contenteditable="true" spellcheck="false">${name}</p>
        </td>
        <td data-cell="Tipo de parcial"><p class=${
          type === 1
            ? "ordinario"
            : type === 2
            ? "cuatrimestral"
            : "extraordinario"
        }>${
        type === 1
          ? "Ordinario"
          : type === 2
          ? "Cuatrimestral"
          : "Extraordinario"
      }<p></td>
        <td data-cell="Gestionar parcial">
          <button data-tooltip='Gestionar' class="edit">
            <a  href="../about-unit/about.html?idCurso=${idCourse}&idUnit=${id}&idMentor=${idMentor}">
              <i class='bx bx-cog'></i>
            </a>
          </button>
        </td>
        <td data-cell="Acciones">
        <div class="actions">
          <button id='btn_${id}' onclick='updateUnit(${id})' data-type="${type}" data-idcurso='${idCourse}'  data-tooltip='Editar' data-id="${id}" class='edit'>
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
  await loadTypeUnits();
  // await btnSelectConfig();
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
      <p>Creando nuevo Parcial...</p>
    `;
  succesPost.classList.add("aviso-click");

  const newUnit = await create(data);
  if (newUnit.code != 200) alert(`Error ${newUnit.message}`);
  else {
    succesPost.innerHTML = `
    <i class='bx bx-check-circle bx-tada' style="color:#38b000"></i>
      <p>Parcial: ${name} creado con éxito</p>
    `;
    succesPost.classList.add("aviso-click");
  }
  setTimeout(function () {
    location.reload();
  }, 4000);
});

let optionsType = "";
async function loadTypeUnits() {
  const typeUnis = await getTypeUnits();
  if (typeUnis.code != 200) {
    console.log(`Error ${typeUnis.message}`);
  } else {
    // console.log(typeUnis.data);
    typeUnis.data.forEach((type) => {
      const { id, name } = type;
      optionsType += `
      <option value=${id}>${name}</option>
      `;
    });
    const type = document.getElementById("type-unit");
    type.innerHTML = optionsType;
  }
}

/**
 * @description Update Unit
 */
async function updateUnit(unitId) {
  if (confirm("¿Estás seguro de que deseas continuar?")) {
    const name = obtainId(`name_${unitId}`).textContent;
    const btn = obtainId(`btn_${unitId}`);
    const idCourse = btn.getAttribute("data-idcurso");
    const type = btn.getAttribute("data-type");

    const updateData = await updateUnitMentor({
      unitId,
      name,
      idCourse,
      type,
    });

    if (updateData.code != 200) {
      alert(`Error al actualizar al alumno ${unitId} ${name} `);
    } else {
      setTimeout(function () {
        succesPost.innerHTML = `
        <i class='bx bx-check-circle'></i>
        <p>Unidad actualizada con éxito</p>`;
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
  }
}

async function delUnit(unitId) {
  if (confirm("¿Estás seguro de que deseas eliminar este Parcial?")) {
    const deleteData = await deleteUnit({
      unitId,
    });

    if (deleteData.code != 200) {
      alert(`Error al eliminar la carrera ${unitId}`);
    } else {
      setTimeout(function () {
        succesPost.innerHTML = `
        <i class='bx bx-check-circle' ></i>
        <p>Parcial eliminado con éxito</p>`;
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
