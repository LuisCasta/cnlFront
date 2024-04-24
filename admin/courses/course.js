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
      const { id, name, description, idGroup, idMentor, proyect, task, exam } =
        curso;

      cursoHtml += `
              <tr>
                <td data-cell="Nombre de curso">
                  <input id='name_${id}' value=${name}>
                </td>
                <td data-cell="Descripción">
                  <input id='description_${id}' value=${description}>
                </td>
                <td data-cell="Unidades">
                 <a data-tooltip='Agregar/Gestionar unidad' href="../unit/unit.html?idCurso=${id}">
                  <button data-id="${id}" class="unidad">
                  <i class='bx bx-customize'></i>
                  </button></a>
                </td>
                <td data-cell="Acciones">
                  <div class="actions">
                    <button onclick="upCurso(${id})" 
                      data-idgroup=${idGroup} 
                      data-idmentor=${idMentor} 
                      data-proyect=${proyect}  
                      data-task=${task}  
                      data-exam=${exam}  
                      data-tooltip='Editar' 
                      id='btn_${id}' 
                      class="editar">
                      <i class='bx bx-edit'></i>
                    </button>
                    <button onclick="delCurso(${id})" data-tooltip='Eliminar'  
                     data-id="${id}" class="eliminar"><i class='bx bx-trash'></i>
                    </button>
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
    const { id, name, firstName } = mentor;
    mentorSelect += `
        <option value=${id}>${name} ${firstName}</option>
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

// Update
async function upCurso(courseId) {
  if (confirm("¿Estás seguro de que deseas continuar?")) {
    const name = obtainId(`name_${courseId}`).value;
    const description = obtainId(`description_${courseId}`).value;
    const btn = obtainId(`btn_${courseId}`);
    console.log(btn);
    const task = btn.getAttribute("data-task");
    const idGroup = btn.getAttribute("data-idgroup");
    const idMentor = btn.getAttribute("data-idmentor");
    const proyect = btn.getAttribute("data-proyect");
    const exam = btn.getAttribute("data-exam");

    const updateData = await updateCourseAdmin({
      courseId,
      name,
      description,
      task,
      exam,
      proyect,
      idGroup,
      idMentor,
    });

    if (updateData.code != 200) {
      alert(`Error al actualizar el grupo ${courseId} ${name} `);
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

async function delCurso(courseId) {
  if (confirm("¿Estás seguro de que deseas eliminar este Grupo?")) {
    const deleteData = await deleteGroup({
      courseId,
    });

    if (deleteData.code != 200) {
      alert(`Error al eliminar el Grupo ${courseId}`);
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
