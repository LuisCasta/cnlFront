function logOutSession() {
  localStorage.removeItem("user");
  window.location.replace("../../index.html");
}
function cargarSideNav() {
  let user = localStorage.getItem("user");
  let idStudent = 0;
  let name = "";
  let firstName = "";

  // console.log(name, firstName);
  if (user) {
    user = JSON.parse(user);
    idStudent = user.id;
    name = user.name;
    firstName = user.firstName;
  } else {
    window.location.replace("../../index.html");
  }
  const sidenav = document.getElementById("sidenavInsert");
  const sideInnerHtml = ` <div class="sidenav-content">
      <!-- LOGO NUEVA LAGUNA -->
      <div class="downNav">
        <img
          src="https://universidadnuevalaguna.edu.mx/wp-content/uploads/2023/08/escudo.png"
          alt=""
        />
      </div>
      <!-- NAVEGACIÓN -->
      <div class="navegacion-vista">
        <ul class="ul-navigate">
          <li>
            <a href="../view/curso-student.html">
            <i class='bx bx-book-open bx-sm'></i></a>
            <p class="tooltip">Mis Cursos</p>
          </li>
          <li>
          <a href="../calendar/calendar.html?idStudent=${idStudent}">
          <i class='bx bxs-calendar bx-sm'></i></a>
          <p class="tooltip">Agenda</p>
        </li>
        </ul>
      </div>
      <!-- PERFIL -->
      <div class="perfil">
      <a style="color:#667085;cursor:pointer;" onclick="logOutSession()" ><i class="bx bx-log-out"></i></a>
         <h4 class="name-decor">${name.charAt(0)}${firstName.charAt(0)}</h4>
        <h5 id="userName">${name} ${firstName}</h5>
      </div>
      </div>`;

  sidenav.innerHTML = sideInnerHtml;
  const btnResponsive = document.getElementById("btnResponsive");
  btnResponsive.addEventListener("click", abrirSideNav);
  function abrirSideNav() {
    const sideNav = document.querySelector(".sidenav-cln");
    sideNav.classList.toggle("mostrar-sidenav");
  }
}
