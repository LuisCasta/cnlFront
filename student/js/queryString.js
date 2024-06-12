const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idCourse = urlParams.get("idCourse");
const actStudId = urlParams.get("idActStudent");
const idActivity = urlParams.get("idActivity");
const idUnit = urlParams.get("idUnit");
