//const post = require ("./post");

// Funcion para crear una actividad
// { name, code, description }

const createActivity = async (data) => {
  const {
    name,
    type,
    description,
    dateStart,
    dateEnd,
    intent,
    link,
    idUnit,
    idLesson,
    idCourse,
  } = data;

  if (name == "" || name == null || name == undefined || name == " ")
    return { code: 400, message: `Error, el campo name es inválido` };

  if (type == "" || type == null || type == undefined || type == " ")
    return { code: 400, message: `Error, el campo type es inválido` };

  if (intent == "" || intent == null || intent == undefined || intent == " ")
    return { code: 400, message: `Error, el campo intent es inválido` };

  if (idUnit == "" || idUnit == null || idUnit == undefined || idUnit == " ")
    return { code: 400, message: `Error, el campo idUnit es inválido` };

  if (
    idLesson == "" ||
    idLesson == null ||
    idLesson == undefined ||
    idLesson == " "
  )
    return { code: 400, message: `Error, el campo idLesson es inválido` };

  if (
    idCourse == "" ||
    idCourse == null ||
    idCourse == undefined ||
    idCourse == " "
  )
    return { code: 400, message: `Error, el campo idCourse es inválido` };

  const activity = await postDataC("activity/", {
    name,
    type,
    description,
    dateStart,
    dateEnd,
    intent,
    link,
    idUnit,
    idLesson,
    idCourse,
  });

  if (activity.status != 200)
    return {
      code: 400,
      message: `Error al crear la actividad`,
      error: activity.data.message,
    };

  return { code: 200, data: activity.data.data };
};

/**
 * Obtiene todas las actividades de un idUnit
 *
 * */
const getByUnitActivity = async (idUnit) => {
  const getActivities = await getApi(`activity/aboutUnit/${idUnit}`);

  if (getActivities.status != 200)
    return {
      code: 400,
      message: `Error al obtener las actividades`,
      error: getActivities.data.message,
    };

  return { code: 200, data: getActivities.data.data };
};

/**
 * Obtiene un periodo por Id
 *
 * */
const getByIdActivity = async (id) => {
  if (id == 0 || id == "" || id == undefined || id == " ")
    return { code: 400, message: `Error, el campo id es inválido` };

  const activity = await getApi(`activity/about/${id}`);

  if (activity.status != 200)
    return {
      code: 400,
      message: `Error al obtener la actividad con el id: ${id}`,
      error: activity.data.message,
    };

  return { code: 200, data: activity.data.data };
};
