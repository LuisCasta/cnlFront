//const post = require ("./post");

// Funcion para crear una carrera
// { name, code, description }

const create = async (data) => {
  const {
    name,
    firstName,
    secondName,
    birthdate = "1990-01-20",
    mobilePhone = "8710000000",
    mail,
    password,
  } = data;

  if (name == "" || name == null || name == undefined || name == " ")
    return { code: 400, message: `Error, el campo nombre es inválido` };

  if (
    secondName == "" ||
    secondName == null ||
    secondName == undefined ||
    secondName == " "
  )
    return {
      code: 400,
      message: `Error, el campo Segundo Apellido es inválido`,
    };
  if (
    firstName == "" ||
    firstName == null ||
    firstName == undefined ||
    firstName == " "
  )
    return { code: 400, message: `Error, el campo firstName es inválido` };

  if (mail == "" || mail == null || mail == undefined || mail == " ")
    return { code: 400, message: `Error, el campo email es inválido` };

  if (
    password == "" ||
    password == null ||
    password == undefined ||
    password == " "
  )
    return { code: 400, message: `Error, el campo password es inválido` };

  const mentor = await postDataC("mentor/", {
    name,
    mail,
    firstName,
    password,
    secondName,
    birthdate,
    mobilePhone,
  });

  if (mentor.status != 200)
    return {
      code: 400,
      message: `Error al crear al docente`,
      error: mentor.data.message,
    };

  return { code: 200, data: mentor.data.data };
};

/**
 * Obtiene todas las carreras
 *
 * */
const getAll = async () => {
  const mentor = await getApi("mentor/all");

  if (mentor.status != 200)
    return {
      code: 400,
      message: `Error al obtener al tutor`,
      error: mentor.data.message,
    };

  return { code: 200, data: mentor.data.data };
};

const getMentorById = async (mentorId) => {
  const mentor = await getApi(`mentor/about/${mentorId}`);
  if (mentor.status != 200)
    return {
      code: 400,
      message: `Error al obtener al tutor`,
      error: mentor.data.message,
    };

  return { code: 200, data: mentor.data.data };
};

/**
 * Obtiene todas las carreras
 *
 * */
const getById = async (id) => {
  if (id == 0 || id == "" || id == undefined || id == " ")
    return { code: 400, message: `Error, el campo id es inválido` };

  const mentor = await getApi(`mentor/about/${id}`);

  if (mentor.status != 200)
    return {
      code: 400,
      message: `Error al obtener al docente con el id: ${id}`,
      error: mentor.data.message,
    };

  return { code: 200, data: mentor.data.data };
};

const getLogin = async (data) => {
  const { mail, pass } = data;
  if (mail == 0 || mail == "" || mail == undefined || mail == " ")
    return { code: 400, message: `Error, el campo mail es inválido` };

  if (pass == 0 || pass == "" || pass == undefined || pass == " ")
    return { code: 400, message: `Error, el campo pass es inválido` };

  const mentor = await postDataC(`mentor/login/`, data);
  //console.log(mentor);
  if (mentor.status != 200)
    return {
      code: 400,
      message: `Error al logear al docente con el correo: ${mail}`,
      error: mentor.data.message,
    };
  return { code: 200, data: mentor.data.data };
};

/**
 * @description update a student by all params
 */
const updateMentor = async (data) => {
  const { name, firstName, mail, password, mentorId } = data;

  if (name == "" || name == null || name == undefined || name == " ")
    return { code: 400, message: `Error, el campo nombre es inválido` };

  if (
    firstName == "" ||
    firstName == null ||
    firstName == undefined ||
    firstName == " "
  )
    return { code: 400, message: `Error, el campo firstName es inválido` };

  if (
    mentorId == "" ||
    mentorId == null ||
    mentorId == undefined ||
    mentorId == ""
  )
    return { code: 400, message: `Error, el campo studentId es inválido` };

  if (mail == "" || mail == null || mail == undefined || mail == " ")
    return { code: 400, message: `Error, el campo email es inválido` };

  if (
    password == "" ||
    password == null ||
    password == undefined ||
    password == " "
  )
    return { code: 400, message: `Error, el campo password es inválido` };

  const mentor = await putApi("mentor/", {
    name,
    firstName,
    mail,
    password,
    mentorId,
    secondName: "0",
    birthdate: "0001-01-01",
    mobilePhone: "0",
  });

  if (mentor.status != 200)
    return {
      code: 400,
      message: `Error al actualizar los datos del Maestro`,
      error: mentor.data.message,
    };

  return { code: 200, data: mentor.data.data };
};
/**
 * @descripcion Delete a student by id
 */

const deleteMentor = async (data) => {
  const { mentorId } = data;

  if (
    mentorId == "" ||
    mentorId == null ||
    mentorId == undefined ||
    mentorId == ""
  )
    return { code: 400, message: `Error, el campo nombre es inválido` };

  const mentor = await putApi(`mentor/d/${mentorId}`, {});

  if (mentor.status != 200)
    return {
      code: 400,
      message: `Error al eliminar al Mentor`,
      error: mentor.data.message,
    };

  return { code: 200, data: mentor.data.data };
};

//UPDATE DE MENTOR PRESENTACIÓN

/**
 * @description update a student by all params
 */
const updateTutorPresentation = async (data) => {
  console.log('entro a funcion', data);
  const { videolink, cvlink, courseId } = data;

  /* if (
    videolink == "" ||
    videolink == null ||
    videolink == undefined ||
    videolink == " "
  )
    return { code: 400, message: `Error, el campo videolink es inválido` }; */

  if (
    courseId == "" ||
    courseId == null ||
    courseId == undefined ||
    courseId == ""
  )
    return { code: 400, message: `Error, el campo courseId es inválido` };

  /* if (cvlink == "" || cvlink == null || cvlink == undefined || cvlink == " ")
    return { code: 400, message: `Error, el campo cvlink es inválido` }; */

  console.log('data to presentation mnetor course update');
  console.log(cvlink, videolink, courseId);

  const turorPresentation = await putApi("course/profile", {
    courseId,
    videolink,
    cvlink,
  });

  if (turorPresentation.status != 200)
    return {
      code: 400,
      message: `Error al actualizar los datos del Maestro`,
      error: turorPresentation.data.message,
    };

  return { code: 200, data: turorPresentation.data.data };
};

const showTutorPresentation = async (courseId) => {
  console.log('entro a funcion', courseId);
  // const { courseId } = data;

  if (
    courseId == "" ||
    courseId == null ||
    courseId == undefined ||
    courseId == ""
  )
    return { code: 400, message: `Error, el campo courseId es inválido` };


  console.log('courseeee presentation', courseId);

  // este debe hacer get ala api que trae los datos del curso,
  // deje estatico el 32 porque estoy probando con ese curso
  const turorPresentation =  await getApi(`course/about/${courseId}`);
  console.log('courseeee presentation', turorPresentation);

  if (turorPresentation.status != 200)
    return {
      code: 400,
      message: `Error al obtener los datos del curso`,
      error: turorPresentation.data.message,
    };

  // esto deberia devolver los datos del curso
  console.log(turorPresentation.data.data.cvlink)
  return { code: 200, data: turorPresentation };
};

const updateScheduleCourse = async (data) => {
  const { schedule, idCourse } = data;

  if (schedule == "" || schedule == null || schedule == undefined)
    return {
      code: 400,
      message: `Error, el campo schedule es inválido o está vacío`,
    };

  if (idCourse == "" || idCourse == null || idCourse == undefined)
    return {
      code: 400,
      message: `Error, el campo courseId es inválido`,
    };

  const course = await putApi("course/schedule", {
    courseId: idCourse,
    schedule,
  });

  if (course.status != 200)
    return {
      code: 400,
      message: `Error al actualizar el schedule.`,
      error: course.data.message,
    };

  return { code: 200, data: course.data.data };
};

/**
 * @descripcion Delete a student by id
 */

const courseGetById = async (id) => {
  if (id == 0 || id == "" || id == undefined)
    return { code: 400, message: `Error, el campo id es inválido` };

  const curso = await getApi(`course/about/${id}`);

  if (curso.status != 200)
    return {
      code: 400,
      message: `Error al obtener el curso con el id: ${id}`,
      error: curso.data.message,
    };

  return { code: 200, data: curso.data.data };
};
