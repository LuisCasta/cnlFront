"use strict";
function obtainId(id) {
  const getId = document.getElementById(id);
  return getId;
}
const btnAc = obtainId("Ac");
const btnVc = obtainId("vc");
const btnCf = obtainId("cf");

const containerAc = obtainId("acti");
const containerVc = obtainId("vi");
const containerCa = obtainId("cali");

btnAc.classList.add("active");
containerVc.classList.add("disable");
containerCa.classList.add("disable");

const buttons = [btnAc, btnVc, btnCf];
const containers = [containerAc, containerVc, containerCa];

buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => ocultarCambiar(index));
});

function ocultarCambiar(index) {
  console.log(index, "ok");
  for (const [i, value] of containers.entries()) {
    if (value.classList.contains("disable") && i == index) {
      value.classList.remove("disable");
    } else if (!value.classList.contains("disable") && i !== index) {
      value.classList.add("disable");
    }
  }
}
