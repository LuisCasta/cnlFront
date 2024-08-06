"use strict";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idStudent = urlParams.get("idStudent");
const idActivity = urlParams.get("idActivity");
const idUnit = urlParams.get("idUnit");

const tEvent = obtainId("t-Activ");
const tVideo = obtainId("t-videocall");
const tCalif = obtainId("t-cali");

const idCourse = urlParams.get("idCourse");

async function LoadActivitiesAgendaStudent() {
  let tableHtml = "";
  const activitiesStudent = await getByCourseActivityStudent(idUnit);
  if (activitiesStudent.code != 200) {
    alert(`Error ${activitiesStudent.message}`);
  } else {
    console.log(activitiesStudent.data);
    const numberRate = obtainId("spanTitle");
    if (activitiesStudent.data.length > 0) {
      numberRate.textContent = "0";
    } else if (activitiesStudent.data.length < 0) {
      numberRate.textContent = activitiesStudent.data.length;
    }
    activitiesStudent.data.forEach((activities) => {
      const { name, dateEnd, id, description, idUnit } = activities;
      const newDateEnd = dateEnd.slice(0, -14).replaceAll("-", "/");
      tableHtml += `
      <tr>
      <td data-cell="Nombre"><p class="name-activ">${name.toUpperCase()}</p></td>
        <td data-cell="Descripción">
            <div class="type-event">
            <p><i class="bx bx-note"></i>${description}</p>
            </div>
        </td>
        
        <td data-cell="Fecha entrega">
         <p class="date-Activity"><i class='bx bx-calendar'></i>${newDateEnd}</p></td>
        <td data-cell="Acciones">
           <div class="actions">
              <a class="presentar" href="../presentar/presentar-actividad.html?&idCourse=${idCourse}&idActivity=${id}&idUnit=${idUnit}">Presentar<i class='bx bxs-edit' ></i></a>
            </div>
         </td>
     </tr>
      `;
    });

    tEvent.innerHTML = tableHtml;
  }
}

// Pinta las videollamadas

let tableVcHtml = "";
async function videoCallByCourse() {
  const videoCalls = await videoCallGetByCourse(idCourse);
  if (videoCalls.code != 200) {
    alert(`Error ${videoCalls.message}`);
  } else {
    const numberRate = obtainId("spanTitle-vc");
    if (videoCalls.data.length >= 0) {
      numberRate.innerHTML = "<i class='bx bx-video-off' ></i>";
    } else if (videoCalls.data.length < 0) {
      numberRate.textContent = videoCalls.data.length;
    }

    videoCalls.data.forEach((calls) => {
      const { name, link, description } = calls;
      tableVcHtml += `
      <tr>
        <td data-cell="Nombre">
            <div class="type-event">
            <p><i class="bx bx-note"></i>${name}</p>
            </div>
        </td>
        <td data-cell="Descripción">${
          description === null || undefined || ""
            ? "No hay descripción"
            : description
        }</td>
        <td data-cell="Link"><a class="link-videocalls" href="${link}">Entrar<a></td>
         </td>
     </tr>
      `;
    });

    tVideo.innerHTML = tableVcHtml;
  }
}

async function RateByCourseStudent() {
  let tableRateHtml = "";
  const rates = await obtainRateByIdStudent(idStudent, idCourse);
  if (rates.code != 200) {
    alert(`Error ${rates.message}`);
  } else {
    // console.log(rates.data);
    const numberRate = obtainId("spanTitle-rate");
    numberRate.textContent = rates.data.length;
    rates.data.forEach((calls) => {
      const { name, percentage, score } = calls;
      tableRateHtml += `
      <tr>
        <td data-cell="Nombre">
            <div class="type-event">
            <p><i class="bx bx-note"></i>${name}</p>
            </div>
        </td>
       
        <td data-cell="Evaluación tarea activa"><p>${score}<p></td>
         </td>
     </tr>
      `;
    });

    tCalif.innerHTML = tableRateHtml;
  }
}

/* <td data-cell="Promedio"><p>${percentage}</p></td> */
