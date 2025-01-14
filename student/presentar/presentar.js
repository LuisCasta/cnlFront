"use strict";
let user = localStorage.getItem("user");
let idStudent = 0;
if (user) {
  user = JSON.parse(user);
  idStudent = user.id;
} else {
  window.location.replace("../../index.html");
}
const succesPost = document.getElementById("succes-post");
const enviarActividadBtn = document.getElementById("presentar-actividad");
async function loadActivitiesPresentar() {
  const presentarAct = await getActivityMentorStudent(idActivity);
  // console.log(presentarAct.data);
  if (presentarAct.code != 200) {
    alert(`Error ${presentarAct.message}`);
  } else {
    const { name, description, link, intent } = presentarAct.data;
    const nameActivity = document.getElementById("name-activity");
    const descAct = document.getElementById("descrip-act");
    const intentosText = document.getElementById("num-intent");
    const linkHelp = document.getElementById("help");
    intentosText.textContent = intent;
    linkHelp.href = link;
    descAct.textContent = description;
    nameActivity.textContent = name;
  }
}

enviarActividadBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  let linkFirst = document.getElementById("link-presentar");
  let link = linkFirst.value;
  const data = { idStudent, idActivity, link };

  const presentarActividad = await sendActivity(data);
  if (presentarActividad.code != 200) {
    // console.log(presentarActividad);
    console.log(
      `Error ${presentarActividad.message}, ${presentarActividad.code}`
    );
    setTimeout(function () {
      succesPost.classList.add("aviso-click");
      succesPost.innerHTML = `
        <i class='bx bx-error' 
        style="background-color:##FEE4E2;color:
        #D92D20;padding:10px;border-radius:8px">
        </i>
        <p>${presentarActividad.message}</p>`;
    }, 10);

    setTimeout(function () {
      succesPost.innerHTML = "";
      succesPost.classList.remove("aviso-click");
    }, 6500);
  } else {
    let intentosToast = presentarActividad.data.attemptsAvailable;
    // console.log(intentosToast);
    linkFirst.value = "";
    setTimeout(function () {
      succesPost.innerHTML = `
        <i class='bx bx-check-circle' style="color:#039855;padding:10px;border-radius:8px"></i>
        <p>Actividad  enviada con éxito</p>
      `;
      succesPost.classList.add("aviso-click");
    }, 100);

    setTimeout(function () {
      succesPost.innerHTML = `
        <i class='bx bx-check-circle' style="color:#039855;padding:10px;border-radius:8px"></i>
        <p>Te quedan ${intentosToast} intentos</p>
      `;
      succesPost.classList.add("aviso-click");
    }, 4000);

    setTimeout(function () {
      succesPost.innerHTML = "";
      succesPost.classList.remove("aviso-click");
    }, 6500);
  }
  await getRateIntentActivity();
});

function formatearFechaSimple(fechaString) {
  // Cortar la parte de la fecha (los primeros 10 caracteres)
  const fechaCortada = fechaString.split("T")[0];

  // Separar en año, mes, y día
  const [año, mes, día] = fechaCortada.split("-");

  // Reconstruir en el formato deseado: día mes año, con espacios en lugar de guiones
  const fechaFormateada = `${día}/${mes}/${año}`;

  return fechaFormateada;
}

function obtenerHora(fechaString) {
  // Cortar la parte de la hora (lo que está después de la "T")
  const horaCortada = fechaString.split("T")[1];

  // Separar la hora completa en horas, minutos y segundos
  const [hora, minutos] = horaCortada.split(":");

  // Retornar la hora en formato "HH:MM"
  return `${hora}:${minutos}`;
}

async function getRateIntentActivity() {
  const rateIntent = await getRateIntent(idStudent, idActivity);
  // console.log(rateIntent);
  // console.log(rateIntent.code, "1");
  if (rateIntent.code != 200) {
    // console.log("no hay nada para mostrar");
  } else {
    const keys = Object.keys(rateIntent.data);
    if (keys.length > 0) {
      const { score, status, commentScore, link, sendDate, intent } =
        rateIntent.data;

      const linkPresentar = document.getElementById("link-presentar");
      linkPresentar.value = link;
      const messageCalif = document.getElementById("calif-parrafo");
      return (messageCalif.innerHTML = `
          <p><i class='bx bx-notification'></i>Ya presentaste esta acitividad. Estatus: "${status}"</p>
          <p><i class='bx bx-bookmark-plus'></i>Esta es tu calificación: 
           <b style="font-size:20px">${
             score === 0 ||
             score === undefined ||
             score === null ||
             score === ""
               ? " Aún no califican"
               : " " + score
           }</b></p>
           <div>
              <p><i class="bx bx-message-detail"></i>Comentarios del Tutor:</p>
              <p> "${
                commentScore === 0 ||
                commentScore === undefined ||
                commentScore === null ||
                commentScore === ""
                  ? "No hay comentarios"
                  : commentScore
              }"</p>
          </div>
          <div>
              <p><i class='bx bx-check-square'></i></i>Intentos realizados: ${intent}</p>
          </div>
          <div>
              <p><i class='bx bx-time'></i>Fecha y hora de último envío:</p>
              <p class="p-hour-date">"${
                sendDate === 0 ||
                sendDate === undefined ||
                sendDate === null ||
                sendDate === ""
                  ? "No hay fecha y hora aún"
                  : formatearFechaSimple(sendDate) +
                    ", a las " +
                    obtenerHora(sendDate)
              }"</p>
          </div>
       `);
    } else {
      // console.log("No hay nada");
      const messageCalif = document.getElementById("calif-parrafo");
      return (messageCalif.innerHTML = `
          <p><i class="bx bx-message-detail"> </i>No has presentado la Actividad</p>
           <p><i class='bx bx-bookmark-plus'></i> Aún no hay calificación para tu Tarea</p>
             <p><i class="bx bx-message-detail"></i>Comentarios del Tutor: Aún no tienes comentarios</p>
       `);
    }
  }
}
