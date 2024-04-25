function obtainId(id) {
  const getId = document.getElementById(id);
  return getId;
}
const btnLesson = obtainId("clases");
const btnActiv = obtainId("activ");
const btnStud = obtainId("students");
const btnCall = obtainId("calls");
const btnRates = obtainId("rates");
// contenedores
const contRate = obtainId("rates-div");
const contLesson = obtainId("div-clases");
const contActiv = obtainId("div-actividades");
const conStud = obtainId("div-alumnos");
const contCall = obtainId("div-call");

const buttons = [btnActiv, btnLesson, btnStud, btnCall, btnRates];
const containers = [contActiv, contLesson, conStud, contCall, contRate];

buttons[0].classList.add("button-bottom");
containers[1].classList.add("disabled");
containers[2].classList.add("disabled");
containers[3].classList.add("disabled");
containers[4].classList.add("disabled");

buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => toggleVisibility(index));
});

function toggleVisibility(index) {
  // console.log(index);
  for (const [i, value] of containers.entries()) {
    if (value.classList.contains("disabled") && i === index) {
      // console.log(i, value);
      value.classList.remove("disabled");
    } else {
      if (!value.classList.contains("disabled") && i !== index) {
        // console.log(i, "No contiene disabled");
        value.classList.add("disabled");
      }
    }
  }
  for (const [i, value] of buttons.entries()) {
    if (!value.classList.contains("button-bottom") && i === index) {
      // console.log(i, "no la tiene");
      value.classList.add("button-bottom");
    } else {
      if (value.classList.contains("button-bottom") && i !== index) {
        // console.log(i, "no la tiene");
        value.classList.remove("button-bottom");
      }
    }
  }
}
