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
  const { idCourse, idMentor, message } = data;
  if (
    idCourse == 0 ||
    idCourse == "" ||
    idCourse == undefined ||
    idCourse == " "
  )
    return { code: 400, message: `Error, el campo id Curso es inválido` };
  if (
    idMentor == 0 ||
    idMentor == "" ||
    idMentor == undefined ||
    idMentor == " "
  )
    return { code: 400, message: `Error, el campo id Mentor es inválido` };

  if (message == 0 || message == "" || message == undefined || message == " ")
    return { code: 400, message: `Error, el campo message es inválido` };

  const newMessage = await postDataC("forum/createMessage", {
    idCourse,
    idMentor,
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
