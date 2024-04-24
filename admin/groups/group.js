"use strict";
let salida = "";
const succesPost = document.getElementById("succes-post");
const myTable = document.getElementById("tbody-grupos");
async function loadGroups() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idPeriod = urlParams.get("idPeriodo");
  const idCareer = urlParams.get("idCarrera");
  // const hrefGroup = document.getElementById("per-group");
  // const hrefCar = document.getElementById("car-group");
  const groups = await getAll(idPeriod);

  if (groups.code !== 200) {
    alert(` ${newGroup.message}`);
  } else {
    groups.data.map((group) => {
      const { name, id } = group;
      salida += ` <tr>
      <td data-cell="Nombre de Grupo"><input id='name_${id}' value=${name}></td>
      <td data-cell="Acciones">
          <div class="actions">
          <a  data-tooltip='Agregar curso' href="../courses/course.html?idGroup=${id}&idCarrera=${idCareer}"><button
          <i class='bx bx-book'></i></button>
          </a>
          <button onclick="upGroup(${id})" data-tooltip='Editar' class="editar"><i class='bx bx-edit' ></i>
          <button onclick="delGroup(${id})" data-tooltip='Eliminar' class="eliminar"><i class='bx bx-trash'></i></button>
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

// Update
async function upGroup(groupId) {
  if (confirm("¿Estás seguro de que deseas continuar?")) {
    const name = obtainId(`name_${groupId}`).value;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idPeriod = urlParams.get("idPeriodo");

    const updateData = await updateGroup({
      idPeriod,
      name,
      groupId,
    });

    if (updateData.code != 200) {
      alert(`Error al actualizar el grupo ${groupId} ${name} `);
    } else {
      setTimeout(function () {
        succesPost.innerHTML = `
        <i class='bx bx-check-circle'></i>
        <p>Grupo actualizado con éxito</p>`;
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

async function delGroup(groupId) {
  if (confirm("¿Estás seguro de que deseas eliminar este Grupo?")) {
    const deleteData = await deleteGroup({
      groupId,
    });

    if (deleteData.code != 200) {
      alert(`Error al eliminar el Grupo ${groupId}`);
    } else {
      setTimeout(function () {
        succesPost.innerHTML = `
        <i class='bx bx-check-circle' ></i>
        <p>Grupo eliminado con éxito</p>`;
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
