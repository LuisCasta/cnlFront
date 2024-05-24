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
            <a href="../student/student.html">
            <i class="bx bx-group"></i></a>
            <p class="tooltip">Alumnos</p>
          </li>
          <li>
          <a href="../mentor/mentor.html">
          <i class="bx bxs-graduation"></i></a>
            <p class="tooltip">Maestros</p>
          </li>
          <li>
            <a href="../career/career.html"
              ><i class="bx bx-run "></i
            ></a>
            <p class="tooltip">Carreras</p>
          </li>
          <li>
          <a href="../notice/notice.html">
          <i class='bx bx-bell'></i>
          <p class="tooltip">Avisos</p>
        </li>
        </ul>
      </div>
      <!-- PERFIL -->
      <div class="perfil">
      <a data-tooltip="Cerrar sesión" style="color:#667085;" href="../../index.html"><i class="bx bx-log-out"></i></a>
        <img src="../../src/admin.png" alt="" />
        <h5 id="userName">Admin CNL</h5>
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
