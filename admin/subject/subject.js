"use strict";
const tbody = document.getElementById("materias-table");
const succesPost = document.getElementById("succes-post");
const backPeriod = document.getElementById("back-period");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idPeriod = urlParams.get("idPeriodo");
const nameCareer = urlParams.get("nameCareer");
const carreraId = urlParams.get("idCarrera");
const idCareer = urlParams.get("idCarrera");

async function loadSubject() {
  let salida = "";
  //?idPeriod=1&idCareer=1
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
      const { name, id } = subject;
      // console.log(
      //   `Id Period ${idPeriod} - name ${name} - idCarrera ${idCareer}`
      // );
      salida += `
              <tr>
                <td data-cell="Name"><p id='name_${id}' spellcheck="false" contenteditable="true">${name}</p></td>
                <td data-cell="Actions">
                  <div class='actions'>
                      <button class="edit">
                        <a onclick="upSubject(${id})" data-tooltip='Editar'>
                          <i class='bx bx-edit'></i>
                        </a>
                      </button>
                      <button class="edit">
                        <a onclick="delSubject(${id})" data-tooltip='Eliminar'>
                          <i class='bx bx-trash'></i>
                        </a>
                      </button>
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

// Update
async function upSubject(subjectId) {
  const name = obtainId(`name_${subjectId}`).textContent;
  // setName.setAttribute("contenteditable", "true");

  console.log(name);

  if (confirm("¿Estás seguro de que deseas continuar?")) {
    const updateData = await updateSubject({
      subjectId,
      name,
      idCareer,
      idPeriod,
    });
    if (updateData.code != 200) {
      alert(`Error al actualizar el grupo ${courseId} ${name} `);
    } else {
      setTimeout(function () {
        succesPost.innerHTML = `
        <i class='bx bx-check-circle'></i>
        <p>Materia ${name} actualizada con éxito</p>`;
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
  setTimeout(function () {
    succesPost.innerHTML = "";
    succesPost.classList.remove("aviso-click");
  }, 5000);
}

async function delSubject(subjectId) {
  if (confirm("¿Estás seguro de que deseas eliminar esta Materia?")) {
    const deleteData = await deleteMateria({
      subjectId,
    });

    if (deleteData.code != 200) {
      alert(`Error al eliminar la Materia ${subjectId}`);
    } else {
      setTimeout(function () {
        succesPost.innerHTML = `
        <i class='bx bx-check-circle' ></i>
        <p>Materia eliminado con éxito</p>`;
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

    setTimeout(function () {
      succesPost.innerHTML = "";
      succesPost.classList.remove("aviso-click");
    }, 5000);
  }

  location.reload();
}
