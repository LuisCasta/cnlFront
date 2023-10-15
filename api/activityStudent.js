/**
 * Obtiene todas las actividades de un idUnit
 *
 * */
const getByCourseActivityStudent = async (idCurso, idStudent) => {

  if (idCurso == "" || idCurso == null || idCurso == undefined || idCurso == " ")
    return { code: 400, message: `Error, el campo idCurso es inválido` };

  
    const activities = await getApi(`activityStudent/all2/${idCurso}/${idStudent}`);
  
  if (activities.status != 200)
    return {
      code: 400,
      message: `Error al obtener las actividades`,
      error: activities.data.message,
    };

  return { code: 200, data: activities.data.data };
};

const getActivitiesDaily = async (idStudent) => {

  if (idCurso == "" || idCurso == null || idCurso == undefined || idCurso == " ")
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
