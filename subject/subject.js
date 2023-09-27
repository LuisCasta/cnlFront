"use strict";
let salida = "";
const tbody = document.getElementById("materias-table");
const succesPost = document.getElementById("succes-post");

async function loadSubject() {
  const outputSubject = "";
  const subjects = await getAll();

  if (subjects.code != 200) {
    alert(`Error ${newSubject.message}`);
  } else {
    subjects.data.map((subject) => {
      const { idPeriod, name, idCarrer, active } = subject;
      console.log(
        `Id Period ${idPeriod} - name ${name} - idCarrera ${idCarrer}`
      );
      salida += `
              <tr>
                <td>${idPeriod}</td>
                <td>${name}</td>
                <td>${idCarrer}</td>
                // <td>${active ? "activo" : "inactivo"}</td>
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
console.log(btnSubject);
btnSubject.addEventListener("click", async (e) => {
  e.preventDefault();
  const urlParams = new URLSearchParams(queryString);
  const idCareer = urlParams.get("idCareer");
  const urlParamsPeriod = new URLSearchParams(queryString);
  const idPeriod = urlParamsPeriod.get("idPeriod");
  const code = document.getElementById("idMateria").value;
  const name = document.getElementById("nameMateria").value;
  //   const description = document.getElementById("descripcionCarrera").value;

  const data = { code, name, idCareer, idPeriod };

  succesPost.innerHTML = `
    <i class='bx bx-check-circle' style="background-color:#D1FADF;color:#039855;padding:10px;border-radius:8px"></i>
    <p>Creando nueva carrera...</p>
  `;
  succesPost.classList.add("aviso-click");
  const newCareer = await create(data);

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
