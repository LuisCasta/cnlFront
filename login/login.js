const correo = document.getElementById("correo");
const pw = document.getElementById("pw-login");
const login = document.getElementById("Inicio-sesion");

console.log(login);

login.addEventListener("click", loginCnl);
function loginCnl() {
  if (pw.value === "cnl" && correo.value === "cnl") {
    login.href = "career/career.html";
  } else {
    alert("Usuario o contraseña incorrecta");
    correo.value = "";
    pw.value = "";
  }
}
