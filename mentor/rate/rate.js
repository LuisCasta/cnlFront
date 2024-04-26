const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idMentor = urlParams.get("idMentor");
const idUnit = urlParams.get("idUnit");
const buttonSearch = document.querySelector(".search-rate");
const selectCourse = document.getElementById("select-course");
const tabEnd = document.getElementById("table-rate-final");
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

  let taBendRate = "";
  buttonSearch.addEventListener("click", async (e) => {
    e.preventDefault(e);
    const courseSelect = selectCourse.value;
    console.log(courseSelect);
    const printCalif = await getEndRateByCourse(courseSelect);
    if (printCalif.code != 200) {
      alert(`Error ${printCalif.message}`);
    } else {
      console.log(printCalif.data);
      printCalif.data.forEach((rate) => {
        const {
          name,
          score,
          secondName,
          PromCalculado,
          cuatri,
          parcial1,
          parcial2,
        } = rate;
        taBendRate += `
            <tr>
                <td data-cell="Nombre"><p>${name} ${secondName}</p></td>
                <td data-cell="Parcial 1"><p>${parcial1}</p></td>
                <td data-cell="Parcial 2"><p>${parcial2}</p></td>
                <td data-cell="Cuatrimestre"><p>${cuatri}</p></td>
                <td data-cell="Promedio calculado"><p>${PromCalculado}</p></td>
                <td data-cell="Calificación final">
                  <p contenteditable="true" spellcheck="false">${score}</p>
                </td>
                <td data-cell='Acciones'><button value=${score}><p>Guardar calificación</p></button></td>
            </tr>
            `;
        tabEnd.innerHTML = taBendRate;
      });
    }
  });
}
