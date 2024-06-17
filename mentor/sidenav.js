function logOutSession() {
  localStorage.removeItem("user");
  window.location.replace("../../index.html");
}
function cargarSideNav() {
  let user = localStorage.getItem("user");
  let idMentor = 0;
  let name = "";
  let firstName = "";
  if (user) {
    user = JSON.parse(user);
    idMentor = user.id;
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
            <a href="../mentor/mentor.html">
              <i class='bx bx-book-open'></i>
            </a>
            <p class="tooltip">Cursos</p>
          </li>
          <li>
          <a href="../rate/rate.html">
            <i class="bx bxs-star-half"></i>
          </a>
          <p class="tooltip">Calificaciones</p>
        </li>
        </ul>
      </div>
      <!-- PERFIL -->
      <div class="perfil">
      <a style="color:#667085;cursor:pointer;" onclick=logOutSession()><i class="bx bx-log-out"></i></a>
       <h4 class="name-decor">${name.charAt(0).toUpperCase()}${firstName
    .charAt(0)
    .toUpperCase()}</h4>
        <h5 id="userName">${name.charAt(0).toUpperCase() + name.slice(1)} ${
    firstName.charAt(0).toUpperCase() + firstName.slice(1)
  }</h5>
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
