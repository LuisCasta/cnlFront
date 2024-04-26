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
    const {
      id,
      name,
      description,
      dateEnd,
      dateStart,
      intent,
      type,
      idCourse,
      idLesson,
      link,
      idUnit,
    } = revisarAct.data;
    const nameActivity = obtainId("name-activity");
    const linkAct = obtainId("link-act-up");
    const descAct = obtainId("descrip-act");
    const btn = obtainId("data-act");
    btn.setAttribute("data-idcourse", `${idCourse}`);
    btn.setAttribute("data-idlesson", `${idLesson}`);
    btn.setAttribute("data-type", `${type}`);
    btn.setAttribute("data-idunit", `${idUnit}`);
    btn.setAttribute("onclick", `actualizarAct(${id})`);
    descAct.value = description;
    linkAct.value = link;
    nameActivity.value = name;
    int.value = intent;
    const endFormat = dateEnd.slice(0, -14).replaceAll("-", "-");
    const startFormat = dateStart.slice(0, -14).replaceAll("-", "-");
    inicio.value = startFormat;
    fin.value = endFormat;
  }
}

async function actualizarAct(id) {
  if (confirm("¿Estás seguro de que deseas continuar?")) {
    const name = obtainId("name-activity").value;
    const description = obtainId("descrip-act").value;
    const link = obtainId("link-act-up").value;
    const intent = int.value;
    const dateEnd = fin.value;
    const dateStart = inicio.value;
    const btn = obtainId("data-act");
    const idLesson = btn.getAttribute("data-idlesson");
    const idUnit = btn.getAttribute("data-idunit");
    const idCourse = btn.getAttribute("data-idcourse");
    const type = btn.getAttribute("data-type");

    const activityId = id;
    console.log(activityId);
    console.log(link);
    const updateData = await updateActivity({
      name,
      description,
      intent,
      dateEnd,
      dateStart,
      idLesson,
      idCourse,
      idUnit,
      type,
      link,
      activityId,
    });
    console.log(updateData);
    if (updateData.code != 200) {
      alert(`Error al actualizar la actividad llamada: ${name}`);
    } else {
      setTimeout(function () {
        succesPost.innerHTML = `
        <i class='bx bx-check-circle'></i>
        <p>Carrera actualizada con éxito</p>`;
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
      const { estatus, name, secondName, idActStudent, score, firstName } =
        student;
      // console.log(student);
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
