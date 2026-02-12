//const post = require ("./post");

// Funcion para crear una carrera
// { name, code, description }

const create = async (data) => {
  const { name, code, description } = data;

  if (name == "" || name == null || name == undefined || name == " ")
    return { code: 400, message: `Error, el campo nombre es inválido` };

  if (code == "" || code == null || code == undefined || code == " ")
    return { code: 400, message: `Error, el campo nombre es inválido` };

  if (
    description == "" ||
    description == null ||
    description == undefined ||
    description == " "
  )
    return { code: 400, message: `Error, el campo description es inválido` };

  const career = await postDataC("career/", { name, code, description });

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
const getAll = async () => {
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
const getById = async (id) => {
  if (id == 0 || id == "" || id == undefined || id == " ")
    return { code: 400, message: `Error, el campo id es inválido` };

  const career = await getApi(`career/about/${id}`);

  if (career.status != 200)
    return {
      code: 400,
      message: `Error al obtener carrera con el id: ${id}`,
      error: career.data.message,
    };

  return { code: 200, data: career.data.data };
};

/**
 * @description update a student by all params
 */
const updateCarrera = async (data) => {
  const { name, description, careerId, code, totalCourses, estatus } = data;

  if (name == "" || name == null || name == undefined || name == " ")
    return { code: 400, message: `Error, el campo nombre es inválido` };

  if (totalCourses == "" || totalCourses == null || totalCourses == undefined || totalCourses == " ")
    return { code: 400, message: `Error, el campo total de cursos es inválido` };

  if (code == "" || code == null || code == undefined || code == "")
    if (
      description == "" ||
      description == null ||
      description == undefined ||
      description == ""
    )
      return { code: 400, message: `Error, el campo description es inválido` };

  if (
    careerId == "" ||
    careerId == null ||
    careerId == undefined ||
    careerId == ""
  )
    return { code: 400, message: `Error, el campo careerId es inválido` };

  const career = await putApi("career/", {
    careerId,
    name,
    description,
    code,
    totalCourses,
  });

  if (career.status != 200)
    return {
      code: 400,
      message: `Error al actualizar los datos de la carrera`,
      error: career.data.message,
    };

  return { code: 200, data: career.data.data };
};


/**
 * @descripcion Delete a student by id
 */
const deleteCarrera = async (data) => {
  const { careerId } = data;

  if (
    careerId == "" ||
    careerId == null ||
    careerId == undefined ||
    careerId == ""
  )
    return { code: 400, message: `Error, el campo nombre es inválido` };

  const career = await putApi(`career/d/${careerId}`, {});

  if (career.status != 200)
    return {
      code: 400,
      message: `Error al eliminar al Mentor`,
      error: career.data.message,
    };

  return { code: 200, data: career.data.data };
};
