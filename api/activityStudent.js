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

// Presentar una actividad
const sendActivity = async (data) => {
  try {
    const { actStudId, idActivity, commentStudent, link } = data;
    if (
      actStudId == "" ||
      actStudId == null ||
      actStudId == undefined ||
      actStudId == " "
    )
      return { code: 400, message: `Error, el campo actStudId es inválido` };

    if (
      idActivity == "" ||
      idActivity == null ||
      idActivity == undefined ||
      idActivity == " "
    )
      return { code: 400, message: `Error, el campo idActivity es inválido` };

    if (
      commentStudent == "" ||
      commentStudent == null ||
      commentStudent == undefined ||
      commentStudent == " "
    )
      return {
        code: 400,
        message: `Error, el campo commentStudent es inválido`,
      };

    if (link == "" || link == null || link == undefined || link == " ")
      return { code: 400, message: `Error, el campo link es inválido` };

    const activity = await putApi("activityStudent", {
      actStudId,
      idActivity,
      commentStudent,
      link,
    });

    return { code: 200, data: activity.data.data };
  } catch (error) {
    return {
      code: 400,
      message: `Error al enviar la actividad`,
      error,
    };
  }
};

/**
 *Presentar una actividad
 * */
const getActivityStudentById = async (idActivity) => {
  if (
    idActivity == "" ||
    idActivity == null ||
    idActivity == undefined ||
    idActivity == " "
  )
    return {
      code: 400,
      message: `Error, el campo id: Actividad Estudiante es inválido`,
    };

  const activity = await getApi(`activityStudent/about/${idActivity}`);

  if (activity.status != 200)
    return {
      code: 400,
      message: `Error al obtener la actividad del estudiante.`,
      error: activity.data.message,
    };

  return { code: 200, data: activity.data.data };
};
//RENVÍA LA ACTIVIDAD REVISADA

const chekActivityStudentById = async (data) => {
  const { actStudId, commentScore, score } = data;
  if (
    actStudId == "" ||
    actStudId == null ||
    actStudId == undefined ||
    actStudId == " "
  )
    return {
      code: 400,
      message: `Error, el Id actividad estudiante no es válido`,
    };

  if (
    commentScore == null ||
    commentScore == undefined ||
    commentScore == "" ||
    commentScore == " "
  )
    return {
      code: 400,
      message: `Error, el campo commentScore es inválido`,
    };

  if (score == null || score == undefined || score == "" || score == " ")
    return {
      code: 400,
      message: `Error, el campo Score es inválido`,
    };

  const activityCheck = await postDataC("activityStudent/check", {
    actStudId,
    commentScore,
    score,
  });

  if (activityCheck.status != 200)
    return {
      code: 400,
      message: `Error al crear la clase`,
      error: activityCheck.data.message,
    };

  return { code: 200, data: activityCheck.data.data };
};

//RECIBE LA LISTA DE ALUMNOS QUE DEBEN PRESENTAR LA ACTIVIDAD

const loadListActivityStudentCheck = async (idActivity) => {
  if (
    actStudId == "" ||
    actStudId == null ||
    actStudId == undefined ||
    actStudId == " "
  )
    return {
      code: 400,
      message: `Error, al obtener actStudId Estudiante es inválido`,
    };

  const listActivity = await getApi(
    `activityStudent/aboutActivity/${idActivity}`
  );
  if (listActivity.status != 200)
    return {
      code: 400,
      message: `Error al obtener las actividades`,
      error: listActivity.data.message,
    };

  return { code: 200, data: listActivity.data.data };
};

// Update Activity

const updateActivity = async (data) => {
  const {
    name,
    description,
    dateStart,
    dateEnd,
    intent,
    activityId,
    type,
    idLesson,
    idCourse,
    idUnit,
    link,
  } = data;

  if (name == "" || name == null || name == undefined || name == " ")
    return { code: 400, message: `Error, el campo nombre es inválido` };

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

  if (idUnit == "" || idUnit == null || idUnit == undefined || idUnit == " ")
    return { code: 400, message: `Error, el campo idUnit es inválido` };

  if (
    description == "" ||
    description == null ||
    description == undefined ||
    description == " "
  )
    return { code: 400, message: `Error, el campo descripción es inválido` };

  if (intent == "" || intent == null || intent == undefined || intent == " ")
    return { code: 400, message: `Error, el campo intento es inválido` };

  if (
    dateEnd == "" ||
    dateEnd == null ||
    dateEnd == undefined ||
    dateEnd == " "
  )
    return { code: 400, message: `Error, el campo finaliza es inválido` };

  if (
    dateStart == "" ||
    dateStart == null ||
    dateStart == undefined ||
    dateStart == " "
  )
    return { code: 400, message: `Error, el campo Inicia es inválido` };

  if (
    activityId == "" ||
    activityId == null ||
    activityId == undefined ||
    activityId == " "
  )
    return { code: 400, message: `Error, el campo id es inválido` };

  const activity = await putApi("activity/", {
    name,
    description,
    intent,
    dateEnd,
    dateStart,
    idLesson,
    idCourse,
    idUnit,
    type,
    link,
    activityId,
  });

  if (activity.status != 200)
    return {
      code: 400,
      message: `Error al actualizar la actividad`,
      error: activity.data.message,
    };

  return { code: 200, data: activity.data.data };
};
