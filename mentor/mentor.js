"use strict";
let cursoMentorHtml;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idMentor = urlParams.get("idMentor");
const divCursos = document.getElementById("tbody-cursos");

async function loadCursosById() {
  const cursoMentor = await getCourseByMentor(idMentor);
  if (cursoMentor.code != 200) {
    alert(`Error ${newCursoMentor.message}`);
  } else {
    cursoMentor.data.forEach((curso) => {
      const { id, name, description } = curso;
      cursoMentorHtml += `<tr>
      <td data-cell="ID" >${id}</td>
      <td data-cell="Name">${name}</td>
      <td data-cell="Description">${description}</td>
      <td data-cell="Unidades">
       <a href="unit/unit.html?idCurso=${id}&idMentor=${idMentor}">
        <button data-id="${id}" class="unidad">
          <i class='bx bx-customize'></i>
        </button>
       </a>
      </td>
      <td data-cell="Actions">
        <div class="actions">
          <button data-id="${id}" class="eliminar"><i class='bx bx-trash'></i></button>
          <button data-id="${id}" class="editar"><i class='bx bx-edit' ></i></button>
        </div>
      </td>
    </tr>
  `;
    });
    divCursos.innerHTML = cursoMentorHtml;
  }
}
