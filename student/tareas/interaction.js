"use strict";
function obtainId(id) {
  const getID = document.getElementById(id);
  return getID;
}
console.log(idCourse);
// console.log(idStudent);
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const idMentor = urlParams.get("idMentor");
// OCULTAR Y MOSTRAR LOS ARCHIVOS pdf y video
const containerVideo = obtainId("container-video");
const containerForo = obtainId("comment-foro");
const containerPdf = obtainId("containerPdf");
const cardDocs = obtainId("card-docs");
const foro = obtainId("foro");
const schedule = obtainId("containerSchedule");

const succesPost = obtainId("succes-post");

// containerForo.classList.add("hide");
foro.classList.add("hide");
containerVideo.classList.add("fadeOut");
containerPdf.classList.add("fadeOut");
cardDocs.classList.add("hide");
schedule.classList.add("hide");
// console.log(cardDocs, foro);

async function showSchedule() {
  //Abrir Foro
  schedule.classList.remove("hide");
  schedule.classList.add("show-card");

  foro.classList.add("hide");
  foro.classList.remove("show-card");

  // cerrar docs
  cardDocs.classList.add("hide");
  cardDocs.classList.remove("show-card");

  //cerrar pdf
  containerPdf.classList.remove("show-container");
  containerPdf.classList.add("fadeOut");

  //cerrar video

  containerVideo.classList.remove("show-container");
  containerVideo.classList.add("fadeOut");

  const id = idCourse;
  const cursoHorario = await courseGetById(id);
  console.log(cursoHorario.data);
  const textArea = obtainId("horario");
  console.log(textArea);
  if (
    cursoHorario.data.schedule == null ||
    cursoHorario.data.schedule == undefined ||
    cursoHorario.data.schedule == ""
  ) {
    textArea.value = "Aún no hay horario para mostrar";
  } else {
    textArea.value = cursoHorario.data.schedule;
  }
}

function verPdf() {
  containerPdf.classList.add("show-container");
  containerPdf.classList.remove("fadeOut");

  //   quita las clases de visualización de video
  containerVideo.classList.remove("show-container");
  containerVideo.classList.add("fadeOut");

  //cerrar horario
  schedule.classList.add("hide");
  schedule.classList.remove("show-card");
}

function reproducirVideo() {
  containerVideo.classList.add("show-container");
  containerVideo.classList.remove("fadeOut");

  //   quita las clases de visualización de pdf
  containerPdf.classList.remove("show-container");
  containerPdf.classList.add("fadeOut");

  //cerrar mensajes del foro

  schedule.classList.add("hide");
  schedule.classList.remove("show-card");
}

function abrirDocs() {
  cardDocs.classList.remove("hide");
  cardDocs.classList.add("show-card");
  // Cerrar foro
  foro.classList.add("hide");
  foro.classList.remove("show-card");

  //cerrar mensajes del foro
  schedule.classList.add("hide");
  schedule.classList.remove("show-card");
}

async function showForo() {
  foro.classList.remove("hide");
  foro.classList.add("show-card");

  // cerrar docs
  cardDocs.classList.add("hide");
  cardDocs.classList.remove("show-card");

  //cerrar pdf
  containerPdf.classList.remove("show-container");
  containerPdf.classList.add("fadeOut");

  //cerrar video

  containerVideo.classList.remove("show-container");
  containerVideo.classList.add("fadeOut");

  //Abrir Foro
  schedule.classList.add("hide");
  schedule.classList.remove("show-card");

  // console.log(idCourse);
  // console.log(idStudent, "3");
  const messages = await ListMessagesForo(idCourse);
  let containerMessage = "";
  const containerForo = obtainId("comment-foro");
  // console.log(messages);
  messages.data.data.data.reverse();
  messages.data.data.data.forEach((foroMessage) => {
    const { createdAt, name, message, idStudent } = foroMessage;
    // console.log(foroMessage);
    function capitalizeInitials(name) {
      return name
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }
    containerMessage += `
    <div class="content-static-2">
    <div class="text-name">
    <div class="image-h5" >
    <p class="circle-p" style="color:white;">${name.trim()[0]}</p>
      <h5 id="name-forum" class=${
        idStudent == null ? "name-h5-tutor" : "name-h5-student"
      }>${capitalizeInitials(name)}</h5>
     </div> 
      <p id="message-forum message-foro">${message}</p>
    </div>
    <span id="fecha-forum" class="fecha-foro">${createdAt
      .slice(0, -14)
      .replaceAll("-", "/")}</span>
  </div>
    `;
  });
  containerForo.innerHTML = containerMessage;
}
// console.log(idStudent, "2");
async function sendMessageForo() {
  const messageValue = obtainId("message");
  // console.log(messageValue);
  const message = messageValue.value;
  const data = { idCourse, idStudent, message };
  // console.log(data);

  // Succes Post
  succesPost.innerHTML = `
   <i class='bx bx-loader-circle bx-spin' ></i>
   <p>Enviando Mensaje ...</p>
 `;
  succesPost.classList.add("aviso-click");
  setTimeout(() => {
    succesPost.innerHTML = "";
    succesPost.classList.remove("aviso-click");
  }, 3000);

  const sendMessageNow = await enviarMensaje(data);
  if (sendMessageNow.code != 200) {
    setTimeout(() => {
      succesPost.innerHTML = `
   <i class='bx bx-error-circle'  ></i>
   <p>Ha habido un error al enviar mensaje, revisa que tu mensaje no esté vacío</p>
 `;
      succesPost.classList.add("aviso-click");
    }, 3000);
    setTimeout(() => {
      succesPost.innerHTML = "";
      succesPost.classList.remove("aviso-click");
      console.log(sendMessageNow.code);
      // alert(`Error ${sendMessageNow.message}`);
    }, 6000);
  } else {
    succesPost.innerHTML = ` <i class='bx bx-check-circle bx-tada'></i> <p>Mensaje enviado</p> `;
    succesPost.classList.add("aviso-click");
    setTimeout(() => {
      succesPost.classList.remove("aviso-click");
    }, 3000);

    await showForo();
  }
}
