//const post = require ("./post");

// Funcion para crear una carrera
// { name, code, description }

const create = async (data) => {
  const {
    name,
    firstName,
    secondName,
    birthdate,
    mobilePhone,
    mail,
    password,
  } = data;

  if (name == "" || name == null || name == undefined || name == " ")
    return { code: 400, message: `Error, el campo nombre es inválido` };

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

  const student = await postDataC("student/", {
    name,
    firstName,
    mail,
    password,
    secondName,
    birthdate,
    mobilePhone,
  });

  if (student.status != 200)
    return {
      code: 400,
      message: `Error al crear al estudiante`,
      error: student.data.message,
    };

  return { code: 200, data: student.data.data };
};

/**
 * Obtiene todas las carreras
 *
 * */
const getAll = async () => {
  const student = await getApi("student/all");

  if (student.status != 200)
    return {
      code: 400,
      message: `Error al crear al estudiante`,
      error: student.data.message,
    };

  return { code: 200, data: student.data.data };
};

/**
 * Obtiene todas las carreras
 *
 * */
const getById = async (id) => {
  if (id == 0 || id == "" || id == undefined || id == " ")
    return { code: 400, message: `Error, el campo id es inválido` };

  const student = await getApi(`student/about/${id}`);

  if (student.status != 200)
    return {
      code: 400,
      message: `Error al obtener al estudiante con el id: ${id}`,
      error: student.data.message,
    };

  return { code: 200, data: student.data.data };
};

// Login student

const getLogin = async (data) => {
  const { mail, pass } = data;
  console.log(data);
  if (mail == 0 || mail == "" || mail == undefined || mail == " ")
    return { code: 400, message: `Error, el campo mail es inválido` };

  if (pass == 0 || pass == "" || pass == undefined || pass == " ")
    return { code: 400, message: `Error, el campo pass es inválido` };

  const student = await postDataC(`student/login/`, data);
  //console.log(mentor);
  if (student.status != 200)
    return {
      code: 400,
      message: `Error al logear al docente con el mail: ${mail}`,
      error: student.data.message,
    };

  return { code: 200, data: student.data.data };
};
