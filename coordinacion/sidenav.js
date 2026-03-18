function checkSession() {
  const userRole = localStorage.getItem("userRole");
  if (userRole !== "coordinador" && userRole !== "director") {
    window.location.replace("../index.html");
  }
}

function cargarSideNav() {
  const baseUrl = window.location.origin;
  const sidenav = document.getElementById("sidenavInsert");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role || localStorage.getItem("userRole") || "";
  const label = role === "director" ? "Dirección" : "Coordinación";

  const sideInnerHtml = `<div class="sidenav-content">
      <div class="downNav">
        <img src="${baseUrl}/src/escudo.png" alt="" />
      </div>
      <div class="navegacion-vista">
        <ul class="ul-navigate">
          <li>
            <a href="../admin/student/student.html"><i class="bx bx-group"></i></a>
            <p class="tooltip">Alumnos</p>
          </li>
          <li>
            <a href="../admin/mentor/mentor.html"><i class="bx bxs-graduation"></i></a>
            <p class="tooltip">Tutores</p>
          </li>
          <li>
            <a href="../admin/career/career.html"><i class="bx bx-run"></i></a>
            <p class="tooltip">Carreras</p>
          </li>
          <li>
            <a href="index.html"><i class="bx bx-bell"></i></a>
            <p class="tooltip">Avisos</p>
          </li>
          <li>
            <a href="../admin/evaluacion/evaluacion.html"><i class="bx bx-star"></i></a>
            <p class="tooltip">Evaluación</p>
          </li>
        </ul>
      </div>
      <div class="perfil">
        <a data-tooltip="Cerrar sesión" style="color:#667085;" href="../index.html" onclick="localStorage.removeItem('user');localStorage.removeItem('userRole');"><i class="bx bx-log-out"></i></a>
        <img src="../src/admin.png" alt="" />
        <h5 id="userName">${label}</h5>
      </div>
    </div>`;

  sidenav.innerHTML = sideInnerHtml;
  const btnResponsive = document.getElementById("btnResponsive");
  btnResponsive.addEventListener("click", () => {
    document.querySelector(".sidenav-cln").classList.toggle("mostrar-sidenav");
  });

  document.addEventListener("click", function (event) {
    const sideNav = document.querySelector(".sidenav-cln");
    if (!sidenav.contains(event.target) && !btnResponsive.contains(event.target) && sideNav.classList.contains("mostrar-sidenav")) {
      sideNav.classList.remove("mostrar-sidenav");
    }
  });
}
