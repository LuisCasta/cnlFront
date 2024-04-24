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
      message: `Error al crear al docente`,
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
  console.log(data);
  if (mail == 0 || mail == "" || mail == undefined || mail == " ")
    return { code: 400, message: `Error, el campo mail es inválido` };

  if (pass == 0 || pass == "" || pass == undefined || pass == " ")
    return { code: 400, message: `Error, el campo pass es inválido` };

  const mentor = await postDataC(`mentor/login/`, data);
  //console.log(mentor);
  if (mentor.status != 200)
    return {
      code: 400,
      message: `Error al logear al docente con el mail: ${mail}`,
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
