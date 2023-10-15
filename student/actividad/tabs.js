"use strict";
const btnAc = document.getElementById("Ac");
const btnVc = document.getElementById("vc");
const btnCf = document.getElementById("cf");

const containerAc = document.getElementById("acti");
const containerVc = document.getElementById("vi");
const containerCa = document.getElementById("cali");

btnAc.classList.add("active");

containerVc.classList.add("disable");
containerCa.classList.add("disable");

btnAc.addEventListener("click", cambiarVista);
btnCf.addEventListener("click", cambiarVista2);
btnVc.addEventListener("click", cambiarVista3);
function cambiarVista() {
  containerAc.classList.remove("disable");
  containerCa.classList.add("disable");
  containerVc.classList.add("disable");
}
function cambiarVista2() {
  containerAc.classList.add("disable");
  containerCa.classList.remove("disable");
  containerVc.classList.add("disable");
}
function cambiarVista3() {
  containerAc.classList.add("disable");
  containerCa.classList.add("disable");
  containerVc.classList.remove("disable");
}
