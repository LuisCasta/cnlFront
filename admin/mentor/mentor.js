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
      salida += `
              <tr>
                <td data-cell="Name" >${name}</td>
                <td data-cell="FirstName">${firstName}</td>
                <td data-cell="Mail">${mail}</td>
                <td data-cell="PW">${password}</td>
                <td data-cell="Actions"> 
                  <div class="actions">
                    <button class="eliminar"><i class='bx bx-trash'></i></button>
                    <button class="editar"><i class='bx bx-edit' ></i></button>
                    <a href="../add-subject/addsubject.html" class="gestionCarrera"><button><i class='bx bx-cog'></i></button></a>
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

  // Succes Post
  succesPost.innerHTML = `
 <i class='bx bx-loader-circle bx-spin' ></i>
 <p>Creando nueva docente<p>
`;
  succesPost.classList.add("aviso-click");

  const newMentor = await create(data);
  if (newMentor.code != 200) alert(`Error ${newMentor.message}`);
  else {
    succesPost.innerHTML = `
<i class='bx bx-check-circle bx-tada' style="color:#38b000"></i>
 <p>Docente: ${name} creado con éxito</p>
`;
    succesPost.classList.add("aviso-click");
  }

  setTimeout(function () {
    location.reload();
  }, 4000);
});
