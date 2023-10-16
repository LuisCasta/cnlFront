const eStudent = document.getElementById("correo2");
const pwStu = document.getElementById("pw-login2");
const logStudent = document.getElementById("Inicio-sesion2");

//console.log(loginMentor);
//console.log(correoMentor);

logStudent.addEventListener("click", loginCnlStudent);
async function loginCnlStudent() {
  const mailS = eStudent.value;
  const pwAlumno = pwStu.value;

  if (mailS == 0 || mailS == "" || mailS == undefined || mailS == " ")
    alert("colocar usuario");

  if (
    pwAlumno == 0 ||
    pwAlumno == "" ||
    pwAlumno == undefined ||
    pwAlumno == " "
  )
    alert("colocar pw");

  const data = {
    mail: mailS,
    pass: pwAlumno,
  };
  const student = await getLogin(data);
  console.log(student);
  if (student.code != 200) {
    console.log(`Error de login ${eStudent}`);
    alert("Usuario o contraseña incorrecta");
    eStudent.value = "";
    pwAlumno.value = "";
  } else {
    const { id, name, firstName, mail } = student.data;

    location.href = `calendar/calendar.html?idStudent=${id}`;
  }
}
