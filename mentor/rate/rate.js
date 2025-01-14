const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const idUnit = urlParams.get("idUnit");
const buttonSearch = document.querySelector(".search-rate");
const selectCourse = document.getElementById("select-course");
const tabEnd = document.getElementById("table-rate-final");
let user = localStorage.getItem("user");
let idMentor = 0;
if (user) {
  user = JSON.parse(user);
  idMentor = user.id;
} else {
  window.location.replace("../../index.html");
}
const succesPost = document.getElementById("succes-post");

let cursoMentorHtml = "";
async function loadCursosById() {
  const cursoMentor = await getCourseByMentor(idMentor);
  if (cursoMentor.code != 200) {
    alert(`Error ${cursoMentor.message}`);
  } else {
    cursoMentor.data.forEach((curso) => {
      const { id, name } = curso;
      cursoMentorHtml += `
      <option value=${id}>${name[0].toUpperCase() + name.slice(1)}</option>
    `;
      selectCourse.innerHTML = cursoMentorHtml;
    });
  }
  buttonSearch.addEventListener("click", async (e) => {
    transferButton.classList.add("showbtn");
    let taBendRate = "";
    const trHeaders = document.getElementById("headers-rate");
    e.preventDefault(e);
    const courseSelect = selectCourse.value;
    // console.log(courseSelect);
    const printCalif = await getEndRateByCourse(courseSelect);
    if (printCalif.code != 200) {
      alert(`Error ${printCalif.message}`);
    } else {
      let countTA = [];
      let headersHtml = `<td>Nombre TA</td>`;
      if (printCalif.data.headers.length > 0) {
        // console.log("1");
        printCalif.data.headers.forEach((header) => {
          const { nameUnit, idUnit } = header;
          headersHtml += `
          <td data-cell="TA">${nameUnit}</td>
          `;
          countTA.push(idUnit);
        });
      }

      headersHtml += `
      <th data>Promedio calculado</th>
      <th>Calificación final</th>
      <th>Enviar Calificación</th>
      `;
      // console.log(headersHtml);
      trHeaders.innerHTML = headersHtml;
      // console.log(printCalif.data);
      printCalif.data.data.forEach((rate) => {
        const {
          idStudent,
          idCS,
          calif,
          name,
          firstName,
          califRecomend,
          listCalif,
        } = rate;
        taBendRate += `
            <tr>
                <td data-cell="Alumno"><p>${name} ${firstName}</p></td>
            `;
        // console.log(countTA);
        countTA.forEach((count) => {
          const aux = listCalif.filter((calif) => {
            return calif.id == count;
          });
          taBendRate += `<td data-cell="Tarea"><p>${aux[0].califRecomend}</p></td>`;
        });
        taBendRate += `
            <td data-cell="Recomendada" ><p class="promedio-calculado" >${califRecomend}</p></td>
            <td data-cell="Final" ><p class="calificacion-final" id="califFinal_${idStudent}" contenteditable='true'>${calif}</p></td>
            <td data-cell="Guardar"><button onclick="btnGuardar(${idStudent},${idCS})">Enviar</button></td>
            `;
        tabEnd.innerHTML = taBendRate;
      });
    }
  });

  const transferButton = document.getElementById("btn-promedio");

  transferButton.addEventListener("click", () => {
    const rows = document.querySelectorAll("tbody tr"); // Selecciona todas las filas del cuerpo de la tabla

    rows.forEach((row) => {
      const promedioCell = row.querySelector(".promedio-calculado"); // Encuentra la celda de Promedio Calculado
      const calificacionFinalCell = row.querySelector(".calificacion-final"); // Encuentra la celda de Calificación Final

      if (promedioCell && calificacionFinalCell) {
        calificacionFinalCell.textContent = promedioCell.textContent; // Transfiere el valor
      }
    });
  });
}

async function btnGuardar(idStudent, idCS) {
  if (confirm("¿Estás seguro de que deseas continuar?")) {
    const score = document.getElementById(
      `califFinal_${idStudent}`
    ).textContent;
    const updateRate = await saveRatebyStudentFinal({
      idStudent,
      idCourse: idCS,
      score,
    });
    console.log(updateRate);
    if (updateRate.code != 200) {
      alert(`Error al actualizar la Calificación`);
    } else {
      setTimeout(function () {
        succesPost.innerHTML = `
        <i class='bx bx-check-circle'></i>
        <p>Calificación actualizada con éxito</p>`;
        succesPost.classList.add("aviso-click");
      }, 100);
      setTimeout(function () {
        succesPost.innerHTML = "";
        succesPost.classList.remove("aviso-click");
      }, 4000);
    }
  }
}
