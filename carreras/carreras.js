"use strict";
let salida = "";
const tbody = document.getElementById("carreras");

async function loadCareers () {

  const outputCareers = '';
  const careers = await getAll()

  if(careers.code != 200){

    alert(`Error ${newCareer.message}`)

  }else{

    careers.data.map( carrer => {

      const { id, name, description, active, code } = carrer;
      console.log(`Id Carrera ${id} - name ${name} - description ${description}`)

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
                    <a href="" class="gestionCarrera"><button><i class='bx bx-cog'></i></button></a>
                  </div>
                </td>
              </tr>
            `;
    })

    tbody.innerHTML = salida;
  }
}

function cargarCarreras() {
  return new Promise(async (resolve, reject) => {
    try {
      const respuesta = await fetch("../json/carreras.json", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await respuesta.json();
      for (let elemento of data.carreras) {
        salida += `
              <tr>
                <td>${elemento.id}</td>
                <td>${elemento.licenciatura}</td>
                <td>${elemento.descripcion}</td>
                <td>${elemento.status ? "activo" : "inactivo"}</td>
                <td> 
                  <div class="actions">
                    <button class="eliminar"><i class='bx bx-trash'></i></button>
                    <button class="editar"><i class='bx bx-edit' ></i></button>
                    <a href="" class="gestionCarrera"><button><i class='bx bx-cog'></i></button></a>
                  </div>
                </td>
              </tr>
            `;
      }
      const datos = data.alumnos;
      const spanTitle = document.getElementById("spanTitle");
      spanTitle.textContent = `${data.carreras.length} carreras`;
      tbody.innerHTML = salida;
      resolve(datos); // Resuelve la promesa con los datos
    } catch (error) {
      console.error("Algo no salió bien", error);
      reject(error); // Rechaza la promesa en caso de error
    }
  });
}

// Agregar una carrera

const succesPost = document.getElementById("succes-post");
const formCarrera = document.getElementById("form-Carreras");
const btnCarrera = document.getElementById("enviarBtn");

const getData = () => {
  const datos = new FormData(formCarrera);
  const datosProcesados = Object.fromEntries(datos.entries());
  formCarrera.reset();
  return datosProcesados;
};

const postData = async () => {
  const newCarrera = getData();
  try {
    const response = await fetch("../json/carreras.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCarrera),
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const { id, carrera, descripcion } = jsonResponse;
      succesPost.textContent = `Se agregó la Carrera de ${carrera}
      con éxito`;
    }
  } catch (error) {
    console.error("Ocurrió un error", error);
  }
};

/**
 * 
 * Btn create carrer
 * 
 **/
btnCarrera.addEventListener("click", async (e) => {

  const code = document.getElementById('idCarrera').value;
  const name = document.getElementById('nameCarrera').value;
  const description = document.getElementById('descripcionCarrera').value;

  const data = { code, name, description}

  succesPost.innerHTML = `
    <i class='bx bx-check-circle' style="background-color:#D1FADF;color:#039855;padding:10px;border-radius:8px"></i>
    <p>Creando nueva carrera...</p>
  `;
  succesPost.classList.add("aviso-click");
  const newCareer = await create(data);


  if(newCareer.code != 200)
    alert(`Error ${newCareer.message}`)
  else{
    alert(`ID de Carrera ${newCareer.data.id}`)
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
