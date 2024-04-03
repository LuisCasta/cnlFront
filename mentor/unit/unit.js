"use strict";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idCourse = urlParams.get("idCurso");
const idMentor = urlParams.get("idMentor");
const tbody = document.getElementById("unit-table");
const succesPost = document.getElementById("succes-post");
const hrefMentor = document.getElementById("href-mentor");
// console.log(idMentor);
let unitHtml = "";
// CARGAR UNIDADES DEL GRUPO
async function loadUnit() {
  const units = await getAllByCourse(idCourse);
  if (units.code != 200) {
    // console.log(`Error ${newunits.message}`);
  } else {
    const countlessons = document.getElementById("spanTitle");
    countlessons.textContent = units.data.length;
    // console.log(units.data);
    units.data.forEach((unidad) => {
      const { id, type, name } = unidad;
      hrefMentor.href = `../mentor/mentor.html?idMentor=${idMentor}`;
      unitHtml += `
      <tr>
        <td data-cell="Nombre de la unidad">${name}</td>
        <td data-cell="Tipo de unidad">${
          type === 1
            ? "Ordinario"
            : type === 2
            ? "Cuatrimestral"
            : "Extraordinario"
        }</td>
        <td data-cell="Gestionar unidad">
          <a class="a-unit" href="../about-unit/about.html?idCurso=${idCourse}&idUnit=${id}&idMentor=${idMentor}"><i class='bx bx-cog'></i><p>Gestionar</p></a>
        </td>
        <td data-cell="Acciones">
        <div class="actions">
          <button data-tooltip='Editar' data-id="${id}" id="btn${id}" ><i class='bx bx-edit' ></i></button>
          <button data-tooltip='Eliminar' data-id="${id}"><i class='bx bx-trash' ></i></button>
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
