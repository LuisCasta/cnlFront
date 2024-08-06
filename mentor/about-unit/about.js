"use strict";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idUnit = urlParams.get("idUnit");
const idCourse = urlParams.get("idCurso");
const tbody = obtainId("table-lesson");
const succesPost = obtainId("succes-post");
const hrefUnidad = obtainId("href-unidad");
const tableAct = obtainId("table-activity");
const selectLesson = obtainId("lesson-id");
const tableStudent = obtainId("table-students");
const tableRate = obtainId("table-rate");
// console.log(tableRate);
const tableVideoCalls = obtainId("table-calls");
const selectTypeActivity = obtainId("type-activity");

const hrefTarea = document.getElementById("href-unidad");
console.log(hrefTarea);
hrefTarea.href = `../unit/unit.html?idCurso=${idCourse}`;
// Mostrar en tabla las actividades

let activityHtml = "";
async function loadActivityByUnit() {
  const activities = await getByUnitActivity(idUnit);

  if (activities.code != 200) {
    console.log(`Error ${activities.message}`);
  } else {
    // const countlessons = document.getElementById("spanTitle");
    // countlessons.textContent = lessons.data.length;
    activities.data.forEach((activity) => {
      const { name, description, id, dateStart, dateEnd } = activity;
      const countActs = obtainId("countActs");
      countActs.textContent = activities.data.length;
      const newDate = dateStart.slice(0, -14).replaceAll("-", "/");
      const endDate = dateEnd.slice(0, -14).replaceAll("-", "/");

      //   hrefUnidad.href = `../unit/unit.html?idCurso=${idCourse}&idUnit=${id}`;
      activityHtml += `
        <tr>
            <td data-cell="Nombre"><p class="name-activity">${name}</p></td>
            <td data-cell="Descripción"><p>${description}</p></td>
            <td data-cell="Inicio"><p class="p-date"><i class='bx bx-calendar'></i>${newDate}</p></td>
            <td data-cell="Finaliza"><p class="p-date"><i class='bx bx-calendar'></i>${endDate}</p></td>
            <td data-cell="Acciones">
            <div class='actions'>
            <a data-tooltip="Revisar" class='check' href="../revisar/revisar.html?idCurso=${idCourse}&idUnit=${idUnit}&idActivity=${id}">
            <i class='bx bx-check-double'></i>
            </a>
                <button onclick="delActivity(${id})" class='edit'>
                <i class='bx bx-trash'></i>
              </button>
            </div>
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
  const data = {
    idLesson: 6,
    name,
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
      <td data-cell="Nombre"><p>${name}</p></td>
      <td data-cell="Descripción"><p> ${
        description == null || undefined ? "Sin descripción" : description
      }</p></td>
      <td data-cell="Link"><a data-tooltip="Entrar" class="check" style="color:white;" target="_blank" href="${link}"><i class='bx bx-link-external'></i></a></td>
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

//Calificaciones de alumnos por Curso
let ratesStudentByCourse = "";
async function guardarRate(idStudent) {
  const score = document.getElementById(`ide-${idStudent}`).value;
  console.log(score);
  if (score == "" || score == undefined || score == null) {
    succesPost.innerText = "Error, la calificación es inválida";
  } else {
    const savedRate = await postDataC("unitStudent/", {
      idUnit,
      idStudent,
      score,
    });
    console.log(savedRate.config.data);
    // console.log(savedRate.config.data);
    if (savedRate.status != 200)
      return {
        code: 400,
        message: `Error al enviar la calificación`,
        error: savedRate.data.message,
      };
    else {
      succesPost.innerHTML = `
        <i class='bx bx-check-circle bx-tada' style="color:#38b000"></i>
        <p>Calificación guardada</p>
        `;
      succesPost.classList.add("aviso-click");
    }

    // setTimeout(function () {
    //   location.reload();
    // }, 4000);

    return { code: 200, data: savedRate.data.data };
  }
}
async function loadRateStudentByUnit() {
  const allRates = await getAllRatesByUnit(idUnit);
  if (allRates.code != 200) {
    // console.log(newStudentsIdCourse.message);
  } else {
    allRates.data.forEach((rate) => {
      const { firstName, name, califRecomend, calif, idStudent } = rate;
      console.log(rate);
      ratesStudentByCourse += `
      <tr>
         <td data-cell="Nombre"><p>${name} ${firstName}</p></td>
          <td data-cell="calificación recomendada"><p>${
            califRecomend == undefined ? "sin recomendación" : califRecomend
          }</p></td>
          <td data-cell="Calificación"><input data-tooltip="editar" class="rateEdit" id=ide-${idStudent} value=${calif} class="input-promf"/></td>
          <td data-cell="Acciones">
            <a class="sendRate" onclick="guardarRate(${idStudent})";"><i class='bx bxs-user-check'></i>Guardar</a>
          </td>
      </tr>`;
      tableRate.innerHTML = ratesStudentByCourse;
    });
  }
}

//Guarda Calificaciones Parciales de un curso

// TRAER EL TYPE ACTIVITY

/**
 *
 * @descripction Eliminar Actividad
 */
async function delActivity(activityId) {
  if (confirm("¿Estás seguro de que deseas eliminar esta Actividad?")) {
    const deleteData = await deleteActivity({
      activityId,
    });

    if (deleteData.code != 200) {
      alert(`Error al eliminar la Actividad ${activityId}`);
    } else {
      setTimeout(function () {
        succesPost.innerHTML = `
        <i class='bx bx-check-circle' ></i>
        <p>Actividad eliminada con éxito</p>`;
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
