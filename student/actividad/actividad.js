"use strict";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idStudent = urlParams.get("idStudent");
const tEvent = document.getElementById("t-Activ");
const idCurso = document.getElementById("IdCourse");
let tableHtml = "";
async function LoadActivitiesAgendaStudent() {
  const activitiesStudent = await getByCourseActivityStudent(
    idStudent,
    idCurso
  );
  if (activitiesStudent.code != 200) {
    alert(`Error ${newactivitiesStudent.message}`);
  } else {
    activitiesStudent.data.forEach((activities) => {
      const { name, typeActivity, estatus, dateEnd } = activities;
      tableHtml += `
      <tr>
        <td data-cell="Tipo">
            <div class="type-event">
            <p><i class="bx bx-note"></i>${typeActivity}</p>
            </div>
        </td>
        <td data-cell="Descripción">${name}</td>
        <td data-cell="Fecha">${dateEnd}</td>
        <td data-cell="Estatus">${estatus}</td>
        <td data-cell="Acciones">
           <div class="actions">
              <a href="../presentar/presentar-actividad.html?idStudent=${idStudent}">Presentar</a>
            </div>
         </td>
     </tr>
      `;
    });

    tEvent.innerHTML = tableHtml;
  }
}
