//const post = require ("./post");

// Funcion para crear un curso
// { name, code, description }

const create = async (data) => {
  const { name, percentage, idCourse, description } = data;

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
    return { code: 400, message: `Error, el campo de descripción es inválido` };
  if (
    percentage == "" ||
    percentage == null ||
    percentage == undefined ||
    percentage == " "
  )
    return { code: 400, message: `Error, el campo de porcentaje es inválido` };

  if (
    idCourse == "" ||
    idCourse == null ||
    idCourse == undefined ||
    idCourse == " "
  )
    return { code: 400, message: `Error, el campo Id course es inválido` };

  const unit = await postDataC("unit/", {
    name,
    percentage,
    idCourse,
    active: 1,
    description,
  });

  if (unit.status != 200)
    return {
      code: 400,
      message: `Error al crear una Tarea activa`,
      error: unit.data.message,
    };

  return { code: 200, data: unit.data.data };
};

/**
 * Obtiene todas las unidades de un curso
 *
 * */
const getAllByCourse = async (idCourse) => {
  if (
    idCourse == "" ||
    idCourse == undefined ||
    idCourse == null ||
    idCourse == 0 ||
    idCourse == " "
  )
    return { code: 400, message: `Error, el campo idCourse es inválido` };

  const unit = await getApi(`unit/all/${idCourse}`);

  if (unit.status != 200)
    return {
      code: 400,
      message: `Error al obtener las unidades de un curso`,
      error: unit.data.message,
    };

  return { code: 200, data: unit.data.data };
};

/**
 * Obtiene una unidad por su id
 *
 * */
const getById = async (id) => {
  if (id == 0 || id == "" || id == undefined || id == " ")
    return { code: 400, message: `Error, el campo id es inválido` };

  const unit = await getApi(`unit/about/${id}`);

  if (unit.status != 200)
    return {
      code: 400,
      message: `Error al obtener la unidad con el id: ${id}`,
      error: unit.data.message,
    };

  return { code: 200, data: unit.data.data };
};

const getTypeUnits = async () => {
  const unit = await getApi(`typeUnit/all`);

  if (unit.status != 200)
    return {
      code: 400,
      message: `Error al obtener el tipo de unidad.`,
      error: unit.data.message,
    };

  return { code: 200, data: unit.data.data };
};

/**
 * @description update a student by all params
 */
const updateUnitMentor = async (data) => {
  const { unitId, name, idCourse, percentage, type, description } = data;

  if (
    percentage == "" ||
    percentage == null ||
    percentage == undefined ||
    percentage == " "
  )
    return { code: 400, message: `Error, el campo type es inválido` };

  if (unitId == "" || unitId == null || unitId == undefined || unitId == " ")
    return { code: 400, message: `Error, el campo idUnit es inválido` };

  if (name == "" || name == null || name == undefined || name == " ")
    return { code: 400, message: `Error, el campo nombre es inválido` };

  const activity = await putApi("unit/", {
    unitId,
    name,
    idCourse,
    type: 0,
    percentage,
    description,
  });

  if (activity.status != 200)
    return {
      code: 400,
      message: `Error al actualizar los datos de la Tarea Activa`,
      error: activity.data.message,
    };

  return { code: 200, data: activity.data.data };
};
/**
 * @descripcion Delete a student by id
 */
const deleteUnit = async (data) => {
  const { unitId } = data;

  if (unitId == "" || unitId == null || unitId == undefined || unitId == "")
    return { code: 400, message: `Error, el campo nombre es inválido` };

  const unit = await putApi(`unit/d/${unitId}`, {});

  if (unit.status != 200)
    return {
      code: 400,
      message: `Error al eliminar al Mentor`,
      error: unit.data.message,
    };

  return { code: 200, data: unit.data.data };
};
