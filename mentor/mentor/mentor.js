"use strict";
let cursoMentorHtml = "";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idMentor = urlParams.get("idMentor");
const divCursos = obtainId("static-div");

const closeModalRate = obtainId("close-modal-rate");

async function loadCursosById() {
  const cursoMentor = await getCourseByMentor(idMentor);
  if (cursoMentor.code != 200) {
    alert(`Error ${cursoMentor.message}`);
  } else {
    cursoMentor.data.forEach((curso) => {
      const { id, name, description } = curso;
      //   const modalPonderacion = `<a data-tooltip="Ponderación" class="ponderaciones unidadConfig edit" id="${id}" name_${id}=${name} description_${id}=${description} task_${id}=${task} proyect_${id}=${proyect} exam_${id}=${exam} >
      //   <i class='bx bxs-cog' ></i>
      // </a>`;
      cursoMentorHtml += `
      <div class="alumnos calificaciones content-static">
            <h5>${name}</h5>
            <p class="p-asign">${description}</p>
            <a class="a-static" href="../tareas/activas.html?idCurso=${id}&idMentor=${idMentor}" 
            data-id="${id}">
             entrar<i class='bx bx-customize'></i>
            </a>
          </div> 
  `;

      divCursos.innerHTML = cursoMentorHtml;

      let btnCourseConfig = document.querySelectorAll(".unidadConfig");
      let modalCourse = document.querySelector(".edit-course-rate");

      // console.log(btnCourseConfig);
      btnCourseConfig.forEach((el) => {
        el.addEventListener("click", (e) => {
          modalCourse.classList.add("animaterate");
          openModal(e.target.id);
          console.log(e.target.id);
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
          console.log(`is Updated ${isUpdated.status}`);

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

const asignaturas = obtainId("asignaturas");
async function loadNotices() {
  const noticias = await getAllNotice();
  console.log(noticias);
  let noticesHtml = "";
  noticias.data.data.data.forEach((advice) => {
    const { notice, createdAt } = advice;
    const newDate = createdAt.slice(0, -14).replaceAll("-", "/");
    noticesHtml = `
    <div class="notification">
    <div class="name-notify">
      <h6>Aviso</h6>
      <label>${notice}</label>
    </div>
    <div class="fecha">
      <h6>fecha de publicación</h6>
      <p>${newDate}</p>
    </div>
  </div>
    `;
  });
  asignaturas.innerHTML = noticesHtml;
}
