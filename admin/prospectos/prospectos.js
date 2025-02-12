"use strict";
const succesPost = document.getElementById("succes-post");
const btnProspects = document.getElementById("btn-prospectos");
btnProspects.addEventListener("click", loadprospects);
async function loadprospects() {
  console.log("1");
  let salida = "";
  const myTable = document.getElementById("tbody-data");
  myTable.innerHTML = "";
  const status = document.getElementById("status-prospect").value;
  console.log(status);
  const prospects = await getAllProspects(status);
  console.log("2", prospects.data);
  // console.log(prospects.data);
  if (prospects.code !== 200) {
    alert(`Error ${prospects.message}`);
  } else {
    prospects.data.map((prospect) => {
      const amountprospects = document.getElementById("spanTitle");
      amountprospects.textContent = prospects.data.length;
      const { name, firstName, email, id, phone, secondName, status, career } =
        prospect;
      salida += `
      <tr>
        <td data-cell="Name">
         <p id='name_${id}' class="edit-input" contenteditable="true" data-tooltip="editar" spellcheck="false">${name}</p>
        </td>
        <td data-cell="FirstName">
          <p id='first-name_${id}' class="edit-input" data-tooltip="editar" contenteditable="true" spellcheck="false">${firstName}</p>
        </td>
         <td data-cell="FirstName">
          <p id='second-name_${id}' class="edit-input" data-tooltip="editar" contenteditable="true" spellcheck="false">${secondName}</p>
        </td>
        <td data-cell="email">
          <p id='email_${id}' class="edit-input" data-tooltip="editar" contenteditable="true" spellcheck="false">${email}</p>
        </td>
         <td data-cell="email">
          <p id='phone_${id}' class="edit-input" data-tooltip="editar" contenteditable="true" spellcheck="false">${phone}</p>
        </td>
         <td data-cell="email">
          <p id='carrera_${id}' class="edit-input" data-tooltip="editar" contenteditable="true" spellcheck="false">${
        career == null ? "Sin carrera" : career
      }</p>
        </td>
        <td data-cell="status">
          <p id='status_${id}' class="edit-input" data-tooltip="editar" contenteditable="true" spellcheck="false">${
        status == 1
          ? "Nuevo"
          : status == 2
          ? "pendiente"
          : status == 3
          ? "aceptado"
          : status == 4
          ? "rechazado"
          : "inválido"
      }</p>
        </td>   
        <td data-cell="Acciones">
            <div class="actions">
            <i class='bx bx-edit' ></i>
            </button>
            </div>
        </td>
       </tr>
  `;
      myTable.innerHTML = salida;
    });
  }
}
/* <button onclick="updateAlumno(${id})" data-tooltip="Editar" class="edit">  <td class='td-select' data-cell="Seleccionar">  <button onclick="deleteAlumno(${id})" data-tooltip="Eliminar" class="edit">
            <i class='bx bxs-trash' ></i>
            </button> <input value=${id} type="checkbox" class="chk-alumno"/></>*/
