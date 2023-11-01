"use strict";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idActivity = urlParams.get("actStudId");
const actStudId = urlParams.get("actStudId");
const succesPost = document.getElementById("succes-post");
const revisarActividadBtn = document.getElementById("revisar-actividad");

async function loadGetActivityStudentById() {
  const revisarAct = await getByIdActivity(idActivity);
  console.log(revisarAct.data);
  if (revisarAct.code != 200) {
    alert(`Error ${revisarAct.message}`);
  } else {
    const { name, description } = revisarAct.data;
    const nameActivity = document.getElementById("name-activity");
    const descAct = document.getElementById("descrip-act");
    descAct.textContent = description;
    nameActivity.textContent = name;
  }
}

async function loadActivityStudentById() {
  const revisarActStu = await getActivityStudentById(idActivity);
  const commentStu = document.getElementById("coment-stu");
  const linkstu = document.getElementById("link-act");
  commentStu.textContent = revisarActStu.data.commentStudent;
  linkstu.href = revisarActStu.data.link;
}

revisarActividadBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const score = document.getElementById("link-revisar").value;
  const commentScore = document.getElementById("comments").value;
  const data = { actStudId, commentScore, score };

  console.log(data);
  const revisarActividad = await chekActivityStudentById(data);
  if (revisarActividad.code != 200) {
    alert(`Error ${revisarActividad.message}`);

    setTimeout(function () {
      succesPost.classList.add("aviso-click");
      succesPost.innerHTML = `
        <i class='bx bx-error' 
        style="background-color:##FEE4E2;color:
        #D92D20;padding:10px;border-radius:8px">
        </i>
        <p>${revisarActividad.message}</p>`;
    }, 10);

    setTimeout(function () {
      succesPost.innerHTML = "";
      succesPost.classList.remove("aviso-click");
    }, 6500);
  } else {
    setTimeout(function () {
      succesPost.innerHTML = `
        <i class='bx bx-check-circle' style="color:#039855;padding:10px;border-radius:8px"></i>
        <p>Actividad ${revisarActividad.data.actStudId} revisada con éxito</p>
      `;
      succesPost.classList.add("aviso-click");
    }, 100);

    setTimeout(function () {
      succesPost.innerHTML = "";
      succesPost.classList.remove("aviso-click");
    }, 6500);
  }
});
