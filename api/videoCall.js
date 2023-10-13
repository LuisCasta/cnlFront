/** Funcion para crear videollamada
 *
 */
const createVideoCall = async (data) => {
  const { name, link, description, idCourse } = data;

  if (name == "" || name == null || name == undefined || name == " ")
    return { code: 400, message: `Error, el campo name es inválido` };

  if (
    idCourse == "" ||
    idCourse == null ||
    idCourse == undefined ||
    idCourse == " "
  )
    return { code: 400, message: `Error, el campo idCourse es inválido` };

  const videoCall = await postDataC("videoCall/", {
    name,
    link,
    description,
    idCourse,
  });

  if (videoCall.status != 200)
    return {
      code: 400,
      message: `Error al crear una videollamada`,
      error: videoCall.data.message,
    };

  return { code: 200, data: videoCall.data.data };
};

/**
 * Obtiene todas las videollamadas de un curso
 *
 * */
const videoCallGetByCourse = async (idCourse) => {
  const videoCall = await getApi(`videoCall/all/${idCourse}`);

  if (videoCall.status != 200)
    return {
      code: 400,
      message: `Error al obtener las videollamadas del curso ${idCourse}`,
      error: videoCall.data.message,
    };

  return { code: 200, data: videoCall.data.data };
};
