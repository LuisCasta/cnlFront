"use strict";
let salida = "";
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
      salida += `
              <tr>
                <td data-cell="ID" >${id}</td>
                <td data-cell="Name">${name}</td>
                <td data-cell="Description">${description}</td>
                <td data-cell="Actions">
                  <div class="actions">
                    <button data-id="${id}" class="eliminar"><i class='bx bx-trash'></i></button>
                    <button data-id="${id}" class="editar"><i class='bx bx-edit' ></i></button>
                  </div>
                </td>
              </tr>
            `;
    });
    tbody.innerHTML = salida;
  }
}

async function buildSelectSubjects(subjects) {
  let select;
  subjects.forEach((subject) => {
    const { Id, Materia, Periodo } = subject;
    select += `
    <option value="${Id}">${Materia} / ${Periodo}</option>
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
  // Envíamos valores en 0
  const task = "0";
  const exam = "0";
  const project = "0";

  const data = {
    name,
    description,
    idMentor,
    idSubject,
    idGroup,
    task,
    exam,
    project,
  };
  console.log(data);
  const newCurso = await create(data);
  if (newCurso.code != 200) {
    setTimeout(function () {
      succesPost.classList.add("aviso-click");
      succesPost.innerHTML = `
      <i class='bx bx-error' style="background-color:##FEE4E2;color:#D92D20;padding:10px;border-radius:8px"></i>
      <p>${newCurso.message}</p>`;
    }, 10);

    setTimeout(function () {
      succesPost.innerHTML = "";
      succesPost.classList.remove("aviso-click");
    }, 6500);
  } else {
    // alert(`ID de Carrera ${newCurso.data.id}`);

    setTimeout(function () {
      succesPost.innerHTML = `
      <i class='bx bx-check-circle' style="color:#039855;padding:10px;border-radius:8px"></i>
      <p>Carrera de ${newCurso.data.name} Creada con éxito</p>
    `;
      succesPost.classList.add("aviso-click");
    }, 100);

    setTimeout(function () {
      succesPost.innerHTML = "";
      succesPost.classList.remove("aviso-click");
    }, 6500);
  }
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
