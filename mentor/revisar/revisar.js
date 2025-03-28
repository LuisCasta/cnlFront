"use strict";
function obtainId(id) {
  const getID = document.getElementById(id);
  return getID;
}
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idActivity = urlParams.get("idActivity");
// const actStudId = urlParams.get("actStudId");
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

backLink.href = `../about-unit/about.html?idCurso=${idCourse}&idUnit=${idUnit}`;

async function loadGetActivityStudentById() {
  const revisarAct = await getByIdActivity(idActivity);
  // console.log(revisarAct);
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
    linkAct.value = link === null ? "no hay Link para mostrar" : link;
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
    const dateEnd = `${fin.value}T23:59:59.999`;
    const dateStart = inicio.value;
    const btn = obtainId("data-act");
    const idLesson = btn.getAttribute("data-idlesson");
    const idUnit = btn.getAttribute("data-idunit");
    const idCourse = btn.getAttribute("data-idcourse");
    const type = btn.getAttribute("data-type");

    const activityId = id;
    // console.log(activityId);
    // console.log(link);
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
    // console.log(updateData);
    if (updateData.code != 200) {
      setTimeout(function () {
        succesPost.innerHTML = `
        <i class='bx bx-x'></i>
        <p>No se pudo actualizar la actividad ${name}</p>`;
        succesPost.classList.add("aviso-click");
      }, 100);
      setTimeout(function () {
        succesPost.innerHTML = "";
        succesPost.classList.remove("aviso-click");
      }, 7000);
    } else {
      setTimeout(function () {
        succesPost.innerHTML = `
        <i class='bx bx-check-circle'></i>
        <p>Actividad actualizada con éxito</p>`;
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

let listActivStu = "";
async function loadListCheck() {
  const revisarActStuList = await loadListActivityStudentCheck(idActivity);
  // console.log(revisarActStuList.data);
  if (revisarActStuList.code != 200) {
    console.log(`Error ${revisarActStuList.message}`);
  } else {
    revisarActStuList.data.forEach((student) => {
      const {
        status,
        name,
        secondName,
        idActStudent,
        score,
        firstName,
        link,
        commentScore,
        id,
      } = student;

      listActivStu += `
    <tr class="td-check">
      <td data-cell="Nombre"><p>${name}</p></td>
      <td data-cell="Estatus"><p class="${
        status == null
          ? "pendiente"
          : status == "Revisado"
          ? "checked-task"
          : status == "Enviado"
          ? "enviada"
          : ""
      }">${status == null ? "no enviado" : status}</p></td>
      <td data-cell="Revisar" class="check-status">
        <a data-tooltip="Revisar" onclick='mostrarDataActAlumno(${idActStudent},${score},"${name}","${firstName}","${secondName}","${link}",${JSON.stringify(
        commentScore
      )}, "${id}");' id="revisar_${idActStudent}" data-score=${score} data-sname=${secondName} data-idas=${idActStudent} 
        class="btn-check">
         <div class="icon-square checkbox-btn">
        <i class="i-btn bx bx-sm ${
          status == "Pendiente" ? "bx-check" : "bx-check-square"
        }"></i>
        </div>
        </a>
      </td>
    </tr>
    `;
    });

    tabListStu.innerHTML = listActivStu;
    // Seleccionar todos los elementos con la clase btn-checkbox
    // Seleccionar el contenedor principal (puede ser <tbody>)
    // Escuchar el evento click en el contenedor
    const allIcons = tabListStu.querySelectorAll(".i-btn");
    allIcons.forEach((icon) => icon.classList.add("inactive"));
    tabListStu.addEventListener("click", (event) => {
      // Verificar si el clic ocurrió en una fila o en un elemento dentro de ella
      const clickedRow = event.target.closest("tr");

      if (clickedRow) {
        // Remover la clase 'active' de todos los íconos en la tabla
        allIcons.forEach((icon) => icon.classList.remove("active"));

        // Agregar la clase 'active' solo al ícono de la fila clickeada
        const icon = clickedRow.querySelector(".i-btn");
        if (icon) {
          icon.classList.add("active");
        }
      }
    });
  }
}

async function mostrarDataActAlumno(
  idActAlu,
  score,
  name,
  firstName,
  secondName,
  link,
  commentScore,
  id
) {
  score === null ? (score = 0) : (score = score);
  let nombre = obtainId("act-alumno");
  let commentStu = obtainId("comments");
  commentStu.textContent =
    commentScore === "null" ? "No hay comentarios" : commentScore;
  let linkStu = obtainId("link-act");

  if (link === null || link === undefined || link === "") {
    linkStu.style.display = "none";
  } else {
    linkStu.style.display = "flex";
    linkStu.href = link;
    linkStu.textContent = "Link a la actividad";
  }

  let califFinalAct = obtainId("link-revisar");
  nombre.textContent = name + " " + firstName + " " + secondName;
  califFinalAct.value = parseFloat(score);
  revisarActividadBtn.setAttribute("data-idact", `${idActAlu}`);

  const data = { idStudent: id, idActivity, link: "" };
  try {
    const obtenerDatos = await sendActivity(data);
    console.log(obtenerDatos);
  } catch (error) {
    alert(error);
  }
}

revisarActividadBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const idActalu = revisarActividadBtn.dataset.idact;
  const score = obtainId("link-revisar").value;
  const commentScore = obtainId("comments").value;

  // console.log(score, commentScore, idActalu);
  const data = { actStudId: idActalu, commentScore, score };
  // console.log(idActalu);

  const revisarActividad = await chekActivityStudentById(data);
  if (revisarActividad.code != 200) alert(`Error ${revisarActividad.message}`);
  else {
    succesPost.innerHTML = `
 <i class='bx bx-check-circle bx-tada' style="color:#38b000"></i>
   <p>Actividad revisada</p>
 `;
    succesPost.classList.add("aviso-click");

    setTimeout(() => {
      succesPost.innerHTML = "";
      succesPost.classList.remove("aviso-click");
    }, 3000);
  }
});
