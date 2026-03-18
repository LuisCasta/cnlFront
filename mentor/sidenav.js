function logOutSession() {
  localStorage.removeItem("user");
  localStorage.removeItem("userRole");
  window.location.replace("../../index.html");
}
function cargarSideNav() {
  const userRole = localStorage.getItem("userRole");
  if (userRole === "coordinador" || userRole === "director") {
    const label = userRole === "director" ? "Dirección" : "Coordinación";
    const originUrl = window.location.origin;
    const sidenav = document.getElementById("sidenavInsert");
    sidenav.innerHTML = `<div class="sidenav-content">
      <div class="downNav"><img src="${originUrl}/src/escudo.png" alt="" /></div>
      <div class="navegacion-vista">
        <ul class="ul-navigate">
          <li><a href="${originUrl}/frontend/cnlFront/admin/student/student.html"><i class="bx bx-group"></i></a><p class="tooltip">Alumnos</p></li>
          <li><a href="${originUrl}/frontend/cnlFront/admin/mentor/mentor.html"><i class="bx bxs-graduation"></i></a><p class="tooltip">Tutores</p></li>
          <li><a href="${originUrl}/frontend/cnlFront/admin/career/career.html"><i class="bx bx-run"></i></a><p class="tooltip">Carreras</p></li>
          <li><a href="${originUrl}/frontend/cnlFront/coordinacion/index.html"><i class="bx bx-bell"></i></a><p class="tooltip">Avisos</p></li>
          <li><a href="${originUrl}/frontend/cnlFront/admin/evaluacion/evaluacion.html"><i class="bx bx-star"></i></a><p class="tooltip">Evaluación</p></li>
        </ul>
      </div>
      <div class="perfil">
        <a style="color:#667085;cursor:pointer;" onclick="localStorage.removeItem('user');localStorage.removeItem('userRole');window.location.replace('${originUrl}/frontend/cnlFront/index.html');"><i class="bx bx-log-out"></i></a>
        <img src="${originUrl}/src/admin.png" alt="" />
        <h5>${label}</h5>
      </div>
    </div>`;
    const btnResponsive = document.getElementById("btnResponsive");
    if (btnResponsive) btnResponsive.addEventListener("click", () => document.querySelector(".sidenav-cln").classList.toggle("mostrar-sidenav"));

    // Aplicar restricciones de solo lectura
    const style = document.createElement("style");
    style.innerHTML = `
      .card-header .form-select, .card-header button, .card-header textarea, .card-header input,
      .card-header-2 .form-header, .card-header-2 .form-select, .card-header-2 button,
      #agregar-actividad, #agregar-unidad, #btn-createCall, #btn-promedio,
      #revisar-actividad, .checkRevisar,
      .sendRate, .add-activity, .use-rate { display: none !important; }
      [contenteditable="true"] { pointer-events: none !important; outline: none !important; cursor: default !important; }
      tbody select { pointer-events: none !important; }
    `;
    document.head.appendChild(style);

    function ocultarBotones() {
      // Botones de acción en tablas
      document.querySelectorAll(".bx-trash, .bxs-trash, .bx-refresh, .bx-edit, .bx-video-plus").forEach(icon => {
        const btn = icon.closest("button, a");
        if (btn) btn.style.display = "none";
      });
      // Quitar contenteditable
      document.querySelectorAll("[contenteditable='true']").forEach(el => el.setAttribute("contenteditable", "false"));
      // Bloquear selects en tabla
      document.querySelectorAll("tbody select").forEach(sel => sel.disabled = true);
      // Ocultar botón guardar calificación y "Usar recomendada"
      document.querySelectorAll(".sendRate, #btn-promedio, .use-rate, .checkRevisar, #revisar-actividad, [onclick*='guardarRate']").forEach(el => el.style.display = "none");
    }
    ocultarBotones();
    new MutationObserver(ocultarBotones).observe(document.body, { childList: true, subtree: true });
    return;
  }

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
  const originUrl = window.location.origin;
  const sideInnerHtml = ` <div class="sidenav-content">
      <!-- LOGO NUEVA LAGUNA -->
      <div class="downNav">
        <img
          src="${originUrl}/src/escudo.png"
          alt=""
        />
      </div>
      <!-- NAVEGACIÓN -->
      <div class="navegacion-vista">
        <ul class="ul-navigate">
          <li>
            <a href="../mentor/mentor.html">
             <i class='bx bx-home-alt-2'></i>
            </a>
            <p class="tooltip">Incio</p>
          </li>
          <li>
          <a href="../rate/rate.html">
           <i class='bx bx-bookmark-plus'></i>
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
