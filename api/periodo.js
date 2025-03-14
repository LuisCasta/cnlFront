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
const getAll = async (idCareer) => {
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

/**
 * @description update a student by all params
 */
const updatePeriod = async (data) => {
  const { name, periodId, idCareer } = data;

  if (name == "" || name == null || name == undefined || name == " ")
    return { code: 400, message: `Error, el campo nombre es inválido` };

  if (
    periodId == "" ||
    periodId == null ||
    periodId == undefined ||
    periodId == ""
  )
    return { code: 400, message: `Error, el campo  periodId es inválido` };

  if (
    idCareer == "" ||
    idCareer == null ||
    idCareer == undefined ||
    idCareer == ""
  )
    return { code: 400, message: `Error, el campo idCareer es inválido` };

  const period = await putApi("period/", {
    periodId,
    name,
    idCareer,
  });

  if (period.status != 200)
    return {
      code: 400,
      message: `Error al actualizar los datos del Maestro`,
      error: period.data.message,
    };

  return { code: 200, data: period.data.data };
};
/**
 * @descripcion Delete a student by id
 */
const deletePeriod = async (data) => {
  const { periodId } = data;

  if (
    periodId == "" ||
    periodId == null ||
    periodId == undefined ||
    periodId == ""
  )
    return { code: 400, message: `Error, el campo nombre es inválido` };

  const period = await putApi(`period/d/${periodId}`, {});

  if (period.status != 200)
    return {
      code: 400,
      message: `Error al eliminar el Periodo`,
      error: period.data.message,
    };

  return { code: 200, data: period.data.data };
};
