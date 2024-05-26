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
                <td data-cell="Nombre del periodo"><p contenteditable="true" spellcheck="false" id='name_${id}'>${name}</p></td>
                <td data-cell="Acciones"> 
                  <div class="actions">
                    <a data-tooltip='Gestionar materia' href="../subject/subject.html?idCarrera=${idCareer}&idPeriodo=${id}&namePeriod=${namePeriod}&nameCareer=${nameCareer}" class="gestionCarrera">
                    <button class="edit"><i class='bx bx-book-add' ></i>
                    </button>
                    </a>
                    <a  data-tooltip='Gestionar asignatura' 
                    href="../groups/group.html?idPeriodo=${id}&idCarrera=${idCareer}&namePeriod=${namePeriod}per&nameCareer=${nameCareer}">
                    <button class="edit"><i class='bx bx-group'></i></button>
                    </a>
                    <button onclick="updatePeriodo(${id})" data-tooltip='Editar'class="edit"><i class='bx bx-edit' ></i></button>
                    <button onclick="deletePeriodo(${id})"  data-tooltip='Eliminar' class="edit"><i class='bx bx-trash'></i></button>
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

// Update
async function updatePeriodo(periodId) {
  if (confirm("¿Estás seguro de que deseas continuar?")) {
    const name = obtainId(`name_${periodId}`).textContent;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idCareer = urlParams.get("idCarrera");
    console.log(idCareer);
    const updateData = await updatePeriod({
      idCareer,
      name,
      periodId,
    });

    if (updateData.code != 200) {
      alert(`Error al actualizar al alumno ${periodId} ${name} `);
    } else {
      setTimeout(function () {
        succesPost.innerHTML = `
        <i class='bx bx-check-circle'></i>
        <p>Periodo actualizado con éxito</p>`;
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

async function deletePeriodo(periodId) {
  if (confirm("¿Estás seguro de que deseas eliminar este Periodo?")) {
    const deleteData = await deletePeriod({
      periodId,
    });

    if (deleteData.code != 200) {
      alert(`Error al eliminar el Periodo ${periodId}`);
    } else {
      setTimeout(function () {
        succesPost.innerHTML = `
        <i class='bx bx-check-circle' ></i>
        <p>Periodo eliminado con éxito</p>`;
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
