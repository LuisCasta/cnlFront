const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idMentor = urlParams.get("idMentor");
const idCourse = urlParams.get("idCurso");

const activeLink = document.getElementById("a-activity");

console.log(activeLink);

activeLink.href = `../unit/unit.html?idCurso=${idCourse}&idMentor=${idMentor}`;
