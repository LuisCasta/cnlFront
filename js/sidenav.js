function cargarSideNav() {
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
            <a href="../student/student.html"><i class="bx bx-group bx-sm"></i></a>
            <p class="tooltip">Alumnos</p>
          </li>
          <li>
          <a href="../mentor/mentor.html">
          <i class="bx bxs-graduation bx-sm"></i></a>
            <p class="tooltip">Maestros</p>
          </li>
          <li>
            <a href="../career/career.html"
              ><i class="bx bx-run bx-sm"></i
            ></a>
            <p class="tooltip">Carreras</p>
          </li>
        </ul>
      </div>
      <!-- PERFIL -->
      <div class="perfil">
      <a style="color:#667085;" href="../index.html"><i class="bx bx-log-out"></i></a>
        <i style="color:#667085;cursor:pointer;" class="bx bx-cog"></i>
        <img src="https://plus.unsplash.com/premium_photo-1661686687486-2329be3e383f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80" alt="" />
        <h5 id="userName">Margarita López</h5>
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
