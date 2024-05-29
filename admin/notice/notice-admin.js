"use strtict";
const succesPost = document.getElementById("succes-post");
async function createMessage() {
  let notice = document.getElementById("mensaje").value;
  const data = { notice, status: "activo" };
  // Succes Post
  succesPost.innerHTML = `
        <i class='bx bx-loader-circle bx-spin' ></i>
        <p>Creando nuevo aviso...</p>
        `;
  succesPost.classList.add("aviso-click");

  const newMessageAdmin = await newMessage(data);
  if (newMessageAdmin.code != 200) {
    console.log(newMessageAdmin.code);
    // Succes Post
    succesPost.classList.add("aviso-click");
    succesPost.innerHTML = `
   <i class='bx bx-loader-circle bx-spin' ></i>
   <p>Error al crear el nuevo aviso Valores duplicados...</p>
   `;
    setTimeout(() => {
      succesPost.classList.remove("aviso-click");
      succesPost.innerHTML = "";
    }, 3000);
  } else {
    // Succes Post
    succesPost.innerHTML = `
    <i class='bx bx-check-circle bx-tada'></i>
      <p>Aviso creado con éxito</p>
    `;
    succesPost.classList.add("aviso-click");

    setTimeout(() => {
      succesPost.innerHTML = `
        <i class='bx bx-check-circle bx-tada'></i>
          <p>Aviso creado con éxito</p>
        `;
      succesPost.classList.remove("aviso-click");
      succesPost.innerHTML = "";
    }, 3000);
  }
  loadNotices();
}

async function loadNotices() {
  const asignaturas = document.getElementById("asignaturas");
  const noticias = await getAllNotice();
  let noticesHtml = "";
  noticias.data.data.data.forEach((advice) => {
    const { notice, createdAt, id } = advice;
    const newDate = createdAt.slice(0, -14).replaceAll("-", "/");
    noticesHtml += `
      <div class="notification">
      <div class="name-notify">
        <h6>Aviso</h6>
        <span class="span-notice">${notice}</span>
      </div>
      <div class="fecha">
        <h6>Fecha de publicación</h6>
        <p class="new-date">${newDate}</p>
      </div>
      <div class="hiden-delete">
        <i onclick="eliminateAdvice(${id})" class='bx bx-trash bx-tada' ></i>
      </div>
    </div>
      `;
  });
  asignaturas.innerHTML = noticesHtml;
  let notice = document.getElementById("mensaje");
  notice.value = "";
}

async function eliminateAdvice(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este AViso?")) {
    const deleteData = await deleteAdvice({
      id,
    });

    if (deleteData.code != 200) {
      alert(`Error al eliminar el aviso ${id}`);
    } else {
      setTimeout(function () {
        succesPost.innerHTML = `
          <i class='bx bx-check-circle' ></i>
          <p>Aviso eliminado con éxito</p>`;
        succesPost.classList.add("aviso-click");
      }, 100);
      setTimeout(function () {
        succesPost.innerHTML = "";
        succesPost.classList.remove("aviso-click");
      }, 3000);
    }
  } else {
    setTimeout(function () {
      succesPost.innerHTML = `
        <i class='bx bx-x' ></i>
        <p>Operación Cancelada</p>`;
      succesPost.classList.add("aviso-click");
    }, 1000);
  }

  loadNotices();
}
