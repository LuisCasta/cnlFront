//const post = require ("./post");

// Funcion para crear una materia
// { name, idCareer, idPeriod }

const create = async (data) => {
  const { name, idPeriod } = data;

  if (name == "" || name == null || name == undefined || name == " ")
    return { code: 400, message: `Error, el campo nombre es inválido` };

  if (
    idPeriod == "" ||
    idPeriod == null ||
    idPeriod == undefined ||
    idPeriod == " "
  )
    return { code: 400, message: `Error, el campo idPeriod es inválido` };

  const group = await postDataC("group/", { name, idPeriod });

  if (group.status != 200)
    return {
      code: 400,
      message: `Error al crear el grupo.`,
      error: group.data.message,
    };

  return { code: 200, data: group.data.data };
};

/**
 * Obtiene todas las materias
 *
 * */
const getAll = async (idPeriod) => {
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
const getById = async (id) => {
  if (id == 0 || id == "" || id == undefined || id == " ")
    return { code: 400, message: `Error, el campo id es inválido` };

  const group = await getApi(`group/about/${id}`);

  if (group.status != 200)
    return {
      code: 400,
      message: `Error al obtener el grupo con el id: ${id}`,
      error: group.data.message,
    };

  return { code: 200, data: group.data.data };
};

/**
 * @description update a student by all params
 */
const updateGroup = async (data) => {
  const { name, groupId, idPeriod } = data;

  if (name == "" || name == null || name == undefined || name == " ")
    return { code: 400, message: `Error, el campo nombre es inválido` };

  if (groupId == "" || groupId == null || groupId == undefined || groupId == "")
    return { code: 400, message: `Error, el campo  Group Id es inválido` };

  if (
    idPeriod == "" ||
    idPeriod == null ||
    idPeriod == undefined ||
    idPeriod == ""
  )
    return { code: 400, message: `Error, el campo Id Period es inválido` };

  const group = await putApi("group/", {
    groupId,
    name,
    idPeriod,
  });

  if (group.status != 200)
    return {
      code: 400,
      message: `Error al actualizar los datos del Grupo`,
      error: group.data.message,
    };

  return { code: 200, data: group.data.data };
};
/**
 * @descripcion Delete a student by id
 */
const deleteGroup = async (data) => {
  const { groupId } = data;

  if (groupId == "" || groupId == null || groupId == undefined || groupId == "")
    return { code: 400, message: `Error, el campo Group Id es inválido` };

  const group = await putApi(`group/d/${groupId}`, {});

  if (group.status != 200)
    return {
      code: 400,
      message: `Error al eliminar el Periodo`,
      error: group.data.message,
    };

  return { code: 200, data: group.data.data };
};
