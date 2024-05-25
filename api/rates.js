const getAllRatesByUnit = async (idUnit) => {
  const ratesByUnit = await getApi(`mentor/evaluationOfActiveTask/${idUnit}`);

  if (ratesByUnit.status != 200)
    return {
      code: 400,
      message: `Error al cargar las calificaciones`,
      error: ratesByUnit.data.message,
    };
  return { code: 200, data: ratesByUnit.data.data };
};

const getAllRatesPartialByUnit = async (idUnit) => {
  const rateByUnit = await getApi(`unitStudent/aboutReport/${idUnit}`);

  if (rateByUnit.status != 200)
    return {
      code: 400,
      message: `Error al cargar las calificaciones`,
      error: rateByUnit.data.message,
    };
  return { code: 200, data: rateByUnit.data.data };
};

//Guardar calificaciones parciales de un alumno
const saveRatebyStudent = async (data) => {
  const { idUnit, idStudent, score } = data;
  if (idUnit == "" || idUnit == null || idUnit == undefined || idUnit == " ")
    return { code: 400, message: `Error, el campo idUnit es inválido` };
  if (
    idStudent == "" ||
    idStudent == null ||
    idStudent == undefined ||
    idStudent == " "
  )
    return { code: 400, message: `Error, el campo idStudent es inválido` };

  if (score == "" || score == null || score == undefined || score == " ");
  return { code: 400, message: `Error, el campo score es inválido` };
};

// Obtener las calificaciones finales por curso
const getEndRateByCourse = async (idCourse) => {
  const ratesByCourse = await getApi(
    `courseStudent/getReportByCourse/${idCourse}`
  );
  if (ratesByCourse.status != 200)
    return {
      code: 400,
      message: `Error al cargar las calificaciones`,
      error: ratesByCourse.data.message,
    };
  return { code: 200, data: ratesByCourse.data.data };
};

/**
 * @description update a student by all params
 */
const updateActivity = async (data) => {
  const {
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
  } = data;

  if (type == "" || type == null || type == undefined || type == " ")
    return { code: 400, message: `Error, el campo type es inválido` };

  if (idUnit == "" || idUnit == null || idUnit == undefined || idUnit == " ")
    return { code: 400, message: `Error, el campo idUnit es inválido` };

  if (
    idCourse == "" ||
    idCourse == null ||
    idCourse == undefined ||
    idCourse == " "
  )
    return { code: 400, message: `Error, el campo idCourse es inválido` };

  if (
    idLesson == "" ||
    idLesson == null ||
    idLesson == undefined ||
    idLesson == " "
  )
    return { code: 400, message: `Error, el campo idLesson es inválido` };

  if (link == "" || link == null || link == undefined || link == " ")
    return { code: 400, message: `Error, el campo link es inválido` };

  if (name == "" || name == null || name == undefined || name == " ")
    return { code: 400, message: `Error, el campo nombre es inválido` };

  if (intent == "" || intent == null || intent == undefined || intent == "")
    return { code: 400, message: `Error, el campo intento es inválido` };

  if (
    dateStart == "" ||
    dateStart == null ||
    dateStart == undefined ||
    dateStart == ""
  )
    return { code: 400, message: `Error, el campo fecha inicio es inválido` };

  if (dateEnd == "" || dateEnd == null || dateEnd == undefined || dateEnd == "")
    return { code: 400, message: `Error, el campo fecha término es inválido` };

  if (
    description == "" ||
    description == null ||
    description == undefined ||
    description == ""
  )
    return { code: 400, message: `Error, el campo description es inválido` };

  if (
    activityId == "" ||
    activityId == null ||
    activityId == undefined ||
    activityId == ""
  )
    return { code: 400, message: `Error, el campo Acitity Id es inválido` };

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
      message: `Error al actualizar los datos de la Actividad`,
      error: activity.data.message,
    };

  return { code: 200, data: activity.data.data };
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

const obtainRateByIdCourse = async (idCourse) => {
  const calificacionFinal = await getApi(`evaluationAssignature/${idCourse}`);
  if (calificacionFinal.status != 200)
    return {
      code: 400,
      message: `Error al cargar las calificaciones`,
      error: calificacionFinal.data.message,
    };
  return { code: 200, data: calificacionFinal.data.data };
};


