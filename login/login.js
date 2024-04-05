const correo = document.getElementById("correo");
const pw = document.getElementById("pw-login");
const login = document.getElementById("Inicio-sesion");

//console.log(login);

login.addEventListener("click", loginCnl);
function loginCnl() {
  const user = {
    correo: correo.value,
    pw: pw.value,
  };

  const json = JSON.stringify(user);
  localStorage.setItem(user.correo, json);
  console.log("user added");

  const getCorreo = localStorage.getItem(correo.vlaue);
  const getPw = localStorage.getItem(pw.value);

  console.log(getCorreo, getPw);

  const userMail = localStorage.getItem(user.correo);
  const data = JSON.parse(userMail);
  console.log(data);

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
