/**
 * Obtiene todas las actividades de un idUnit
 *
 * */
const getByCourseActivityStudent = async (idCurso, tipo) => {

  if (idCurso == "" || idCurso == null || idCurso == undefined || idCurso == " ")
    return { code: 400, message: `Error, el campo idCurso es inválido` };

  var activities;
  if(tipo == "agenda") {
    activities = await getApi(`activityStudent/all/${idCurso}`);
  } else {
    activities = await getApi(`activityStudent/all2/${idCurso}`);
  }
  
  if (activities.status != 200)
    return {
      code: 400,
      message: `Error al obtener las actividades`,
      error: activities.data.message,
    };

  return { code: 200, data: activities.data.data };
};
