const btnLesson = document.getElementById("clases");
const btnActiv = document.getElementById("activ");
const btnStud = document.getElementById("students");
const btnCall = document.getElementById("calls");
const btnRates = document.getElementById("rates");
// contenedores
const contRate = document.getElementById("rates-div");
const contLesson = document.getElementById("div-clases");
const contActiv = document.getElementById("div-actividades");
const conStud = document.getElementById("div-alumnos");
const contCall = document.getElementById("div-call");

// contLesson.classList.add("disabled");
conStud.classList.add("disabled");
contCall.classList.add("disabled");
contActiv.classList.add("disabled");
contRate.classList.add("disabled");

btnLesson.classList.add("button-bottom");

btnActiv.addEventListener("click", ocultarDivs);
btnLesson.addEventListener("click", ocultarDivs1);
btnStud.addEventListener("click", ocultarDivs2);
btnCall.addEventListener("click", ocultarDivs3);
btnRates.addEventListener("click", ocultarDivs4);

function ocultarDivs() {
  // CLASES EN CONTAINER
  contLesson.classList.add("disabled");
  conStud.classList.add("disabled");
  contCall.classList.add("disabled");
  contActiv.classList.remove("disabled");
  contRate.classList.add("disabled");

  //   clases en Botones
  btnActiv.classList.add("button-bottom");
  btnLesson.classList.remove("button-bottom");
  btnStud.classList.remove("button-bottom");
  btnCall.classList.remove("button-bottom");
  btnRates.classList.remove("button-bottom");
}

function ocultarDivs1() {
  contLesson.classList.remove("disabled");
  conStud.classList.add("disabled");
  contCall.classList.add("disabled");
  contActiv.classList.add("disabled");
  contRate.classList.add("disabled");

  //   clases en Botones
  btnLesson.classList.add("button-bottom");
  btnActiv.classList.remove("button-bottom");
  btnStud.classList.remove("button-bottom");
  btnCall.classList.remove("button-bottom");
  btnRates.classList.remove("button-bottom");
}

function ocultarDivs2() {
  contLesson.classList.add("disabled");
  conStud.classList.remove("disabled");
  contCall.classList.add("disabled");
  contActiv.classList.add("disabled");
  contRate.classList.add("disabled");

  //   clases en Botones
  btnStud.classList.add("button-bottom");
  btnCall.classList.remove("button-bottom");
  btnLesson.classList.remove("button-bottom");
  btnActiv.classList.remove("button-bottom");
  btnRates.classList.remove("button-bottom");
}

function ocultarDivs3() {
  contLesson.classList.add("disabled");
  conStud.classList.add("disabled");
  contCall.classList.remove("disabled");
  contActiv.classList.add("disabled");
  contRate.classList.add("disabled");

  //   clases en Botones
  btnCall.classList.add("button-bottom");
  btnStud.classList.remove("button-bottom");
  btnLesson.classList.remove("button-bottom");
  btnActiv.classList.remove("button-bottom");
  btnRates.classList.remove("button-bottom");
}

function ocultarDivs4() {
  contLesson.classList.add("disabled");
  conStud.classList.add("disabled");
  contCall.classList.add("disabled");
  contActiv.classList.add("disabled");
  contRate.classList.remove("disabled");
  //   clases en Botones
  btnCall.classList.remove("button-bottom");
  btnStud.classList.remove("button-bottom");
  btnLesson.classList.remove("button-bottom");
  btnActiv.classList.remove("button-bottom");
  btnRates.classList.add("button-bottom");
}
