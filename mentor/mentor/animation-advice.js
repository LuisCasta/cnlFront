const notifications = document.querySelectorAll(".notification");
console.log(notifications);
const reticula = document.getElementById("reticula");
reticula.style.display = "none";
const asignaturasContainer = document.getElementById("asignaturas");
const cardtitle = document.getElementById("card-title");
const finder = document.getElementById("finder");

function changeAssigment() {
  finder.style.display = "none";
  cardtitle.style.display = "none";
  asignaturasContainer.style.display = "none";
  reticula.style.display = "flex";
}

function backAssigment() {
  reticula.style.display = "none";
  asignaturasContainer.style.display = "flex";
  cardtitle.style.display = "flex";
  finder.style.display = "flex";
}
