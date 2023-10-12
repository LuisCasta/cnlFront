/*const correo = document.getElementById("correo");
const pw = document.getElementById("pw-login");
const login = document.getElementById("Inicio-sesion");

console.log(login);

login.addEventListener("click", loginCnl);
function loginCnl() {
  if (pw.value === "cnl" && correo.value === "cnl") {
    login.href = "admin/career/career.html";
  } else {
    alert("Usuario o contraseña incorrecta");
    correo.value = "";
    pw.value = "";
  }
}*/

const correoMentor = document.getElementById("correo2");
const pwMentor = document.getElementById("pw-login2");
const loginMentor = document.getElementById("Inicio-sesion2");

//console.log(loginMentor);
//console.log(correoMentor);

loginMentor.addEventListener("click", loginCnlMentor);
async function loginCnlMentor() {

  const mailM = correoMentor.value;
  const passM = pwMentor.value;

  if (mailM == 0 || mailM == "" || mailM == undefined || mailM == " ")
    alert("colocar usuario");

  if (passM == 0 || passM == "" || passM == undefined || passM == " ")
    alert("colocar pw");

  const data = {
    mail: mailM,
    pass:passM
  };
  const mentor = await getLogin(data);
  console.log(mentor);
  if (mentor.code != 200) {
    console.log(`Error de login ${correoMentor}`);
    alert("Usuario o contraseña incorrecta");
    correoMentor.value = "";
    pwMentor.value = "";
  } else {
    const { id, name, firstName, mail } = mentor.data;

    location.href = `mentor.html?idMentor=${id}`;

  }

  
    
}
