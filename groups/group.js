"use strict";
let salida = "";
const myTable = document.getElementById("tbody-grupos");
async function loadGroups() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idPeriod = urlParams.get("idPeriodo");
  const groups = await getAll(idPeriod);
  if (groups.code !== 200) {
    alert(` ${newGroup.message}`);
  } else {
    groups.data.map((group) => {
      const { name, id } = group;
      salida += ` <tr>
      <td data-cell="Name">${name}</td>
      <td data-cell="FirstName">${id}</td>
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
