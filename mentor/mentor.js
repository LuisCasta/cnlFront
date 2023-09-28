"use strict";
let salida = "";
const tbody = document.getElementById("mentors");
const succesPost = document.getElementById("succes-post");

async function loadMentors() {
  const outputMentors = "";
  const mentors = await getAll();

  if (mentors.code != 200) {
    alert(`Error ${newMentor.message}`);
  } else {
    const countMentors = document.getElementById("spanTitle");
    countMentors.textContent = mentors.data.length;
    mentors.data.map((mentor) => {
      const { firstName, name, mail, password } = mentor;
      console.log(
        `Mail ${mail} - name ${name} - firstName${firstName} pw- ${password}`
      );

      salida += `
              <tr>
                <td>${name}</td>
                <td>${firstName}</td>
                <td>${mail}</td>
                <td>${password}</td>
                <td> 
                  <div class="actions">
                    <button class="eliminar"><i class='bx bx-trash'></i></button>
                    <button class="editar"><i class='bx bx-edit' ></i></button>
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
  const password = document.getElementById("contrasenaMentor").value;
  const firstName = document.getElementById("firstName").value;
  const name = document.getElementById("nameMentor").value;

  const data = { mail, password, firstName, name };

  succesPost.innerHTML = `
    <i class='bx bx-check-circle' style="background-color:#D1FADF;color:#039855;padding:10px;border-radius:8px"></i>
    <p>Creando nuevo Maestro...</p>
  `;
  succesPost.classList.add("aviso-click");
  const newMentor = await create(data);

  if (newMentor.code != 200) alert(`Error ${newMentor.message}`);
  else {
    alert(`ID de Carrera ${newMentor.data.id}`);
    succesPost.innerHTML = `
    <i class='bx bx-check-circle' style="background-color:#D1FADF;color:#039855;padding:10px;border-radius:8px"></i>
    <p>Mentor Creado con éxito</p>
  `;
    succesPost.classList.add("aviso-click");
  }
});
