"use strict";
let salida = "";
const succesPost = document.getElementById("succes-post");
const tbody = document.getElementById("periodo-table");
async function loadPeriodo() {
  // const outputPeriods = "";
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idCareer = urlParams.get("idCarrera");
  const nameCareer = urlParams.get("nameCareer");
  console.log(nameCareer);
  const periods = await getAll(idCareer);
  const countPeriods = document.getElementById("spanTitle");
  countPeriods.textContent = periods.data.length;
  if (periods.code != 200) {
    alert(`Error ${newPeriod.message}`);
  } else {
    const NameCareer = document.getElementById("nombreCarrera");
    NameCareer.textContent = nameCareer;
    periods.data.map((period) => {
      const { idCareer, name, id } = period;
      let namePeriod = period.name;
      // console.log(`Id Carrera ${idCareer} - name ${name} id de Periodo: ${id}`);
      salida += `
              <tr>
                <td data-cell="Nombre del periodo">${name}</td>
                <td data-cell="Acciones"> 
                  <div class="actions">
                    <a  data-tooltip='Agregar materia' href="../subject/subject.html?idCarrera=${idCareer}&idPeriodo=${id}&namePeriod=${namePeriod}&nameCareer=${nameCareer}" class="gestionCarrera"><button><i class='bx bx-book-add' ></i></button></a>
                    <a  data-tooltip='Agregar grupo' href="../groups/group.html?idPeriodo=${id}&idCarrera=${idCareer}&namePeriod=${namePeriod}per&nameCareer=${nameCareer}"><button><i class='bx bx-group'></i></button></a>
                    <button data-tooltip='Eliminar' class="eliminar"><i class='bx bx-trash'></i></button>
                    <button data-tooltip='Editar'class="editar"><i class='bx bx-edit' ></i></button>
                    </div>
                </td>
              </tr>
            `;
    });
    tbody.innerHTML = salida;
  }
}

async function getPeriodById(id) {
  const period = await getById(id);

  if (period.status != 200)
    alert(`Error al obtener la carrera con el id ${id}`);
  else {
    const { name, idCareer, idPeriod } = period.data;

    return {
      name,
      idCareer,
      idPeriod,
    };
  }
}

// CREAR UN NUEVO PERIODO

const btnPeriod = document.getElementById("agregarPeriodo");

btnPeriod.addEventListener("click", async (e) => {
  e.preventDefault();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idCareer = urlParams.get("idCarrera");
  const name = document.getElementById("name-period").value;

  const data = { idCareer, name };

  // Succes Post
  succesPost.innerHTML = `
      <i class='bx bx-loader-circle bx-spin' ></i>
      <p>Creando nuevo Periodo...</p>
    `;
  succesPost.classList.add("aviso-click");

  const newPeriod = await create(data);
  if (newPeriod.code != 200) alert(`Error ${newPeriod.message}`);
  else {
    succesPost.innerHTML = `
    <i class='bx bx-check-circle bx-tada' style="color:#38b000"></i>
      <p>Periodo: ${name} creado con éxito</p>
    `;
    succesPost.classList.add("aviso-click");
  }
  setTimeout(function () {
    location.reload();
  }, 4000);
});
