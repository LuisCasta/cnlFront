/**
 * Obtiene todas las carreras
 *
 * */
const getAllAssigmentCareers = async () => {
  const career = await getApi("career/all");

  if (career.status != 200)
    return {
      code: 400,
      message: `Error al crear la carrera`,
      error: career.data.message,
    };

  return { code: 200, data: career.data.data };
};

/**
 * Obtiene todas las carreras
 *
 * */

/**
 * Obtiene todas los periodos
 *
 * */
const getAllPeriod = async (idCareer) => {
  const period = await getApi(`period/all/${idCareer}`);

  if (period.status != 200)
    return {
      code: 400,
      message: `Error al obtener los Periodos`,
      error: period.data.message,
    };

  return { code: 200, data: period.data.data };
};

/**
 * Obtiene todas los periodos
 *
 * */

/**
 * Obtiene todas las materias
 *
 * */
const getAllGroup = async (idPeriod) => {
  const group = await getApi(`group/all/${idPeriod}`);

  if (group.status != 200)
    return {
      code: 400,
      message: `Error al crear el grupo`,
      error: group.data.message,
    };

  return { code: 200, data: group.data.data };
};

/**
 * Obtiene todas las materias
 *
 * */

const getAllCursos = async (idGroup) => {
  const curso = await getApi(`course/allGroup/${idGroup}`);

  if (curso.status != 200)
    return {
      code: 400,
      message: `Error al crear el curso`,
      error: curso.data.message,
    };

  return { code: 200, data: curso.data.data };
};

// Agregar alumnos a curso

const assigmentStudent = async (idCourse, students) => {
  if (
    idCourse == "" ||
    idCourse == null ||
    idCourse == undefined ||
    idCourse == " "
  )
    return { code: 400, message: `Error, el campo idCourse es inválido` };

  if (students.length > 0)
    return {
      code: 400,
      message: `Error, debe seleccionar al menos un alumno.`,
    };

  const activity = await postDataC("courseStudents/", {
    idCourse,
    students,
  });

  const succesPost = obtainId("succes-post");

  // Succes Post
  succesPost.innerHTML = `
   <i class='bx bx-loader-circle bx-spin' ></i>
   <p>Asiganado Alumnos a curso...</p>
 `;
  succesPost.classList.add("aviso-click");
  if (activity.status != 200)
    return {
      code: 400,
      message: `Error al asignar alumnos a un curso`,
      error: activity.data.message,
    };
  else {
    succesPost.innerHTML = `
    <i class='bx bx-check-circle bx-tada' style="color:#38b000"></i>
      <p>Alumnos asignado con éxito</p>
    `;
    succesPost.classList.add("aviso-click");
  }

  return { code: 200, data: activity.data.data };
};
