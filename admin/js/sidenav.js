function cargarSideNav() {
  const userRole = localStorage.getItem("userRole");
  if (userRole === "coordinador" || userRole === "director") {
    const label = userRole === "director" ? "Dirección" : "Coordinación";
    // Rutas relativas desde admin/xxx/ (todas las páginas admin están un nivel dentro de admin/)
    const base = "../";
    const sidenav = document.getElementById("sidenavInsert");
    sidenav.innerHTML = `<div class="sidenav-content">
      <div class="downNav"><img src="${base}../src/escudo.png" alt="" /></div>
      <div class="navegacion-vista">
        <ul class="ul-navigate">
          <li><a href="${base}student/student.html"><i class="bx bx-group"></i></a><p class="tooltip">Alumnos</p></li>
          <li><a href="${base}mentor/mentor.html"><i class="bx bxs-graduation"></i></a><p class="tooltip">Tutores</p></li>
          <li><a href="${base}career/career.html"><i class="bx bx-run"></i></a><p class="tooltip">Carreras</p></li>
          <li><a href="${base}../coordinacion/index.html"><i class="bx bx-bell"></i></a><p class="tooltip">Avisos</p></li>
          <li><a href="${base}evaluacion/evaluacion.html"><i class="bx bx-star"></i></a><p class="tooltip">Evaluación</p></li>
        </ul>
      </div>
      <div class="perfil">
        <a data-tooltip="Cerrar sesión" style="color:#667085;" href="${base}../index.html" onclick="localStorage.removeItem('user');localStorage.removeItem('userRole');"><i class="bx bx-log-out"></i></a>
        <img src="${base}../src/admin.png" alt="" />
        <h5>${label}</h5>
      </div>
    </div>`;
    const btnResponsive = document.getElementById("btnResponsive");
    btnResponsive.addEventListener("click", () => {
      document.querySelector(".sidenav-cln").classList.toggle("mostrar-sidenav");
    });

    // Inyectar CSS para ocultar botones de editar/eliminar y formularios de agregar
    const style = document.createElement("style");
    style.innerHTML = `
      .card-header .form-header,
      .card-header .form-select,
      .card-header button,
      .card-header-2 .form-header,
      .card-header-2 button,
      .section-modificar,
      .confirm-cancelar { display: none !important; }
      [contenteditable="true"] { pointer-events: none !important; outline: none !important; }
      select { pointer-events: none !important; }
    `;
    document.head.appendChild(style);

    // Ocultar botones de trash y refresh en tabla (contenido dinámico)
    function ocultarBotonesAdmin() {
      document.querySelectorAll(".bx-trash, .bxs-trash, .bx-refresh, .bx-edit").forEach(icon => {
        const btn = icon.closest("button, a");
        if (btn) btn.style.display = "none";
      });
      // Eliminar edición inline en celdas
      document.querySelectorAll("[contenteditable='true']").forEach(el => {
        el.setAttribute("contenteditable", "false");
      });
      // Bloquear selects de tabla
      document.querySelectorAll("tbody select").forEach(sel => {
        sel.disabled = true;
      });
    }

    ocultarBotonesAdmin();
    // Observar cambios dinámicos (tablas que cargan después)
    const observer = new MutationObserver(ocultarBotonesAdmin);
    observer.observe(document.body, { childList: true, subtree: true });

    return;
  }

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
            <a href="../actividades/actividades.html">
            <i class='bx bxs-watch'></i></a>
            <p class="tooltip">Actividades</p>
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
