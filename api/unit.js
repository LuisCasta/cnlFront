//const post = require ("./post");

// Funcion para crear un curso
// { name, code, description }

const create = async (data) => {
  const {
	name
	type
	idCourse

  } = data;

  if (name == "" || name == null || name == undefined || name == " ")
    return { code: 400, message: `Error, el campo nombre es inválido` };

  //   if (code == "" || code == null || code == undefined || code == " ")
  //     return { code: 400, message: `Error, el campo nombre es inválido` };

  if (
    type == "" ||
    type == null ||
    type == undefined ||
    type == " "
  )
    return { code: 400, message: `Error, el campo type es inválido` };
  
  if (
    idCourse == "" ||
    idCourse == null ||
    idCourse == undefined ||
    idCourse == " "
  )
    return { code: 400, message: `Error, el campo Id course es inválido` };

  const unit = await postDataC("unit/", {
	name
	type
	idCourse
	active: 1
  });

  if (unit.status != 200)
    return {
      code: 400,
      message: `Error al crear una unidad`,
      error: unit.data.message,
    };

  return { code: 200, data: unit.data.data };
};

/**
 * Obtiene todas las unidades de un curso
 *
 * */
const getAllByCourse = async (idCourse) => {

	if(idCourse == '' || idCourse == undefined || idCourse == null || idCourse == 0 || idCourse == ' ')
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
