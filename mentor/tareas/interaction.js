"use strict";

// OCULTAR Y MOSTRAR LOS ARCHIVOS pdf y video
const containerVideo = obtainId("container-video");
const containerForo = obtainId("comment-foro");
const containerPdf = obtainId("containerPdf");
const cardDocs = obtainId("card-docs");
const foro = obtainId("foro");
const schedule = obtainId("containerSchedule");
console.log(schedule);

const succesPost = obtainId("succes-post");

// containerForo.classList.add("hide");
foro.classList.add("hide");
containerVideo.classList.add("fadeOut");
containerPdf.classList.add("fadeOut");
cardDocs.classList.add("hide");
schedule.classList.add("hide");
// console.log(cardDocs, foro);

function verPdf() {
  containerPdf.classList.add("show-container");
  containerPdf.classList.remove("fadeOut");

  //   quita las clases de visualización de video
  containerVideo.classList.remove("show-container");
  containerVideo.classList.add("fadeOut");

  //cerrar mensajes del foro
  // containerForo.classList.add("hide");
  // containerForo.classList.remove("show-container");
}

function reproducirVideo() {
  containerVideo.classList.add("show-container");
  containerVideo.classList.remove("fadeOut");

  //   quita las clases de visualización de pdf
  containerPdf.classList.remove("show-container");
  containerPdf.classList.add("fadeOut");

  //cerrar mensajes del foro

  // containerForo.classList.add("hide");
  // containerForo.classList.remove("show-container");
}

function abrirDocs() {
  cardDocs.classList.remove("hide");
  cardDocs.classList.add("show-card");
  // Cerrar foro
  foro.classList.add("hide");
  foro.classList.remove("show-card");

  // cerrar horario
  schedule.classList.add("hide");
  schedule.classList.remove("show-card");
  //cerrar mensajes del foro
  // containerForo.classList.add("hide");
  // containerForo.classList.remove("show-container");
}

function showSchedule() {
  schedule.classList.remove("hide");
  schedule.classList.add("show-card");
  cardDocs.classList.add("hide");
  foro.classList.add("hide");
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

  // cerrar horario
  schedule.classList.add("hide");
  schedule.classList.remove("show-card");

  //Abrir Foro
  // containerForo.classList.remove("hide");
  // containerForo.classList.add("show-container");

  const messages = await ListMessagesForo(idCourse);
  let containerMessage = "";
  const containerForo = obtainId("comment-foro");
  // console.log(messages.data);
  messages.data.data.data.reverse();
  messages.data.data.data.forEach((foroMessage) => {
    const { createdAt, name, message, idStudent = 2 } = foroMessage;
    // console.log(idStudent);
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

async function sendMessageForo() {
  const messageValue = obtainId("message");
  // console.log(messageValue);
  const message = messageValue.value;
  const data = { idCourse, idMentor, message };
  console.log(data);

  // Succes Post
  succesPost.innerHTML = `
   <i class='bx bx-loader-circle bx-spin' ></i>
   <p>Enviando Mensaje ...</p>
 `;
  succesPost.classList.add("aviso-click");

  const sendMessageNow = await enviarMensaje(data);
  if (sendMessageNow.code != 200) {
    console.log(code);
    alert(`Error ${sendMessageNow.message}`);
  } else {
    succesPost.innerHTML = `
  <i class='bx bx-check-circle bx-tada'></i>
    <p>Mensaje enviado</p>
 `;
    await showForo();
    succesPost.classList.add("aviso-click");

    setTimeout(() => {
      succesPost.classList.remove("aviso-click");
    }, 3000);
  }
}
