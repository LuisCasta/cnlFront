//const post = require ("./post");

// Funcion para crear un curso
// { name, code, description }

const create = async (data) => {
  const {
    name, 
    description, 
    dateStart, 
    idUnit, 
    idCourse
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
    idUnit == "" ||
    idUnit == null ||
    idUnit == undefined ||
    idUnit == " "
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
    idCourse == "" ||
    idCourse == null ||
    idCourse == undefined ||
    idCourse == " "
  )
    return { code: 400, message: `Error, el campo Id grupo es inválido` };

  const lesson = await postDataC("lesson/", {
    name, 
    description, 
    dateStart, 
    idUnit, 
    idCourse
  });

  if (lesson.status != 200)
    return {
      code: 400,
      message: `Error al crear la clase`,
      error: lesson.data.message,
    };

  return { code: 200, data: lesson.data.data };
};

/**
 * Obtiene todas las lecciones de un curso
 *
 * */
const getAllByCourse = async (idCourse) => {

	if(idCourse == '' || idCourse == undefined || idCourse == null || idCourse == 0 || idCourse == ' ')
		return { code: 400, message: `Error, el campo idCourse es inválido` };

	  const lesson = await getApi(`lesson/aboutCourse/${idCourse}`);

	  if (lesson.status != 200)
	    return {
	      code: 400,
	      message: `Error al obtener las clases de un curso`,
	      error: lesson.data.message,
	    };

	  return { code: 200, data: lesson.data.data };
};

/**
 * Obtiene todas las lecciones de una unidad
 *
 * */
const getAllByUnit = async (idUnit) => {

	if(idUnit == '' || idUnit == undefined || idUnit == null || idUnit == 0 || idUnit == ' ')
		return { code: 400, message: `Error, el campo idUnit es inválido` };

	const lesson = await getApi(`lesson/aboutUnit/${idUnit}`);

	if (lesson.status != 200)
	    return {
	      code: 400,
	      message: `Error al obtener las clases de una unidad`,
	      error: lesson.data.message,
	};

	return { code: 200, data: lesson.data.data };
};


/**
 * Obtiene una clase por su id
 *
 * */
const getById = async (id) => {
  if (id == 0 || id == "" || id == undefined || id == " ")
    return { code: 400, message: `Error, el campo id es inválido` };

  const lesson = await getApi(`lesson/about/${id}`);

  if (lesson.status != 200)
    return {
      code: 400,
      message: `Error al obtener la clase con el id: ${id}`,
      error: lesson.data.message,
    };

  return { code: 200, data: lesson.data.data };
};
