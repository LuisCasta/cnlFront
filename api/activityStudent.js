/**
 * Obtiene todas las actividades de un idUnit
 *
 * */
const getByCourseActivityStudent = async (idCourse, idStudent) => {
  if (
    idCourse == "" ||
    idCourse == null ||
    idCourse == undefined ||
    idCourse == " "
  )
    return { code: 400, message: `Error, el campo idCurso es inválido` };

  const activities = await getApi(
    `activityStudent/all2/${idCourse}/${idStudent}`
  );

  if (activities.status != 200)
    return {
      code: 400,
      message: `Error al obtener las actividades`,
      error: activities.data.message,
    };

  return { code: 200, data: activities.data.data };
};

const getActivitiesDaily = async (idStudent) => {
  if (
    idStudent == "" ||
    idStudent == null ||
    idStudent == undefined ||
    idStudent == " "
  )
    return { code: 400, message: `Error, el campo idCurso es inválido` };

  const activities = await getApi(`activityStudent/all/${idStudent}`);

  if (activities.status != 200)
    return {
      code: 400,
      message: `Error al obtener las actividades`,
      error: activities.data.message,
    };

  return { code: 200, data: activities.data.data };
};
/**
 *Presentar una actividad
 * */
const sendActivity = async (data) => {
  const {
    actStudId,
    idActivity,
    commentStudent,
    link,
  } = data;

  if (actStudId == "" || actStudId == null || actStudId == undefined || actStudId == " ")
    return { code: 400, message: `Error, el campo actStudId es inválido` };

  if (idActivity == "" || idActivity == null || idActivity == undefined || idActivity == " ")
    return { code: 400, message: `Error, el campo idActivity es inválido` };

  if (commentStudent == "" || commentStudent == null || commentStudent == undefined || commentStudent == " ")
    return { code: 400, message: `Error, el campo commentStudent es inválido` };

  if (link == "" || link == null || link == undefined || link == " ")
    return { code: 400, message: `Error, el campo link es inválido` };

  const activity = await putApi("activityStudent/update", {
    actStudId,
    idActivity,
    commentStudent,
    link,
  });

  if (activity.status != 200)
    return {
      code: 400,
      message: `Error al enviar la actividad`,
      error: activity.data.message,
    };

  return { code: 200, data: activity.data.data };
};

/**
 * Obtener una actividad de alumno por su id
 * */

const getActivitiesDaily = async (idStudent) => {
  if (
    idStudent == "" ||
    idStudent == null ||
    idStudent == undefined ||
    idStudent == " "
  )
    return { code: 400, message: `Error, el campo idCurso es inválido` };

  const activities = await getApi(`activityStudent/all/${idStudent}`);

  if (activities.status != 200)
    return {
      code: 400,
      message: `Error al obtener las actividades`,
      error: activities.data.message,
    };

  return { code: 200, data: activities.data.data };
};
/**
 *Presentar una actividad
 * */
const getActivityStudentById = async (idActivityStudent) => {


  if (idActivityStudent == "" || idActivityStudent == null || idActivityStudent == undefined || idActivityStudent == " ")
    return { code: 400, message: `Error, el campo actStudId es inválido` };

  const activity = await getApi(`activityStudent/aboutActivity/${idActivityStudent}`);

  if (activity.status != 200)
    return {
      code: 400,
      message: `Error al obtener la actividad del estudiante.`,
      error: activity.data.message,
    };

  return { code: 200, data: activity.data.data };
};