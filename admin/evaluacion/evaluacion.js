"use strict";
const tabEnd = document.getElementById("table-rate-final");
async function loadMentors() {
  let optionHtml = "";
  optionHtml += `
  <option>Selecciona un tutor</option>
      `;
  const option = document.getElementById("selectIdMentor");
  const mentors = await getAllMentor();
  // console.log(mentors.data);
  if (mentors.code != 200) {
    alert(`Error ${newMentor.message}`);
  } else {
    mentors.data.map((mentor) => {
      const { firstName, name, id } = mentor;
      optionHtml += `
        <option value="${id}">${name} ${firstName}</option>
            `;
    });
    option.innerHTML = optionHtml;
  }
}

async function loadCursosById() {
  let cursoMentorHtml = "";
  cursoMentorHtml += `<option>Selecciona una asignatura</option>`;
  const option = document.getElementById("selectIdCurso");
  // console.log(option);
  const idMentor = document.getElementById("selectIdMentor").value;
  // console.log(idMentor);
  const cursoMentor = await getCourseByMentor(idMentor);
  if (cursoMentor.code != 200) {
    alert(`Error ${cursoMentor.message}`);
  } else {
    cursoMentor.data.forEach((curso) => {
      const { id, name } = curso;
      cursoMentorHtml += `
        <option value="${id}">${name}</option>`;
    });
    option.innerHTML = cursoMentorHtml;
  }
}

// ver calficaciones finales por alumno
const buttonSearch = document.querySelector(".search-rate");
const succesPost = document.getElementById("succes-post");

buttonSearch.addEventListener("click", async (e) => {
  let taBendRate = "";
  const trHeaders = document.getElementById("headers-rate");
  e.preventDefault(e);
  const courseSelect = document.getElementById("selectIdCurso").value;

  buttonSearch.disabled = true;
  buttonSearch.innerHTML = `<i class='bx bx-loader-circle bx-spin'></i> Consultando...`;

  let printCalif;
  try {
    printCalif = await getEndRateByCourse(courseSelect);
  } catch (err) {
    buttonSearch.disabled = false;
    buttonSearch.innerHTML = `<i class='bx bx-search'></i> Ver calificaciones`;
    succesPost.innerHTML = `<i class='bx bx-error-circle'></i><p>Error de conexión. Intenta de nuevo.</p>`;
    succesPost.classList.add("aviso-click");
    setTimeout(() => { succesPost.innerHTML = ""; succesPost.classList.remove("aviso-click"); }, 5000);
    return;
  }

  buttonSearch.disabled = false;
  buttonSearch.innerHTML = `<i class='bx bx-search'></i> Ver calificaciones`;

  if (printCalif.code != 200) {
    succesPost.innerHTML = `<i class='bx bx-error-circle'></i><p>Error al cargar calificaciones: ${printCalif.message}</p>`;
    succesPost.classList.add("aviso-click");
    setTimeout(() => { succesPost.innerHTML = ""; succesPost.classList.remove("aviso-click"); }, 5000);
    return;
  } else {
    let countTA = [];
    let headersHtml = `<td>Nombre</td>`;
    if (printCalif.data.headers.length > 0) {
      // console.log("1");
      printCalif.data.headers.forEach((header) => {
        const { nameUnit, idUnit } = header;
        headersHtml += `
        <td data-cell="Tarea">${nameUnit}</td>
        `;
        countTA.push(idUnit);
      });
    }

    headersHtml += `
    <th data>Promedio calculado</th>
    <th>Calificación final</th>
    <th>Enviar Calificación</th>
    `;
    console.log(printCalif.data.headers);
    trHeaders.innerHTML = headersHtml;

    printCalif.data.data.forEach((rate) => {
      const { idStudent, idCS, calif, fullname, califRecomend, listCalif } =
        rate;
      taBendRate += `
          <tr>
              <td data-cell="Alumno"><p>${fullname}</p></td>
          `;
      // console.log(countTA);
      countTA.forEach((count) => {
        const aux = listCalif.filter((calif) => {
          return calif.id == count;
        });
        taBendRate += `<td data-cell="tarea"><p>${aux[0].califRecomend}</p></td>`;
      });

      taBendRate += `
          <td data-cell="Recomendada"><p>${califRecomend}</p></td>
          <td data-cell="Calif final"><p id="califFinal_${idStudent}" contenteditable='true'>${calif}</p></td>
          <td data-cell="Guardar"><button onclick="btnGuardar(${idStudent},${idCS})">Enviar</button></td>
          `;
      tabEnd.innerHTML = taBendRate;
    });
  }
});

async function btnGuardar(idStudent, idCS) {
  if (confirm("¿Estás seguro de que deseas continuar?")) {
    const score = document.getElementById(
      `califFinal_${idStudent}`
    ).textContent;
    const updateRate = await saveRatebyStudentFinal({
      idCourseStudent: idCS,
      score: parseFloat(score),
    });
    // console.log(updateRate);
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
