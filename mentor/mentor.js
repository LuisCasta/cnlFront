"use strict";
let cursoMentorHtml = "";
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
      <td data-cell="Name">${name}</td>
      <td data-cell="Description">${description}</td>
      <td data-cell="Unidades" class="mentor-cog">
      <div>
       <a href="unit/unit.html?idCurso=${id}&idMentor=${idMentor}">
        <button data-id="${id}" class="unidad">
          <i class='bx bx-customize'></i>
        </button>
       </a>
       <a>
       <button data-id="${id}" class="unidadConfig">
       <i class='bx bx-cog'></i>
       </button>
       </a>
       </div>
      </td>
      <td data-cell="Actions">
        <div class="actions">
          <button data-id="${id}" class="eliminar"><i class='bx bx-trash'></i></button>
          <button data-id="${id}" class="editar"><i class='bx bx-edit' ></i></button>
        </div>
      </td>
    </tr>
  `;

      divCursos.innerHTML = cursoMentorHtml;
      let btnCourseConfig = document.querySelectorAll(".unidadConfig");
      console.log(btnCourseConfig);
      btnCourseConfig.forEach((el) => {
        el.addEventListener("click", () => {
          openModal(id, name);
        });
      });
      let modal = "";
      function openModal(id, name) {
        modal += `
          <form action="" id="${id}">
          <i class='bx bx-note bx-sm' class="icon-task"></i>
            <h4>Configura las calificaciones del Curso de ${name}</h4>
            <input id="task${id}" type="number" name="tarea" placeholder="tarea"/>
            <input id="test${id}" type="number" name="examen" placeholder="examen"/>
            <input id="project${id}" type="number" name="proyecto" placeholder ="proyecto"/>
            <button type="submit" id="btn-submit${id}">Enviar</button>
          </form>`;
        let mainBody = document.querySelector(".edit-course-rate");
        mainBody.innerHTML = modal;
        mainBody.classList.add("animaterate");
      }

      const btnEnviar = document.getElementById(`btn-submit${id}`);
      console.log(btnEnviar);

      function checkPorcentaje(id) {
        let task = document.getElementById(`task${id}`).value;
        let test = document.getElementById(`test${id}`).value;
        let project = document.getElementById(`project${id}`).value;
        console.log(task, test, project);
        let sumavalue = task + test + project;
        if (sumavalue != 100) {
          alert("Error: La suma tiene que dar 100");
        } else {
          console.log(`tu suma es: ${sumavalue}`);
        }
      }
    });
  }
}
