"use strict";
let salida = "";
const tbody = document.getElementById("carreras");
const succesPost = document.getElementById("succes-post");

async function loadCareers() {
  const outputCareers = "";
  const careers = await getAll();

  if (careers.code != 200) {
    alert(`Error ${newCareer.message}`);
  } else {
    careers.data.map((carrer) => {
      const { id, name, description, active, code } = carrer;
      console.log(
        `Id Carrera ${id} - name ${name} - description ${description}`
      );

      salida += `
              <tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${description}</td>
                <td>${active ? "activo" : "inactivo"}</td>
                <td> 
                  <div class="actions">
                    <button class="eliminar"><i class='bx bx-trash'></i></button>
                    <button class="editar"><i class='bx bx-edit' ></i></button>
                    <a href="https://cnlweb.onrender.com/periodo/periodo.html?idCarrera=${id}" class="gestionCarrera"><button><i class='bx bx-cog'></i></button></a>
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

  const data = { code, name, description };

  succesPost.innerHTML = `
    <i class='bx bx-check-circle' style="background-color:#D1FADF;color:#039855;padding:10px;border-radius:8px"></i>
    <p>Creando nueva carrera...</p>
  `;
  succesPost.classList.add("aviso-click");
  const newCareer = await create(data);

  if (newCareer.code != 200) alert(`Error ${newCareer.message}`);
  else {
    alert(`ID de Carrera ${newCareer.data.id}`);
    succesPost.innerHTML = `
    <i class='bx bx-check-circle' style="background-color:#D1FADF;color:#039855;padding:10px;border-radius:8px"></i>
    <p>Carrera Creada con éxito</p>
  `;
    succesPost.classList.add("aviso-click");
  }
});

// EDITAR  CARRERA

const editarCarrera = document.getElementById("editar");
const modifyCarrera = document.getElementById("modify-carrera");
const aceptButton = document.getElementById("aceptModify");
editarCarrera.addEventListener("click", modificar);
function modificar() {
  modifyCarrera.classList.add("opacityModificar");
}

aceptButton.addEventListener("click", ocultarModificarCarrera);

function ocultarModificarCarrera() {
  modifyCarrera.classList.remove("opacityModificar");
}

// BORRAR CARRERA

const abrirDelete = document.getElementById("eliminar");
const ModalDelCarrera = document.getElementById("ModaldelCarrera");
const deleteButton = document.getElementById("decDelete");
const aceptButtonDelete = document.getElementById("aceptDelete");
abrirDelete.addEventListener("click", eliminarLic);
function eliminarLic() {
  ModalDelCarrera.classList.add("opacityModificar");
}

deleteButton.addEventListener("click", aceptDeleteModal);

function aceptDeleteModal() {
  ModalDelCarrera.classList.remove("opacityModificar");
}
