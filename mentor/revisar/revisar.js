"use strict";
function obtainId(id) {
  const getID = document.getElementById(id);
  return getID;
}
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idActivity = urlParams.get("actStudId");
const actStudId = urlParams.get("actStudId");
const idMentor = urlParams.get("idMentor");
const idCourse = urlParams.get("idCurso");
const idUnit = urlParams.get("idUnit");
const succesPost = obtainId("succes-post");
const revisarActividadBtn = obtainId("revisar-actividad");
const tabListStu = obtainId("listActStud");
const backLink = obtainId("bActiv");

// console.log(backLink);
// console.log(`este es idCurso: ${idCourse}`);
// console.log(`este es idUnit: ${idUnit}`);

backLink.href = `../about-unit/about.html?idCurso=${idCourse}&idUnit=${idUnit}&idMentor=${idMentor}`;

async function loadGetActivityStudentById() {
  const revisarAct = await getByIdActivity(idActivity);
  if (revisarAct.code != 200) {
    alert(`Error ${revisarAct.message}`);
  } else {
    const { name, description } = revisarAct.data;
    const nameActivity = obtainId("name-activity");
    const descAct = obtainId("descrip-act");
    descAct.textContent = description;
    nameActivity.textContent = name;
  }
}

async function loadActivityStudentById() {
  const revisarActStu = await getActivityStudentById(idActivity);
  const commentStu = obtainId("coment-stu");
  const linkstu = obtainId("link-act");
  commentStu.textContent = revisarActStu.data.commentStudent;
  linkstu.href = revisarActStu.data.link;
}

let listActivStu = "";
async function loadListCheck() {
  const revisarActStuList = await loadListActivityStudentCheck(idActivity);
  if (revisarActStuList.code != 200) {
    console.log(`Error ${revisarActStuList.message}`);
  } else {
    revisarActStuList.data.forEach((student) => {
      const { estatus, name } = student;
      listActivStu += `
    <tr>
      <td data-cell="Nombre">${name}</td>
      <td data-cell="Inicio">${estatus}</td>
      <td data-cell="Revisar">
        <button>
          <a class="btn-check" href="../revisar/revisar.html?idMentor=${idMentor}">Revisar</a>
        </button>
      </td>
    </tr>
    `;
    });

    tabListStu.innerHTML = listActivStu;
  }
}

revisarActividadBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const score = obtainId("link-revisar").value;
  const commentScore = obtainId("comments").value;
  const data = { actStudId, commentScore, score };
  // Succes Post
  succesPost.innerHTML = `
   <i class='bx bx-loader-circle bx-spin' ></i>
   <p>Revisando Actividad ...</p>
 `;
  succesPost.classList.add("aviso-click");

  const revisarActividad = await chekActivityStudentById(data);
  if (revisarActividad.code != 200) alert(`Error ${revisarActividad.message}`);
  else {
    succesPost.innerHTML = `
 <i class='bx bx-check-circle bx-tada' style="color:#38b000"></i>
   <p>Actividad revisada</p>
 `;
    succesPost.classList.add("aviso-click");
  }

  setTimeout(function () {
    location.reload();
  }, 4000);
});
