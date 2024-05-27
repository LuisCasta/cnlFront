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

 
 
  buttonSearch.addEventListener("click", async (e) => {
    let taBendRate = "";
    const trHeaders = document.getElementById('headers-rate')
    e.preventDefault(e);
    const courseSelect = selectCourse.value;
    // console.log(courseSelect);
    const printCalif = await getEndRateByCourse(courseSelect);
    if (printCalif.code != 200) {
      alert(`Error ${printCalif.message}`);
    } else {
      let countTA = [];
      let headersHtml = `<td>Nombre</td>`;
      if (printCalif.data.headers.length > 0){
        console.log('1');
          printCalif.data.headers.forEach((header) => {
          const {nameUnit, idUnit} = header;
          headersHtml += `
          <td data-cell="Nombre de Tarea Activa">${nameUnit}</td>
          `;
          countTA.push(idUnit);
        })
      }

      headersHtml += `
      <th data>Promedio calculado</th>
      <th>Calificación final</th>
      <th>Enviar Calificación</th>
      `;
     console.log(headersHtml);
      trHeaders.innerHTML = headersHtml;
      console.log(printCalif.data);
     const data =  [
        {
            idStudent:8,
            name: "Luis",
            firstName: "Castañeda",
            secondName: "Villalobos",
            idCS: 21,
            calif: 0,
            fullname: "Castañeda Villalobos Luis",
            califRecomend: 95,
            listCalif: [
                {
                    id: 7,
                    califRecomend: 90,
                }
            ]
        },
        {
            idStudent: 9,
            name: "alberto",
            firstName: "sosa",
            secondName: "ramirez",
            idCS: 22,
            calif: 0,
            fullname: "sosa ramirez alberto",
            califRecomend: 70,
            listCalif: [
                {
                    id: 7,
                    califRecomend: 60,
                }
            ]
        }
    ];
      printCalif.data.data.forEach((rate) => {
        const {idStudent,idCS,calif, fullname, califRecomend, listCalif} = rate;
        taBendRate += `
            <tr>
                <td data-cell="Nombre"><p>${fullname}</p></td>
            `;
            console.log(countTA);
          countTA.forEach((count)=>{
            const aux = listCalif.filter((calif) => {return calif.id == count});
            taBendRate += `<td data-cell="Nombre"><p>${aux[0].califRecomend}</p></td>`;
            });
            taBendRate += `
            <td data-cell="Nombre"><p>${califRecomend}</p></td>
            <td data-cell="Nombre"><p id="califFinal_${idStudent}" contenteditable='true'>${calif}</p></td>
            <td data-cell="Nombre"><button onclick="btnGuardar(${idStudent},${idCS})">Enviar</button></td>
            `;
        tabEnd.innerHTML = taBendRate;
      });
    }
  });
}

async function btnGuardar(idStudent,idCS){
  if (confirm("¿Estás seguro de que deseas continuar?")) {
    const score = document.getElementById(`califFinal_${idStudent}`).textContent;
    const updateRate = await saveRatebyStudentFinal({
      idStudent,
      idCourse:idCS,
      score
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
