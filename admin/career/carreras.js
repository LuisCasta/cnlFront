"use strict";

const succesPost = document.getElementById("succes-post");

async function loadCareers() {
  let salida = "";
  const tbody = document.getElementById("carreras");
  const careers = await getAll();
  if (careers.code != 200) {
    alert(`Error ${careers.message}`);
  } else {
    const countCareers = document.getElementById("spanTitle");
    countCareers.textContent = careers.data.length;
    careers.data.sort((a, b) => {
      return b.id - a.id;
    });
    careers.data.map((carrer) => {
      const { id, name, description, code, totalCourses } = carrer;
      salida += `
                  <tr>
                    <td data-cell="Licenciatura">
                      <p id='name_${id}' contenteditable="true" spellcheck="false">${name}</p>
                    </td>

                    <td data-cell="Descripción">
                      <p id='description_${id}' contenteditable="true" spellcheck="false">${description}</p>
                    </td>

                    <td data-cell="Total Asignaturas">
                        <p id='totalCourses_${id}' spellcheck="false">${totalCourses}</p>
                    </td>
                    <td class="not-show" data-cell="Code">
                      <p id='code_${id}' contenteditable="true" spellcheck="false">${code}</p>
                    </td>

                    <td data-cell="Acciones">
                      <div class="actions">
                        <a data-tooltip="Gestionar" href="../periodo/periodo.html?idCarrera=${id}&nameCareer=${name}" class="gestionCarrera">
                          <button class="edit"><i class='bx bx-calendar-plus'></i></button>
                        </a>
                        <button onclick="updateCareer(${id})" data-tooltip="Editar" data-id="${id}" class="edit">
                          <i class='bx bx-edit'></i>
                        </button>
                        <button onclick="deleteCareer(${id})" data-tooltip="Eliminar" data-id="${id}" class="edit">
                          <i class='bx bx-trash'></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `;

    });
    tbody.innerHTML = salida;
  }
}

async function getCareerById(id) {
  const career = await getById(id);

  if (career.status != 200)
    alert(`Error al obtener la carrera con el id ${id}`);
  else {
    const { name, code, description, active } = career.data;

    return {
      name,
      code,
      description,
      active,
    };
  }
}

/**
 *
 * Btn create carrer
 *
 **/
const btnCarrera = document.getElementById("enviarBtn");
btnCarrera.addEventListener("click", async (e) => {
  e.preventDefault();
  const code = "0";
  const name = document.getElementById("nameCarrera").value;
  const description = document.getElementById("descripcionCarrera").value;
  const data = { name, description, code };
  // Succes Post
  succesPost.innerHTML = `
      <i class='bx bx-loader-circle bx-spin' ></i>
      <p>Creando nueva carrera...</p>
    `;
  succesPost.classList.add("aviso-click");
  const newCareer = await create(data);
  if (newCareer.code != 200) alert(`Error ${newCareer.message}`);
  else {
    succesPost.innerHTML = `
    <i class='bx bx-check-circle bx-tada' style="color:#38b000"></i>
      <p>Materia: ${name} creada con éxito</p>
    `;
    succesPost.classList.add("aviso-click");
  }

  await loadCareers();
  limpiarInputs();
  succesPost.style.display = "none";
});

// Update
async function updateCareer(careerId) {
  if (confirm("¿Estás seguro de que deseas continuar?")) {
    const name = obtainId(`name_${careerId}`).textContent;
    const description = obtainId(`description_${careerId}`).textContent;
    const code = obtainId(`code_${careerId}`).textContent;
    const totalCourses = obtainId(`totalCourses_${careerId}`).textContent;

    const updateData = await updateCarrera({
      careerId,
      name,
      description,
      code,
      totalCourses,
    });

    if (updateData.code != 200) {
      alert(`Error al actualizar al alumno ${careerId} ${name} `);
    } else {
      setTimeout(function () {
        succesPost.innerHTML = `
        <i class='bx bx-check-circle'></i>
        <p>Carrera actualizada con éxito</p>`;
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
    outSucces();
  }
}

async function deleteCareer(careerId) {
  if (confirm("¿Estás seguro de que deseas eliminar esta carrera?")) {
    const deleteData = await deleteCarrera({
      careerId,
    });

    if (deleteData.code != 200) {
      alert(`Error al eliminar la carrera ${careerId}`);
    } else {
      setTimeout(function () {
        succesPost.innerHTML = `
        <i class='bx bx-check-circle' ></i>
        <p>Carrera eliminada con éxito</p>`;
        succesPost.classList.add("aviso-click");
      }, 100);
      setTimeout(function () {
        succesPost.innerHTML = "";
        succesPost.classList.remove("aviso-click");
      }, 7000);
      setTimeout(function () {
        location.reload();
      }, 5000);
    }
  } else {
    setTimeout(function () {
      succesPost.innerHTML = `
      <i class='bx bx-x' ></i>
      <p>Operación Cancelada</p>`;
      succesPost.classList.add("aviso-click");
    }, 1000);
  }
}
