//const post = require ("./post");

// Funcion para crear un curso
// { name, code, description }

const create = async (data) => {
  const {
    name,
    description,
    task,
    exam,
    proyect,
    idMentor,
    idSubject,
    idGroup,
  } = data;

  if (name == "" || name == null || name == undefined || name == " ")
    return { code: 400, message: `Error, el campo nombre es inválido` };

  //   if (code == "" || code == null || code == undefined || code == " ")
  //     return { code: 400, message: `Error, el campo nombre es inválido` };

  if (
    description == "" ||
    description == null ||
    description == undefined ||
    description == " "
  )
    return { code: 400, message: `Error, el campo descripción es inválido` };
  if (
    idMentor == "" ||
    idMentor == null ||
    idMentor == undefined ||
    idMentor == " "
  )
    return { code: 400, message: `Error, el campo Id Mentor es inválido` };
  if (
    idSubject == "" ||
    idSubject == null ||
    idSubject == undefined ||
    idSubject == " "
  )
    return { code: 400, message: `Error, el campo Id Materia es inválido` };
  if (
    idGroup == "" ||
    idGroup == null ||
    idGroup == undefined ||
    idGroup == " "
  )
    return { code: 400, message: `Error, el campo Id grupo es inválido` };

  const curso = await postDataC("course/", {
    name,
    idGroup,
    idMentor,
    idSubject,
    description,
    task,
    proyect,
    exam,
  });

  if (curso.status != 200)
    return {
      code: 400,
      message: `Error al crear el curso`,
      error: curso.data.message,
    };

  return { code: 200, data: curso.data.data };
};

/**
 * Obtiene todas las carreras
 *
 * */
const getAll = async (idGroup) => {
  const curso = await getApi(`course/allGroup/${idGroup}`);

  if (curso.status != 200)
    return {
      code: 400,
      message: `Error al crear el curso`,
      error: curso.data.message,
    };

  return { code: 200, data: curso.data.data };
};

// Get IdMentor and IdSubject

const getInfo = async (idCareer) => {
  const idsCurso = await getApi(`subject/aboutCareer/${idCareer}`);
  if (idsCurso.status != 200)
    return {
      code: 400,
      message: `Error al obtener los datos`,
      error: idsCurso.data.message,
    };
  return { code: 200, data: idsCurso.data.data };
};

//Get Mentor

const getAllMentor = async () => {
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

  const curso = await getApi(`course/about/${id}`);

  if (curso.status != 200)
    return {
      code: 400,
      message: `Error al obtener el curso con el id: ${id}`,
      error: curso.data.message,
    };

  return { code: 200, data: curso.data.data };
};
