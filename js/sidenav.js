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
      <a href="index.html"><i class="bx bx-group bx-sm"></i></a>
      <p class="tooltip">Alumnos</p>
    </li>
    <li>
      <i class="bx bxs-graduation bx-sm"></i>
      <p class="tooltip">Maestros</p>
    </li>
    <li>
      <a href="carreras/carreras.html"
        ><i class="bx bx-run bx-sm"></i
      ></a>
      <p class="tooltip">Carreras</p>
    </li>
    <li>
      <i class="bx bx-line-chart bx-sm"></i>
      <p class="tooltip">Admon</p>
    </li>
  </ul>
</div>
<!-- PERFIL -->
<div class="perfil">
  <i class="bx bx-log-out"></i>
  <i class="bx bx-cog"></i>
  <img src="https://plus.unsplash.com/premium_photo-1661686687486-2329be3e383f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80" alt="" />
  <h5 id="userName">Margarita López</h5>
  <!-- <p id="job">Dirección</p> -->
</div>
</div>`;

  sidenav.innerHTML = sideInnerHtml;
}
