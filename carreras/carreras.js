"use strict";
let salida = "";
const tbody = document.getElementById("carreras");
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
                <td> 
                  <div class="actions">
                    <button class="eliminar"><i class='bx bx-trash'></i></button>
                    <button class="editar"><i class='bx bx-edit' ></i></button>
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
      succesPost.textContent = `Se actualizaron los siquientes datos
      ${id}, ${carrera},${descripcion}`;
    }
  } catch (error) {
    console.error("Ocurrió un error", error);
  }
};

btnCarrera.addEventListener("click", async (e) => {
  e.preventDefault();
  await postData();
});
