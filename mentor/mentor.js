"use strict";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idGroup = urlParams.get("idGroup");
const idCareer = urlParams.get("idCarrera");
async function loadCursosById() {
  const cusros = await getAll(idGroup);
}
