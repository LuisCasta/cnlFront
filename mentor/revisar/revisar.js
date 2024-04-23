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
const int = obtainId("int-act");
const inicio = obtainId("init-act");
const fin = obtainId("fin-act");

// console.log(backLink);
// console.log(`este es idCurso: ${idCourse}`);
// console.log(`este es idUnit: ${idUnit}`);

backLink.href = `../about-unit/about.html?idCurso=${idCourse}&idUnit=${idUnit}&idMentor=${idMentor}`;

async function loadGetActivityStudentById() {
  const revisarAct = await getByIdActivity(idActivity);
  if (revisarAct.code != 200) {
    alert(`Error ${revisarAct.message}`);
  } else {
    const { name, description, dateEnd, dateStart, intent } = revisarAct.data;
    const nameActivity = obtainId("name-activity");
    const descAct = obtainId("descrip-act");
    descAct.value = description;
    nameActivity.value = name;
    int.value = intent;
    const endFormat = dateEnd.slice(0, -14).replaceAll("-", "-");
    const startFormat = dateStart.slice(0, -14).replaceAll("-", "-");
    inicio.value = startFormat;
    fin.value = endFormat;
  }
}

async function actualizarAct() {
  const name = obtainId("name-activity").value;
  const description = obtainId("descrip-act").value;
  const intent = int.value;
  const dateEnd = fin.value;
  const dateStart = inicio.value;
  const id = idActivity;
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
      const { estatus, name, secondName, idActStudent, score, firstName } =
        student;
      console.log(student);
      listActivStu += `
    <tr>
      <td data-cell="Nombre"><p>${name}</p></td>
      <td data-cell="Estatus"><p>${estatus}</p></td>
      <td data-cell="Revisar">
        <button onclick='mostrarDataActAlumno(${idActStudent},${score},"${name}","${firstName}","${secondName}");' id="revisar_${idActStudent}" data-score=${score} data-sname=${secondName} data-idas=${idActStudent} class="btn-check">Revisar</button>
      </td>
    </tr>
    `;
    });

    tabListStu.innerHTML = listActivStu;
  }
}

async function mostrarDataActAlumno(
  idActAlu,
  score,
  name,
  firstName,
  secondName
) {
  score === null ? (score = 0) : (score = score);
  let nombre = obtainId("coment-stu");
  let califFinalAct = obtainId("link-revisar");
  nombre.textContent = name + " " + firstName + " " + secondName;
  califFinalAct.value = parseFloat(score);
  revisarActividadBtn.setAttribute("data-idact", `${idActAlu}`);
}

revisarActividadBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const idActalu = revisarActividadBtn.dataset.idact;
  const score = obtainId("link-revisar").value;
  const commentScore = obtainId("comments").value;

  console.log(score, commentScore, idActalu);
  const data = { actStudId: idActalu, commentScore, score };
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

  // setTimeout(function () {
  //   location.reload();
  // }, 4000);
});
