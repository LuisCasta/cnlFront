const correo = document.getElementById("correo");
const pw = document.getElementById("pw-login");
const login = document.getElementById("Inicio-sesion");

//console.log(login);

login.addEventListener("click", loginCnl);
function loginCnl() {
  if (
    pw.value === "@@admin123@" &&
    correo.value === "adminDemo@nuevalaguna.com"
  ) {
    login.href = "admin/career/career.html";
  } else if (pw.value === "master" && correo.value === "master") {
    login.href = "admin/career/career.html";
  } else {
    alert("Usuario o contraseña incorrecta");
    correo.value = "";
    pw.value = "";
  }
}
