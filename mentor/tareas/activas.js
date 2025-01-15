const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idCourse = urlParams.get("idCurso");
console.log(idCourse);

async function updateSchedule() {
  console.log("click");
  const schedule = obtainId("horario").value;
  console.log(schedule);
  const data = {
    idCourse,
    schedule,
  };
  const updateHorario = await updateScheduleCourse(data);
  // console.log(data);
  console.log(`is Updated ${updateHorario}`);
  if (updateHorario.code != 200) {
    succesPost.classList.add("aviso-click");
    succesPost.innerHTML = `
  <i class='bx bx-error-alt' style='color:#d61717'  ></i>
    <p>Hubo un problema con el horario, revisa que no esté vacío</p>
 `;
    // await showForo();

    setTimeout(() => {
      succesPost.classList.remove("aviso-click");
      succesPost.innerHTML = `
        <p></p>
     `;
    }, 5000);
    alert(`Error ${updateHorario.message}`);
  } else {
    succesPost.innerHTML = `
  <i class='bx bx-check-circle bx-tada'></i>
    <p>Horario actualizado</p>
 `;
    succesPost.classList.add("aviso-click");

    setTimeout(() => {
      succesPost.classList.remove("aviso-click");
    }, 3000);
  }
}

const activeLink = document.getElementById("a-activity");
function obtainId(id) {
  const getId = document.getElementById(id);
  return getId;
}
let user = localStorage.getItem("user");
let idMentor = 0;
if (user) {
  user = JSON.parse(user);
  idMentor = user.id;
} else {
  window.location.replace("../../index.html");
}
// console.log(activeLink);
activeLink.href = `../unit/unit.html?idCurso=${idCourse}`;

// const hrefBread = obtainId("href-mentor");
// console.log(hrefBread);
// hrefBread.href = `../mentor/mentor.html`;

// FORMATEAR LINK DE VIDEO

function getDriveVideoId(url) {
  const regex = /\/d\/([a-zA-Z0-9_-]+)\//;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function getPreviewLink(driveUrl) {
  const videoId = getDriveVideoId(driveUrl);
  if (videoId) {
    return `https://drive.google.com/file/d/${videoId}/preview`;
  } else {
    return null;
  }
}

// FORMATEAR LINK DE PDF PARA VISUALIZARLO

function getDriveFileId(url) {
  const regex = /\/d\/([a-zA-Z0-9_-]+)\//;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function getPreviewLink(pdfUrl) {
  const fileId = getDriveFileId(pdfUrl);
  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  } else {
    return null;
  }
}

async function LoadGetTutorById() {
  const tutor = await getMentorById(idMentor);
  if (tutor.code != 200) {
    console.log(`Error ${tutor.message}`);
  } else {
    // console.log(tutor.data);

    const { videolink, cvlink } = tutor.data;
    const inputVideo = obtainId("link-video");
    const InputCv = obtainId("link-cv");
    const driveUrl = videolink; // Reemplaza con tu URL de Google Drive
    const directLink = getPreviewLink(driveUrl);
    const pdfUrl = cvlink;
    const directPdfLink = getPreviewLink(pdfUrl);
    const pdfIframe = obtainId("pdf-iframe");
    pdfIframe.src = directPdfLink;
    // console.log(inputVideo, InputCv);
    InputCv.value = cvlink;
    inputVideo.value = videolink;
    const videoTutor = obtainId("video-link-play");
    videoTutor.src = directLink;
  }
}

// UPDATE MENTOR PRESENTATION

async function savePresentation() {
  const inputVideo = obtainId("link-video").value;
  const InputCv = obtainId("link-cv").value;
  const cvlink = InputCv;
  const videolink = inputVideo;

  const data = {
    cvlink,
    videolink,
    mentorId: idMentor,
  };

  const updatePresentation = await updateTutorPresentation(data);
  // console.log(data);
  console.log(`is Updated ${updatePresentation}`);

  setTimeout(() => {
    location.reload();
  }, 1000);
}

function expandir() {
  const iconExpand = obtainId("expandir");
  // iconExpand.classList.remove("bx-expand-vertical");
  const containerAsignature = obtainId("card-header-asign");
  containerAsignature.classList.toggle("height-container");
}
