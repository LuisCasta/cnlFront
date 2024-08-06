"use strict";
let user = localStorage.getItem("user");
let idStudent = 0;
if (user) {
  user = JSON.parse(user);
  idStudent = user.id;
} else {
  window.location.replace("../../index.html");
}
const succesPost = document.getElementById("succes-post");
const enviarActividadBtn = document.getElementById("presentar-actividad");
async function loadActivitiesPresentar() {
  const presentarAct = await getActivityMentorStudent(idActivity);
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

async function getRateIntentActivity() {
  const rateIntent = await getRateIntent(idStudent, idActivity);
  console.log(rateIntent.code, "1");
  if (rateIntent.code != 200) {
    // console.log("no hay nada para mostrar");
  } else {
    const keys = Object.keys(rateIntent.data);
    if (keys.length > 0) {
      const { score, status } = rateIntent.data;
      console.log(rateIntent.data);
      const messageCalif = document.getElementById("calif-parrafo");
      return (messageCalif.innerHTML = `
          <p><i class="bx bx-message-detail"> 
          </i>Ya presentaste esta acitividad. Estatus: "${status}"</p>
       `);
    } else {
      // console.log("No hay nada");
      const messageCalif = document.getElementById("calif-parrafo");
      return (messageCalif.innerHTML = `
          <p><i class="bx bx-message-detail"> </i>No has presentado la Actividad. </p>
       `);
    }
  }
}

// {
//   "message": "Success getEvaluation ",
//   "data": [
//       {
//           "idStudent": 8,
//           "name": "Luis",
//           "firstName": "Castañeda",
//           "secondName": "Villalobos",
//           "idCS": 21,
//           "calif": 0,
//           "fullname": "Castañeda Villalobos Luis",
//           "califRecomend": 40,
//           "listCalif": [
//               {
//                   "id": 24,
//                   "califRecomend": 40
//               },
//               {
//                   "id": 25,
//                   "califRecomend": "0"
//               }
//           ]
//       },
//       {
//           "idStudent": 9,
//           "name": "alberto",
//           "firstName": "sosa",
//           "secondName": "ramirez",
//           "idCS": 22,
//           "calif": 0,
//           "fullname": "sosa ramirez alberto",
//           "califRecomend": 0,
//           "listCalif": [
//               {
//                   "id": 24,
//                   "califRecomend": "0"
//               },
//               {
//                   "id": 25,
//                   "califRecomend": "0"
//               }
//           ]
//       }
//   ],
//   "headers": [
//       {
//           "idUnit": 24,
//           "nameUnit": "TareaAct1",
//           "percentage": 50
//       },
//       {
//           "idUnit": 25,
//           "nameUnit": "TareaAct2",
//           "percentage": 40
//       }
//   ]
// }
