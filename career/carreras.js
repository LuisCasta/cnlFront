"use strict";
let salida = "";
const tbody = document.getElementById("carreras");
const succesPost = document.getElementById("succes-post");
const modifyCarrera = document.getElementById("modify-carrera");
const aceptButton = document.getElementById("aceptModify");
const modalDelete = document.getElementById("delete-carrera");
const aceptDelete = document.getElementById("acept-delete");

async function loadCareers() {
  const outputCareers = "";
  const careers = await getAll();
  if (careers.code != 200) {
    alert(`Error ${newCareer.message}`);
  } else {
    const countCareers = document.getElementById("spanTitle");
    countCareers.textContent = careers.data.length;
    careers.data.map((carrer) => {
      const { id, name, description, active, code } = carrer;
      // console.log(
      //   `Id Carrera ${id} - name ${name} - description ${description}`);
      salida += `
              <tr>
                <td data-cell="ID" >${id}</td>
                <td data-cell="Name">${name}</td>
                <td data-cell="Description">${description}</td>
                <td data-cell="Estatus">${active ? "activo" : "inactivo"}</td>
                <td data-cell="Actions">
                  <div class="actions">
                    <button data-id="${id}" class="eliminar"><i class='bx bx-trash'></i></button>
                    <button data-id="${id}" class="editar"><i class='bx bx-edit' ></i></button>
                    <a href="../periodo/periodo.html?idCarrera=${id}&name=${name}" class="gestionCarrera"><button><i class='bx bx-cog'></i></button></a>
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
  const code = document.getElementById("idCarrera").value;
  const name = document.getElementById("nameCarrera").value;
  const description = document.getElementById("descripcionCarrera").value;

  const data = { name, description, code };

  setTimeout(function () {
    succesPost.classList.add("aviso-click");
    succesPost.innerHTML = `
    <i class='bx bx-check-circle' style="background-color:#D1FADF;color:#039855;padding:10px;border-radius:8px"></i>
    <p>Creando nueva carrera...</p>
  `;
  }, 100);

  setTimeout(function () {
    succesPost.innerHTML = "";
    succesPost.classList.remove("aviso-click");
  }, 6500);

  const newCareer = await create(data);

  if (newCareer.code != 200) alert(`Error ${newCareer.message}`);
  else {
    // alert(`ID de Carrera ${newCareer.data.id}`);

    setTimeout(function () {
      succesPost.innerHTML = `
      <i class='bx bx-check-circle' style="background-color:#D1FADF;color:#039855;padding:10px;border-radius:8px"></i>
      <p>Carrera de ${newCareer.data.name} Creada con éxito</p>
    `;
      succesPost.classList.add("aviso-click");
    }, 100);

    setTimeout(function () {
      succesPost.innerHTML = "";
      succesPost.classList.remove("aviso-click");
    }, 6500);
  }
});

// EDITAR  CARRERA

async function modificarCarrera() {
  const data = await getAll();
  const { name, active, description } = data;
  console.log(data);
  const buttons = document.querySelectorAll(".editar");
  buttons.forEach((button) => {
    button.addEventListener("click", modificar);
    function modificar() {
      modifyCarrera.classList.add("opacityModificar");
      const div = document.createElement("div");
      const h3 = document.createElement("h3");
      h3.textContent = "Modificar Carrera";
      // const input =
    }

    aceptButton.addEventListener("click", ocultarModificarCarrera);
    function ocultarModificarCarrera() {
      modifyCarrera.classList.remove("opacityModificar");
    }
  });
}

// // BORRAR CARRERA

async function deleteCarrera() {
  const data = await getAll();
  const buttonsDelete = document.querySelectorAll(".eliminar");

  buttonsDelete.forEach((button) => {
    button.addEventListener("click", abrirDelete);
    function abrirDelete() {
      modalDelete.classList.add("opacityModificar");
    }
    aceptDelete.addEventListener("click", cerrarModalDelete);
    function cerrarModalDelete() {
      modalDelete.classList.remove("opacityModificar");
    }
  });
}
