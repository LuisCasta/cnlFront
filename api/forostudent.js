const ListMessagesForo = async (idCourse) => {
  if (
    idCourse == 0 ||
    idCourse == "" ||
    idCourse == undefined ||
    idCourse == " "
  )
    return { code: 400, message: `Error, el campo id Curso es inválido` };

  const messages = await getApi(`forum/listAllMessages/${idCourse}`);
  if (messages.status != 200)
    return {
      code: 400,
      message: `Error al obtener los mensajes del foro`,
      error: messages.data.message,
    };
  return { code: 200, data: messages };
};

const enviarMensaje = async (data) => {
  const { idCourse, idStudent, message } = data;
  if (
    idStudent == 0 ||
    idStudent == "" ||
    idStudent == undefined ||
    idStudent == " "
  )
    return { code: 400, message: `Error, el campo id Curso es inválido` };
  if (
    idStudent == 0 ||
    idStudent == "" ||
    idStudent == undefined ||
    idStudent == " "
  )
    return { code: 400, message: `Error, el campo id etudiante es inválido` };

  if (message == 0 || message == "" || message == undefined || message == " ")
    return { code: 400, message: `Error, el campo message es inválido` };

  const newMessage = await postDataC("forum/student/sendMessage", {
    idCourse,
    idStudent,
    message,
  });

  if (newMessage.status != 200)
    return {
      code: 400,
      message: `Error al crear el  mensaje`,
      error: newMessage.data.message,
    };

  return { code: 200, data: newMessage.data.data };
};
