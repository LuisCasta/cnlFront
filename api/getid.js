"use strict";
function obtainId(id) {
  const getID = document.getElementById(id);
  return getID;
}
function limpiarInputs() {
  const inputs = document.querySelectorAll(".input-form");

  inputs.forEach(function (input) {
    input.value = ""; // Limpiar el valor del input
  });
}
