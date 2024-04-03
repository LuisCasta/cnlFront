"use strict";
let cursoHtml = "";
const tbody = document.getElementById("tbody-cursos");
const succesPost = document.getElementById("succes-post");
const fomSelect = document.getElementById("form-header");
const formMentor = document.getElementById("form-mentor");

// Params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idGroup = urlParams.get("idGroup");
const idCareer = urlParams.get("idCarrera");
async function loadCursos() {
  //   obtener cursos e info cursos
  const infoId = await getInfo(idCareer);
  await buildSelectSubjects(infoId.data);
  const cursos = await getAll(idGroup);

  //Obtener Mentores
  await obtenerIdMentor();

  if (cursos.code != 200) {
    alert(`Error ${newCurso.message}`);
  } else {
    const countCursos = document.getElementById("spanTitle");
    countCursos.textContent = cursos.data.length;
    cursos.data.map((curso) => {
      const { id, name, description } = curso;
      // console.log(
      //   `Id Carrera ${id} - name ${name} - description ${description}`);
      cursoHtml += `
              <tr>
                <td data-cell="Nombre de curso">${name}</td>
                <td data-cell="Descripción">${description}</td>
                <td data-cell="Unidades">
                 <a data-tooltip='Agregar/Gestionar unidad' href="../unit/unit.html?idCurso=${id}"><button data-id="${id}" class="unidad"><i class='bx bx-customize'></i></button></a>
                </td>
                <td data-cell="Actciones">
                  <div class="actions">
                    <button data-tooltip='Eliminar'  data-id="${id}" class="eliminar"><i class='bx bx-trash'></i></button>
                    <button data-tooltip='Editar' data-id="${id}" class="editar"><i class='bx bx-edit' ></i></button>
                  </div>
                </td>
              </tr>
            `;
    });
    tbody.innerHTML = cursoHtml;
  }
}

async function buildSelectSubjects(subjects) {
  let select;
  subjects.forEach((subject) => {
    const { Id, Materia, Periodo } = subject;
    select += `
    <option value="${Id}">${Periodo} - ${Materia}</option>
    `;
  });
  fomSelect.innerHTML = select;
}

//Función para Obtner los ids Mentor
async function obtenerIdMentor() {
  let mentorSelect;
  const mentores = await getAllMentor();
  mentores.data.forEach((mentor) => {
    const { id, name } = mentor;
    mentorSelect += `
        <option value=${id}>${name}</option>
        `;
  });
  formMentor.innerHTML = mentorSelect;
}

async function getCourseById(id) {
  const curso = await getById(id);

  if (curso.status != 200) alert(`Error al obtener el curso con el id ${id}`);
  else {
    const { name, description, id } = curso.data;

    return {
      name,
      id,
      description,
    };
  }
}

/**
 *
 * Btn create carrer
 *
 **/
const btnCurso = document.getElementById("agregar-curso");
btnCurso.addEventListener("click", async (e) => {
  e.preventDefault();
  //   const code = document.getElementById("idCarrera").value;
  const name = document.getElementById("name-curso-form").value;
  const description = document.getElementById("descripcion-curso").value;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idGroup = urlParams.get("idGroup");

  //   Obtner el id de Value de Subject
  const idSubject = document.querySelector("#form-header").value;

  //OBTENER EL ID DEL VALUE DEL MENTOR
  const idMentor = document.getElementById("form-mentor").value;
  // Envíamos valores en 0 de task, exam, proyect
  const data = {
    name,
    description,
    idMentor,
    idSubject,
    idGroup,
    task: 0,
    exam: 0,
    proyect: 0,
  };
  // Succes Post
  succesPost.innerHTML = `
   <i class='bx bx-loader-circle bx-spin' ></i>
   <p>Creando un nuevo curso...</p>
 `;
  succesPost.classList.add("aviso-click");
  const newCurso = await create(data);
  if (newCurso.code != 200) alert(`Error ${newCurso.message}`);
  else {
    succesPost.innerHTML = `
 <i class='bx bx-check-circle bx-tada' style="color:#38b000"></i>
   <p>Curso: ${name} creado con éxito</p>
 `;
    succesPost.classList.add("aviso-click");
  }
  setTimeout(function () {
    location.reload();
  }, 4000);
});

// EDITAR  CARRERA

async function modificarCarrera() {
  const data = await getAll();
  const { name, active, description } = data;
  const buttons = document.querySelectorAll(".editar");
  buttons.forEach((button) => {
    button.addEventListener("click", modificar);
    function modificar() {
      modifyCarrera.classList.add("opacityModificar");
      const div = document.createElement("div");
      const h3 = document.createElement("h3");
      h3.textContent = "Modificar Carrera";
      // const input =
    }

    aceptButton.addEventListener("click", ocultarModificarCarrera);
    function ocultarModificarCarrera() {
      modifyCarrera.classList.remove("opacityModificar");
    }
  });
}

// // BORRAR CARRERA

async function deleteCarrera() {
  const data = await getAll();
  const buttonsDelete = document.querySelectorAll(".eliminar");

  buttonsDelete.forEach((button) => {
    button.addEventListener("click", abrirDelete);
    function abrirDelete() {
      modalDelete.classList.add("opacityModificar");
    }
    aceptDelete.addEventListener("click", cerrarModalDelete);
    function cerrarModalDelete() {
      modalDelete.classList.remove("opacityModificar");
    }
  });
}
