//const post = require ("./post");

// Funcion para crear una materia
// { name, idCareer, idPeriod }

const create = async (data) => {
  const { name, idCareer, idPeriod } = data;

  if (name == "" || name == null || name == undefined || name == " ")
    return { code: 400, message: `Error, el campo nombre es inválido` };

  if (
    idCareer == "" ||
    idCareer == null ||
    idCareer == undefined ||
    idCareer == " "
  )
    return { code: 400, message: `Error, el campo idCareer es inválido` };

  if (
    idPeriod == "" ||
    idPeriod == null ||
    idPeriod == undefined ||
    idPeriod == " "
  )
    return { code: 400, message: `Error, el campo idPeriod es inválido` };

  const subject = await postDataC("subject/", { name, idCareer, idPeriod });

  if (subject.status != 200)
    return {
      code: 400,
      message: `Error al crear la materia`,
      error: subject.data.message,
    };

  return { code: 200, data: subject.data.data };
};

/**
 * Obtiene todas las materias
 *
 * */
const getAll = async (id) => {
  const subject = await getApi(`subject/all/${id}`);

  if (subject.status != 200)
    return {
      code: 400,
      message: `Error al crear la materia`,
      error: subject.data.message,
    };

  return { code: 200, data: subject.data.data };
};

/**
 * Obtiene todas las materias
 *
 * */
const getById = async (id) => {
  if (id == 0 || id == "" || id == undefined || id == " ")
    return { code: 400, message: `Error, el campo id es inválido` };

  const subject = await getApi(`subject/about/${id}`);

  if (subject.status != 200)
    return {
      code: 400,
      message: `Error al obtener la materia con el id: ${id}`,
      error: subject.data.message,
    };

  return { code: 200, data: subject.data.data };
};
