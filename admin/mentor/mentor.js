"use strict";

function limpiarInputs() {
  const inputs = document.querySelectorAll(".input-form");
  inputs.forEach(function (input) {
    input.value = ""; // Limpiar el valor del input
  });
}

const succesPost = document.getElementById("succes-post");

async function loadMentors() {
  let salida = "";
  const tbody = document.getElementById("mentors");
  const mentors = await getAll();
  // console.log(mentors.data);
  if (mentors.code != 200) {
    alert(`Error ${newMentor.message}`);
  } else {
    const countMentors = document.getElementById("spanTitle");
    countMentors.textContent = mentors.data.length;
    mentors.data.map((mentor) => {
      const { firstName, name, mail, password, id } = mentor;
      salida += `
              <tr>
                <td data-cell="ID"><p>${id}</p></td>
                <td data-cell="Name" >
                  <p id='name_${id}' class="edit-mentor" contenteditable="true" data-tooltip="editar" spellcheck="false">${name}</p>
                </td>
                <td data-cell="FirstName">
                  <p id='first-name_${id}' class="edit-mentor" contenteditable="true" data-tooltip="editar" spellcheck="false">${firstName}</p>
                </td>
                <td data-cell="Mail">
                <p id='mail_${id}' class="edit-mentor" contenteditable="true" data-tooltip="editar" spellcheck="false">${mail}</p>
                </td>
                <td data-cell="PW">
                  <p class="edit-mentor" id='password_${id}' data-tooltip="editar" contenteditable="true">
                  ${password}
                  </p>
                </td>
                <td data-cell="Acciones"> 
                  <div class="actions">     
                    <button   onclick="updateMaestro(${id})" data-tooltip="Editar" class="edit">
                    <i class='bx bx-edit' ></i>
                  </button>
                  <button   onclick="deleteMaestro(${id})" data-tooltip="Eliminar" class="edit">
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
  const mentor = await getById(id);

  if (mentor.status != 200)
    alert(`Error al obtener la carrera con el id ${id}`);
  else {
    const { name, firstName, mail, password } = mentor.data;

    return {
      name,
      firstName,
      mail,
      password,
    };
  }
}

/**
 *
 * Btn create Mentor
 *
 **/
const btnMentor = document.getElementById("btnMentor");
btnMentor.addEventListener("click", async (e) => {
  e.preventDefault();
  const mail = document.getElementById("mailMentor").value;
  const passwordTxt = document.getElementById("contrasenaMentor").value;
  const password = passwordTxt.trim();
  const firstName = document.getElementById("firstName").value;
  const name = document.getElementById("nameMentor").value;
  const secondName = document.getElementById("secondName").value;

  const data = { mail, password, firstName, name, secondName };
  console.log(data);

  // Succes Post
  succesPost.innerHTML = `
 <i class='bx bx-loader-circle bx-spin' ></i>
 <p>Creando nuevo docente<p>
`;
  succesPost.classList.add("aviso-click");

  const newMentor = await create(data);
  if (newMentor.code != 200) alert(`Error ${newMentor.message}`);
  else {
    succesPost.innerHTML = `
     <i class='bx bx-check-circle bx-tada' ></i>
     <p>Docente: ${name} creado con éxito</p>
`;
    succesPost.classList.add("aviso-click");
  }

  await loadMentors();
  limpiarInputs();
  succesPost.style.display = "none";
});

// Update
async function updateMaestro(mentorId) {
  if (confirm("¿Estás seguro de que deseas continuar?")) {
    const name = obtainId(`name_${mentorId}`).textContent;
    const firstName = obtainId(`first-name_${mentorId}`).textContent;
    const mail = obtainId(`mail_${mentorId}`).textContent;
    const passwordTxt = obtainId(`password_${mentorId}`).textContent;
    const password = passwordTxt.trim();

    const updateData = await updateMentor({
      mentorId,
      name,
      firstName,
      mail,
      password,
    });

    if (updateData.code != 200) {
      alert(`Error al actualizar al tutor ${name}`);
    } else {
      setTimeout(function () {
        succesPost.innerHTML = `
        <i class='bx bx-check-circle'></i>
        <p>Tutor actualizado con éxito</p>`;
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
      succesPost.innerHTML = ``;
      succesPost.classList.remove("aviso-click");
    }, 3000);
  }
  await loadMentors();
}

async function deleteMaestro(mentorId) {
  if (confirm("¿Estás seguro de que deseas eliminar a este tutor?")) {
    const deleteData = await deleteMentor({
      mentorId,
    });

    if (deleteData.code != 200) {
      alert(`Error al eliminar al tutor ${mentorId}`);
    } else {
      setTimeout(function () {
        succesPost.innerHTML = `
        <i class='bx bx-check-circle' ></i>
        <p>Tutor eliminado con éxito</p>`;
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

    location.reload();
  }
}
