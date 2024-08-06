function cargarSideNav() {
  const baseUrl = window.location.origin;
  const sidenav = document.getElementById("sidenavInsert");
  const sideInnerHtml = ` <div class="sidenav-content">
      <!-- LOGO NUEVA LAGUNA -->
      <div class="downNav">
        <img
          src="${baseUrl}/src/escudo.png"
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
            <p class="tooltip">Tutores</p>
          </li>
          <li>
            <a href="../career/career.html"
              ><i class="bx bx-run "></i
            ></a>
            <p class="tooltip">Carreras</p>
          </li>
          <li>
          <a href="../notice/notice.html">
          <i class='bx bx-bell'></i> </a>
          <p class="tooltip">Avisos</p>
        </li>
        <li>
        <a href="../evaluacion/evaluacion.html">
        <i class='bx bx-star'></i></a>
        <p class="tooltip">Evaluación</p>
      </li>
          <li>
            <a href="../prospectos/prospectos.html">
            <i class='bx bx-list-plus'></i></a>
            <p class="tooltip">Prospectos</p>
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

  function cerrar() {
    sidenav.classList.remove("mostrar-sidenav");
  }

  document.addEventListener("click", function (event) {
    var isClickInside =
      sidenav.contains(event.target) || btnResponsive.contains(event.target);
    if (!isClickInside && sidenav.classList.contains("mostrar-sidenav")) {
      cerrar();
    }
  });
}
