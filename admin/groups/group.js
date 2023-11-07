"use strict";
let salida = "";
const succesPost = document.getElementById("succes-post");
const myTable = document.getElementById("tbody-grupos");
async function loadGroups() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idPeriod = urlParams.get("idPeriodo");
  const idCareer = urlParams.get("idCarrera");
  const hrefGroup = document.getElementById("per-group");
  const hrefCar = document.getElementById("car-group");
  console.log(hrefCar, hrefGroup);
  const groups = await getAll(idPeriod);

  if (groups.code !== 200) {
    alert(` ${newGroup.message}`);
  } else {
    groups.data.map((group) => {
      const { name, id } = group;
      salida += ` <tr>
      <td data-cell="Id">${id}</td>
      <td data-cell="Name">${name}</td>
      <td data-cell="Actions">
          <div class="actions">
          <button class="eliminar"><i class='bx bx-trash'></i></button>
          <button class="editar"><i class='bx bx-edit' ></i>
          <a href="../courses/course.html?idGroup=${id}&idCarrera=${idCareer}"><button
          <i class='bx bx-book'></i></button>
          </a>
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
  const name = document.getElementById("name-group-form").value;
  console.log(name);
  const data = { idPeriod, name };

  // Succes Post
  succesPost.innerHTML = `
   <i class='bx bx-loader-circle bx-spin' ></i>
   <p>Creando un nuevo Grupo...</p>
 `;
  succesPost.classList.add("aviso-click");
  const newGroup = await create(data);
  if (newGroup.code != 200) alert(`Error ${newGroup.message}`);
  else {
    succesPost.innerHTML = `
 <i class='bx bx-check-circle bx-tada' style="color:#38b000"></i>
   <p>Grupo: ${name} creado con éxito</p>
 `;
    succesPost.classList.add("aviso-click");
  }
  setTimeout(function () {
    location.reload();
  }, 4000);
});
