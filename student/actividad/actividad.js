"use strict";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idStudent = urlParams.get("idStudent");
const tEvent = obtainId("t-Activ");
const tVideo = obtainId("t-videocall");

const idCourse = urlParams.get("idCourse");
let tableHtml = "";
async function LoadActivitiesAgendaStudent() {
  const activitiesStudent = await getByCourseActivityStudent(
    idStudent,
    idCourse
  );
  if (activitiesStudent.code != 200) {
    alert(`Error ${newactivitiesStudent.message}`);
  } else {
    activitiesStudent.data.forEach((activities) => {
      const { name, typeActivity, estatus, dateEnd, idActStu, id } = activities;
      const newDateEnd = dateEnd.slice(0, -14).replaceAll("-", "/");
      const formatStatus = estatus.toLowerCase();
      tableHtml += `
      <tr>
        <td data-cell="Tipo">
            <div class="type-event">
            <p><i class="bx bx-note"></i>${typeActivity}</p>
            </div>
        </td>
        <td data-cell="Nombre"><p class="name-activ">${name.toUpperCase()}</p></td>
        <td data-cell="Fecha entrega">
         <p class="date-Activity"><i class='bx bx-calendar'></i>${newDateEnd}</p></td>
        <td data-cell="Estatus"><p class=${
          estatus === "NUEVO" ? "nuevo" : "send-act"
        }>${formatStatus[0].toUpperCase() + formatStatus.slice(1)}</p></td>
        <td data-cell="Acciones">
           <div class="actions">
              <a href="../presentar/presentar-actividad.html?idStudent=${idStudent}&idCourse=${idCourse}&idActMentor=${id}&idActStudent=${idActStu}">Presentar</a>
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
    alert(`Error ${newVideoCalls.message}`);
  } else {
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
