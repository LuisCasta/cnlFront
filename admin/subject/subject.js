"use strict";
let salida = "";
const tbody = document.getElementById("materias-table");
const succesPost = document.getElementById("succes-post");
const backPeriod = document.getElementById("back-period");
async function loadSubject() {
  const outputSubject = "";
  //?idPeriod=1&idCareer=1
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idPeriod = urlParams.get("idPeriodo");
  const nameCareer = urlParams.get("nameCareer");
  const carreraId = urlParams.get("idCarrera");
  const namePeriod = urlParams.get("namePeriod");
  backPeriod.href = `../periodo/periodo.html?idCarrera=${carreraId}&nameCareer=${nameCareer}`;

  const subjects = await getAll(idPeriod);
  const spanLength = document.getElementById("spanTitle");
  spanLength.textContent = subjects.data.length;
  const nperiod = document.getElementById("name-period");
  if (subjects.code != 200) {
    alert(`Error ${newSubject.message}`);
  } else {
    nperiod.textContent = namePeriod;
    subjects.data.map((subject) => {
      const { idPeriod, name, idCareer } = subject;
      // console.log(
      //   `Id Period ${idPeriod} - name ${name} - idCarrera ${idCareer}`
      // );
      salida += `
              <tr>
                <td data-cell="Name">${name}</td>
                <td data-cell="Actions">
                  <div class='actions'>
                      <a data-tooltip='Editar'><i class='bx bx-edit-alt'></i></a>
                      <a data-tooltip='Eliminar'><i class='bx bx-trash'></i></a>
                  </div>
                </td>

              </tr>
            `;
    });
    tbody.innerHTML = salida;
  }
}

async function getSubjectById(id) {
  const subject = await getById(id);

  if (subject.status != 200)
    alert(`Error al obtener la carrera con el id ${id}`);
  else {
    const { name, code, idCareer, idPeriod } = subject.data;

    return {
      name,
      code,
      idCareer,
      idPeriod,
    };
  }
}

/**
 *
 * Btn create carrer
 *
 **/
const btnSubject = document.getElementById("agregarMateria");
btnSubject.addEventListener("click", async (e) => {
  e.preventDefault();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  //?idPeriod=1&idCareer=1
  const idCareer = urlParams.get("idCarrera");
  const idPeriod = urlParams.get("idPeriodo");
  const name = document.getElementById("nameMateria").value;
  const data = { name, idCareer, idPeriod };

  // Succes Post
  succesPost.innerHTML = `
      <i class='bx bx-loader-circle bx-spin' ></i>
      <p>Creando nueva materia...</p>
    `;
  succesPost.classList.add("aviso-click");

  const newSubject = await create(data);
  if (newSubject.code != 200) alert(`Error ${newSubject.message}`);
  else {
    succesPost.innerHTML = `
    <i class='bx bx-check-circle bx-tada' style="color:#38b000"></i>
      <p>Materia: ${name} creada con éxito</p>
    `;
    succesPost.classList.add("aviso-click");
  }

  setTimeout(function () {
    location.reload();
  }, 4000);
});
