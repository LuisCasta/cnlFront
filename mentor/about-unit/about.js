"use strict";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idUnit = urlParams.get("idUnit");
const idMentor = urlParams.get("idMentor");
const idCourse = urlParams.get("idCurso");
const tbody = obtainId("table-lesson");
const succesPost = obtainId("succes-post");
const hrefUnidad = obtainId("href-unidad");
const tableAct = obtainId("table-activity");
const selectLesson = obtainId("lesson-id");
const tableStudent = obtainId("table-students");
const tableVideoCalls = obtainId("table-calls");
const selectTypeActivity = obtainId("type-activity");
// const hreMentor = document.getElementById("");

// console.log(idUnit);

let lessonHtml = "";
async function loadAllLessonsByUnit() {
  const lessons = await getAllByUnit(idUnit);

  if (lessons.code != 200) {
    // console.log(`Error ${newLesson.message}`);
  } else {
    const countlessons = obtainId("spanTitle");
    countlessons.textContent = lessons.data.length;
    lessons.data.forEach((lesson) => {
      const { name, description, id } = lesson;
      hrefUnidad.href = `../unit/unit.html?idCurso=${idCourse}&idUnit=${id}&idMentor=${idMentor}`;
      lessonHtml += `
        <tr>
            <td data-cell="Id">${id}</td>
            <td data-cell="Nombre">${name}</td>
            <td data-cell="Descripción">${description}</td>
            <td data-cell="Actions">
            <div class="actions">
              <button data-id="${id}" class="eliminar"><i class='bx bx-trash'></i></button>
              <button data-id="${id}" class="editar"><i class='bx bx-edit' ></i></button>
              </div>
          </td>
        </tr>
        `;

      // selectLesson += `
      //       <option value="${id}">${name}</option>
      //  `;
    });
    tbody.innerHTML = lessonHtml;
  }
}

// Mostrar en tabla las actividades

let activityHtml = "";
async function loadActivityByUnit() {
  const activities = await getByUnitActivity(idUnit);

  if (activities.code != 200) {
    console.log(`Error ${newActivity.message}`);
  } else {
    // const countlessons = document.getElementById("spanTitle");
    // countlessons.textContent = lessons.data.length;
    activities.data.forEach((activity) => {
      const { name, description, id, dateStart } = activity;
      const countActs = obtainId("countActs");
      countActs.textContent = activities.data.length;
      //   hrefUnidad.href = `../unit/unit.html?idCurso=${idCourse}&idUnit=${id}`;
      activityHtml += `
        <tr>
            <td data-cell="Id">${id}</td>
            <td data-cell="Nombre">${name}</td>
            <td data-cell="Descripción">${description}</td>
            <td data-cell="Inicio">${dateStart.slice(0, -14)}</td>
            <td data-cell="Revisar">
            <a href="../revisar/revisar.html?idCurso=${idCourse}&idUnit=${idUnit}&idMentor=${idMentor}&actStudId=${id}">
            <button>Revisar</button></a>
            </td>
        </tr>
        `;
      // console.log(activity.id);
    });
    tableAct.innerHTML = activityHtml;
  }
}

const btnCreateActivity = document.getElementById("agregar-actividad");
btnCreateActivity.addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name-activ").value;
  const description = obtainId("des-actividad").value;
  const dateStart = obtainId("inicio-act").value;
  const dateEnd = obtainId("fin-act").value;
  const intent = obtainId("intentos").value;
  const link = obtainId("link-activity").value;
  const type = obtainId("type-activity").value;
  const data = {
    idLesson: 6,
    name,
    type,
    description,
    dateStart,
    dateEnd,
    intent,
    link,
    idUnit,
    idCourse,
  };

  // Succes Post
  succesPost.innerHTML = `
 <i class='bx bx-loader-circle bx-spin' ></i>
 <p>Creando nueva Actividad...</p>
`;
  succesPost.classList.add("aviso-click");

  const newActivity = await createActivity(data);
  if (newActivity.code != 200) alert(`Error ${newActivity.message}`);
  else {
    succesPost.innerHTML = `
<i class='bx bx-check-circle bx-tada' style="color:#38b000"></i>
 <p>Actividad: ${name} creada con éxito</p>
`;
    succesPost.classList.add("aviso-click");
  }

  setTimeout(function () {
    location.reload();
  }, 4000);
});

//Listar las videollamadas
let videocalls = "";
async function loadVideoByIdCourse() {
  const callByCourse = await videoCallGetByCourse(idCourse);
  if (callByCourse.code != 200) {
  } else {
    callByCourse.data.forEach((call) => {
      const { name, description, link } = call;
      videocalls += `
      <tr>
      <td data-cell="Nombre">${name}</td>
      <td data-cell="Descripción">${
        description ? "null" || "undefined" : "Sin descripción"
      }</td>
      <td data-cell="Link"><button><a style="color:white;" target="_blank" href="${link}">Entrar</a></button></td>
      </td>
  </tr>
  `;
    });
    tableVideoCalls.innerHTML = videocalls;
  }
}

// Crear la videollamada
const btnCreatCall = obtainId("btn-createCall");
btnCreatCall.addEventListener("click", async (e) => {
  e.preventDefault();
  const name = obtainId("name-call").value;
  const description = obtainId("call-desc").value;
  const link = obtainId("link-call").value;

  const data = {
    link,
    name,
    description,
    idCourse,
  };
  // Succes Post
  succesPost.innerHTML = `
 <i class='bx bx-loader-circle bx-spin' ></i>
 <p>Creando nueva Videollamada...</p>
`;
  succesPost.classList.add("aviso-click");

  const newCall = await createVideoCall(data);
  if (newCall.code != 200) alert(`Error ${newCall.message}`);
  else {
    succesPost.innerHTML = `
<i class='bx bx-check-circle bx-tada' style="color:#38b000"></i>
 <p>Videollamada: ${name} creada con éxito</p>
`;
    succesPost.classList.add("aviso-click");
  }

  setTimeout(function () {
    location.reload();
  }, 4000);
});

//Listar los alumnos por Curso
let studentIdCourse = "";
async function loadStudentByIdCourse() {
  const studentsidCourse = await CourseStudGetByCourse(idCourse);
  if (studentsidCourse.code != 200) {
    // console.log(newStudentsIdCourse.message);
  } else {
    studentsidCourse.data.forEach((studentId) => {
      const { idStudent, name, firstName } = studentId;
      studentIdCourse += `
      <tr>
      <td data-cell="Id">${idStudent}</td>
      <td data-cell="Nombre">${name}</td>
      <td data-cell="Descripción">${firstName}</td>
      <td data-cell="Actions">
      <button><i class='bx bxs-user-check'></i></button>
      </td>
  </tr>
  `;
    });
    tableStudent.innerHTML = studentIdCourse;
  }
}

// TRAER EL TYPE ACTIVITY
let optionsType = "";
async function chooseTypeActivity() {
  const typeActivities = await getTypeActivity();
  // console.log(typeActivities.data);
  if (typeActivities.code !== 200) {
  } else {
    typeActivities.data.forEach((type) => {
      const { id, name } = type;
      optionsType += `
      <option value="${id}">${name}</option>`;
    });
    selectTypeActivity.innerHTML = optionsType;
  }
}
