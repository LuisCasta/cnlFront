"use strict";
let body = document.getElementById("datos");
const buscar = document.getElementById("buscar");
let salida = "";

function obtenerDatos() {
  return new Promise(async (resolve, reject) => {
    try {
      const respuesta = await fetch("../json/bdprueba.json", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await respuesta.json();
      for (let elemento of data.alumnos) {
        salida += `
            <tr>
              <td>${elemento.matricula}</td>
              <td>${elemento.nombre}</td>
              <td>${elemento.apellido}</td>
              <td>${elemento.carrera}</td>
              <td>${elemento.semestre}°</td>
              <td> 
                <div class="actions">
                  <button class="eliminar"><i class='bx bx-trash'></i></button>
                  <button class="editar"><i class='bx bx-edit' ></i></button>
                </div>
              </td>
            </tr>
          `;
      }
      const datos = data.dispositivos;
      body.innerHTML = salida;
      resolve(datos); // Resuelve la promesa con los datos
    } catch (error) {
      console.error("Algo no salió bien", error);
      reject(error); // Rechaza la promesa en caso de error
    }
  });
}
buscar.addEventListener("keyup", buscarDatos);

async function buscarDatos() {
  let datos = await obtenerDatos();
  const find = document.getElementById("find").value;
}
