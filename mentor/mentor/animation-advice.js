const notifications = document.querySelectorAll(".notification");
console.log(notifications);
const reticula = document.getElementById("reticula");
reticula.style.display = "none";
const asignaturasContainer = document.getElementById("asignaturas");
const cardtitle = document.getElementById("card-title");
const finder = document.getElementById("finder");
const cursos = document.getElementById("static-div");
const advices = document.getElementById("content-advices");
const reticulaBtn = document.querySelector(".reticula-button");
const asignBtn = document.querySelector(".asignaturas-button");

asignBtn.classList.add("active");

function changeAssigment() {
  reticula.style.display = "none";
  cursos.style.display = "none";
  finder.style.display = "none";
  cardtitle.style.display = "none";
  asignaturasContainer.style.display = "none";
  advices.style.display = "none";
  reticula.style.display = "block";
  asignBtn.classList.remove("active");
  reticulaBtn.classList.add("active");
}

function backAssigment() {
  advices.style.display = "flex";
  reticula.style.display = "none";
  asignaturasContainer.style.display = "flex";
  cardtitle.style.display = "flex";
  finder.style.display = "flex";
  cursos.style.display = "flex";
  asignBtn.classList.add("active");
  reticulaBtn.classList.remove("active");
}
