"use strict";
let cursoMentorHtml = "";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idMentor = urlParams.get("idMentor");
const divCursos = obtainId("tbody-cursos");
const closeModalRate = obtainId("close-modal-rate");

async function loadCursosById() {
  const cursoMentor = await getCourseByMentor(idMentor);
  if (cursoMentor.code != 200) {
    alert(`Error ${newCursoMentor.message}`);
  } else {
    cursoMentor.data.forEach((curso) => {
      const { id, name, description, task, proyect, exam } = curso;
      cursoMentorHtml += `<tr>
      <td data-cell="Name">${name}</td>
      <td data-cell="Description">${description}</td>
      <td data-cell="Unidades" class="mentor-cog">
      <div>
       <a href="../unit/unit.html?idCurso=${id}&idMentor=${idMentor}">
        <button data-id="${id}" class="unidad">
          <i class='bx bx-customize'></i>
        </button>
       </a>
       <a>
       <button id="${id}" name_${id}=${name} description_${id}=${description} task_${id}=${task} proyect_${id}=${proyect} exam_${id}=${exam} class="unidadConfig">
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
      let modalCourse = document.querySelector(".edit-course-rate");

      // console.log(btnCourseConfig);
      btnCourseConfig.forEach((el) => {
        el.addEventListener("click", (e) => {
          modalCourse.classList.add("animaterate");
          openModal(e.target.id);
          // console.log(e.target.id);
        });
      });

      function openModal(id) {
        const buttonModal = document.getElementById(id);
        // console.log(buttonModal);
        let task = buttonModal.getAttribute(`task_${id}`);
        let exam = buttonModal.getAttribute(`exam_${id}`);
        let proyect = buttonModal.getAttribute(`proyect_${id}`);
        let name = buttonModal.getAttribute(`name_${id}`);
        let description = buttonModal.getAttribute(`description_${id}`);
        let inputExam = obtainId("exam");
        let inputTask = obtainId("task");
        let inputProyect = obtainId("proyect");
        let inputName = obtainId("nameModal");
        let inputDescription = obtainId("descriptionModal");
        let idHide = obtainId("elementId");

        inputExam.value = exam;
        inputTask.value = task;
        inputProyect.value = proyect;
        idHide.value = id;
        inputName.value = name;
        inputDescription.value = description;
      }

      const btnEnviar = obtainId("btn-guardar-config-curso");
      // console.log(btnEnviar);

      btnEnviar.addEventListener("click", checkPorcentaje);

      async function checkPorcentaje() {
        const id = obtainId("elementId").value;
        const task = parseInt(obtainId("task").value);
        const proyect = parseInt(obtainId("proyect").value);
        const exam = parseInt(obtainId("exam").value);

        const name = obtainId("nameModal").value;
        const description = obtainId("descriptionModal").value;

        let sumavalue = parseInt(task + exam + proyect, 10);

        if (sumavalue != 100) {
          alert("Error: La suma tiene que dar 100");
        } else {
          const data = {
            courseId: id,
            name,
            description,
            task,
            exam,
            proyect,
          };
          const isUpdated = await updateCourse(data);
          console.log(`isPudated ${isUpdated.status}`);

          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      }
    });
  }
}

closeModalRate.addEventListener("click", closerModal);
function closerModal() {
  let modalCourse = document.querySelector(".edit-course-rate");
  modalCourse.classList.remove("animaterate");
}
