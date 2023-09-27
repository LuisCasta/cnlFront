//const post = require ("./post");

// Funcion para crear un periodo
// { name, idCareer }

const create = async (data) => {
  const { name, idCareer } = data;

  if (name == "" || name == null || name == undefined || name == " ")
    return { code: 400, message: `Error, el campo nombre es inválido` };

  if (
    idCareer == "" ||
    idCareer == null ||
    idCareer == undefined ||
    idCareer == " "
  )
    return { code: 400, message: `Error, el campo idCareer es inválido` };

  const period = await postDataC("period/", { name, idCareer });

  if (period.status != 200)
    return {
      code: 400,
      message: `Error al crear el periodo`,
      error: period.data.message,
    };

  return { code: 200, data: period.data.data };
};

/**
 * Obtiene todas los periodos
 *
 * */
const getAll = async () => {
  const period = await getApi("period/all");

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
const getById = async (id) => {
  if (id == 0 || id == "" || id == undefined || id == " ")
    return { code: 400, message: `Error, el campo id es inválido` };

  const period = await getApi(`period/about/${id}`);

  if (period.status != 200)
    return {
      code: 400,
      message: `Error al obtener el periodo con el id: ${id}`,
      error: period.data.message,
    };

  return { code: 200, data: period.data.data };
};
