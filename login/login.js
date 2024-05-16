const correo = document.getElementById("correo");
const pw = document.getElementById("pw-login");
const login = document.getElementById("Inicio-sesion");
const selectUser = document.getElementById("selectUser");

login.addEventListener("click", async function loginCnl() {
  const userSelection = selectUser.value;

  if (userSelection === "1") {
    // Admin Login
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
  } else if (userSelection === "2") {
    // Mentor Login
    const mentorMail = correo.value;
    const mentorPassword = pw.value;

    if (!mentorMail) {
      alert("falta usuario");
    }

    if (!mentorPassword) {
      alert("falta contraseña");
    }

    try {
      const data = {
        mail: mentorMail,
        pass: mentorPassword,
      };
      const mentor = await getLogin(data);
      console.log(mentor);
      if (mentor.code !== 200) {
        console.log(`Error de login ${mentorMail}`);
        alert("Usuario o contraseña incorrecta");
        correo.value = "";
        pw.value = "";
      } else {
        const { id } = mentor.data;
        location.href = `mentor/mentor/mentor.html?idMentor=${id}`;
      }
    } catch (error) {
      console.error("Error fetching mentor data:", error);
      alert("Error al iniciar sesión. Intente nuevamente más tarde.");
    }
  } else if (userSelection === "3") {
    // Student Login
    const studentMail = correo.value;
    const studentPassword = pw.value;

    if (!studentMail) {
      alert("colocar usuario");
    }

    if (!studentPassword) {
      alert("colocar pw");
    }

    try {
      const data = {
        mail: studentMail,
        pass: studentPassword,
      };
      const student = await getLoginStudent(data);
      console.log(student);
      if (student.code !== 200) {
        console.log(`Error de login ${studentMail}`);
        alert("Usuario o contraseña incorrecta");
        correo.value = "";
        pwAlumno.value = ""; // Assuming pwAlumno is the student password field
      } else {
        const { id } = student.data;
        location.href = `student/calendar/calendar.html?idStudent=${id}`;
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      alert("Error al iniciar sesión. Intente nuevamente más tarde.");
    }
  } else {
    console.warn("Invalid user selection:", userSelection);
  }
});
