"use strict";
const succesPost = document.getElementById("succes-post");
const enviarActividadBtn = document.getElementById("presentar-actividad");
async function loadActivitiesPresentar() {
  const presentarAct = await getByIdActivity(idActivity);
  if (presentarAct.code != 200) {
    alert(`Error ${presentarAct.message}`);
  } else {
    const { name, description, link, intent } = presentarAct.data;
    const nameActivity = document.getElementById("name-activity");
    const descAct = document.getElementById("descrip-act");
    const intentosText = document.getElementById("num-intent");
    const linkHelp = document.getElementById("help");
    intentosText.textContent = intent;
    linkHelp.href = link;
    descAct.textContent = description;
    nameActivity.textContent = name;
  }
}

enviarActividadBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const link = document.getElementById("link-presentar").value;
  const data = { idStudent, idActivity, link };

  const presentarActividad = await sendActivity(data);
  if (presentarActividad.code != 200) {
    alert(`Error ${presentarActividad.message}`);

    setTimeout(function () {
      succesPost.classList.add("aviso-click");
      succesPost.innerHTML = `
        <i class='bx bx-error' 
        style="background-color:##FEE4E2;color:
        #D92D20;padding:10px;border-radius:8px">
        </i>
        <p>${presentarActividad.message}</p>`;
    }, 10);

    setTimeout(function () {
      succesPost.innerHTML = "";
      succesPost.classList.remove("aviso-click");
    }, 6500);
  } else {
    setTimeout(function () {
      succesPost.innerHTML = `
        <i class='bx bx-check-circle' style="color:#039855;padding:10px;border-radius:8px"></i>
        <p>Actividad ${presentarActividad.data.name} enviada con éxito</p>
      `;
      succesPost.classList.add("aviso-click");
    }, 100);

    setTimeout(function () {
      succesPost.innerHTML = "";
      succesPost.classList.remove("aviso-click");
    }, 6500);
  }
});
