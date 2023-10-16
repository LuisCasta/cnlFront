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
