"use strict";
let salida = "";
const succesPost = document.getElementById("succes-post");
const myTable = document.getElementById("tbody-grupos");
async function loadGroups() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idPeriod = urlParams.get("idPeriodo");
  console.log(idPeriod);
  const groups = await getAll(idPeriod);
  console.log(groups.data);
  if (groups.code !== 200) {
    alert(` ${newGroup.message}`);
  } else {
    groups.data.map((group) => {
      const { name, id } = group;
      salida += ` <tr>
      <td data-cell="Name">${id}</td>
      <td data-cell="FirstName">${name}</td>
      <td data-cell="Actions">
          <div class="actions">
          <button class="eliminar"><i class='bx bx-trash'></i></button>
          <button class="editar"><i class='bx bx-edit' ></i></button>
          </div>
      </td>
     </tr>`;
    });
    myTable.innerHTML = salida;
  }
}

// Obtener periodo por ID

async function getGroupById(id) {
  const group = await getById(id);

  if (group.status != 200) alert(`Error al obtener el grupo con el id ${id}`);
  else {
    const { name, idPeriod } = group.data;

    return {
      name,
      idPeriod,
    };
  }
}

// CREAR GRUPO
const btnGroup = document.getElementById("agregar-grupo");

btnGroup.addEventListener("click", async (e) => {
  e.preventDefault();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idPeriod = urlParams.get("idPeriodo");
  const name = document.getElementById("name-group").value;

  const data = { idPeriod, name };

  const newGroup = await create(data);
  if (newGroup.code != 200) {
    setTimeout(function () {
      succesPost.classList.add("aviso-click");
      succesPost.innerHTML = `
        <i class='bx bx-error' style="background-color:##FEE4E2;color:#D92D20;padding:10px;border-radius:8px"></i>
        <p>${newGroup.message}</p>`;
    }, 10);

    setTimeout(function () {
      succesPost.innerHTML = "";
      succesPost.classList.remove("aviso-click");
    }, 6500);
  } else {
    alert(`ID de Periodo ${newGroup.data.id}`);
    setTimeout(function () {
      succesPost.innerHTML = `
        <i class='bx bx-check-circle' style="color:#039855;padding:10px;border-radius:8px"></i>
        <p>Carrera de ${newGroup.data.name} Creada con éxito</p>
      `;
      succesPost.classList.add("aviso-click");
    }, 100);

    setTimeout(function () {
      succesPost.innerHTML = "";
      succesPost.classList.remove("aviso-click");
    }, 6500);
  }
});
