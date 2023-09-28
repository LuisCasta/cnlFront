"use strict";
let salida = "";
const succesPost = document.getElementById("succes-post");
const tbody = document.getElementById("periodo-table");
async function loadPeriodo() {
  const outputPeriods = "";
  const periods = await getAll();

  if (periods.code != 200) {
    alert(`Error ${newPeriod.message}`);
  } else {
    periods.data.map((period) => {
      const { idCareer, name, idPeriod } = period;
      console.log(
        `Id Carrera ${idCareer} - name ${name} id de Periodo: ${idPeriod}`
      );
      salida += `
              <tr>
                <td>${idPeriod}</td>
                <td>${name}</td>
                <td> 
                  <div class="actions">
                    <button class="eliminar"><i class='bx bx-trash'></i></button>
                    <button class="editar"><i class='bx bx-edit' ></i></button>
                    <a href="https://cnlweb.onrender.com/add-subject/addsubject.html?idCarrera=${idCareer}?idPeriodo=${idPeriod}" class="gestionCarrera"><button><i class='bx bx-cog'></i></button></a>
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

  succesPost.innerHTML = `
      <i class='bx bx-check-circle' style="background-color:#D1FADF;color:#039855;padding:10px;border-radius:8px"></i>
      <p>Creando nuevo Periodo...</p>
    `;
  succesPost.classList.add("aviso-click");
  const newPeriod = await create(data);

  if (newPeriod.code != 200) alert(`Error ${newPeriod.message}`);
  else {
    alert(`ID de Carrera ${newPeriod.data.id}`);
    succesPost.innerHTML = `
      <i class='bx bx-check-circle' style="background-color:#D1FADF;color:#039855;padding:10px;border-radius:8px"></i>
      <p>Periodo Creado con éxito</p>
    `;
    succesPost.classList.add("aviso-click");
  }
});