"use strict";
let body = document.getElementById("datos");
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
      const datos = data.alumnos;
      const spanTitle = document.getElementById("spanTitle");
      spanTitle.textContent = `${data.alumnos.length} Alumnos`;
      body.innerHTML = salida;
      resolve(datos); // Resuelve la promesa con los datos
    } catch (error) {
      console.error("Algo no salió bien", error);
      reject(error); // Rechaza la promesa en caso de error
    }
  });
}

// Buscar en la Tabla

function filterSearch() {
  let input,
    filter,
    table,
    tr,
    fName,
    i,
    txtValue,
    lName,
    matricula,
    txtValue2,
    txtValue3,
    txtValue4,
    carrera;
  input = document.getElementById("buscar");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    matricula = tr[i].getElementsByTagName("td")[0];
    fName = tr[i].getElementsByTagName("td")[1];
    lName = tr[i].getElementsByTagName("td")[2];
    carrera = tr[i].getElementsByTagName("td")[3];
    if (matricula || fName || lName) {
      txtValue = matricula.textContent || matricula.innerText;
      txtValue2 = fName.textContent || fName.innerText;
      txtValue3 = lName.textContent || lName.innerText;
      txtValue4 = carrera.textContent || carrera.innerText;
      if (
        txtValue.toUpperCase().indexOf(filter) > -1 ||
        txtValue2.toUpperCase().indexOf(filter) > -1 ||
        txtValue3.toUpperCase().indexOf(filter) > -1 ||
        txtValue4.toUpperCase().indexOf(filter) > -1
      ) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
filterSearch();
