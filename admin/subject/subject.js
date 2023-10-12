"use strict";
let salida = "";
const tbody = document.getElementById("materias-table");
const succesPost = document.getElementById("succes-post");
async function loadSubject() {
  const outputSubject = "";
  //?idPeriod=1&idCareer=1
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idPeriod = urlParams.get("idPeriodo");
  const nameCareer = urlParams.get("name");
  const subjects = await getAll(idPeriod);
  const spanLength = document.getElementById("spanTitle");
  spanLength.textContent = subjects.data.length;
  const NameCareer = document.getElementById("nombreCarrera");
  if (subjects.code != 200) {
    alert(`Error ${newSubject.message}`);
  } else {
    NameCareer.textContent = nameCareer;
    subjects.data.map((subject) => {
      const { idPeriod, name, idCareer } = subject;
      console.log(
        `Id Period ${idPeriod} - name ${name} - idCarrera ${idCareer}`
      );
      salida += `
              <tr>
                <td data-cell="ID">${idPeriod}</td>
                <td data-cell="Name">${name}</td>
                <td data-cell="Carrera">${idCareer}</td>

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

  setTimeout(function () {
    succesPost.innerHTML = `
    <i class='bx bx-check-circle' style="background-color:#D1FADF;color:#039855;padding:10px;border-radius:8px"></i>
    <p>Creando nueva Materia...</p>
  `;
  }, 1000);
  setTimeout(function () {
    succesPost.innerHTML = "";
    succesPost.classList.remove("aviso-click");
  }, 3000);
  const newSubject = await create(data);
  if (newSubject.code != 200) alert(`Error ${newSubject.message}`);
  else {
    alert(`ID de Carrera ${newSubject.data.id}`);
    succesPost.innerHTML = `
    <i class='bx bx-check-circle' style="background-color:#D1FADF;color:#039855;padding:10px;border-radius:8px"></i>
    <p>Carrera Creada con éxito</p>
  `;
    succesPost.classList.add("aviso-click");
  }
});