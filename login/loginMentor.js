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
    pass: passM,
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

    location.href = `mentor/mentor.html?idMentor=${id}`;
  }
}
