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
        <td data-cell="Nombre de Unidad">${name}</td>
        <td data-cell="Tipo">${
          type === 1
            ? "Ordinaria"
            : type === 2
            ? "Cuatrimestral"
            : "ExtraOrdinario"
        }</td>
        <td data-cell="Agregar lección">
          <a  data-tooltip="Agregar lección" href="../lessons/lessons.html?idCurso=${idCourse}&idUnit=${id}"><button>
          <i class='bx bxs-file-plus'></i>
          </button></a>
        </td>
        <td data-cell="Acciones">
        <div class="actions">
          <button data-tooltip="Editar" data-id="${id}"><i class='bx bx-edit' ></i></button>
          <button data-tooltip="Eliminar" data-id="${id}"><i class='bx bx-trash' ></i></button>
        </div>
        </td>
        </tr>
     `;
    });
    tbody.innerHTML = unitHtml;
  }
  await loadTypeUnits();
}

// CREAR UNA NUEVA UNIDAD

document
  .getElementById("agregar-unidad")
  .addEventListener("click", async (e) => {
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
