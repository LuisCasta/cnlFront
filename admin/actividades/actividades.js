"use strict";
const succesPost = document.getElementById("succes-post");

document.getElementById("btnGuardarIntent").addEventListener("click", async () => {
  const activityId = document.getElementById("activityId").value;
  const intent = document.getElementById("intentos").value;

  if (!activityId || !intent) {
    succesPost.innerHTML = `<i class='bx bx-error-alt' style='color:#ec2828'></i><p>Completa los campos requeridos</p>`;
    succesPost.classList.add("aviso-click");
    setTimeout(() => { succesPost.innerHTML = ""; succesPost.classList.remove("aviso-click"); }, 3000);
    return;
  }

  succesPost.innerHTML = `<i class='bx bx-loader-circle bx-spin'></i><p>Guardando...</p>`;
  succesPost.classList.add("aviso-click");

  const result = await updateActivityIntent(activityId, parseInt(intent));

  if (result.code !== 200) {
    succesPost.innerHTML = `<i class='bx bx-error-alt' style='color:#ec2828'></i><p>Error al actualizar la actividad</p>`;
  } else {
    succesPost.innerHTML = `<i class='bx bx-check-circle bx-tada' style="color:#38b000"></i><p>Intentos actualizados con éxito</p>`;
    document.getElementById("activityId").value = "";
    document.getElementById("intentos").value = "";
  }

  setTimeout(() => { succesPost.innerHTML = ""; succesPost.classList.remove("aviso-click"); }, 3000);
});
