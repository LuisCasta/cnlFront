"use strict";
const getAllNotice = async () => {
  const messages = await getApi("notices/all");
  if (messages.status != 200)
    return {
      code: 400,
      message: `Error al obtener los Avisos del`,
      error: messages.data.message,
    };
  return { code: 200, data: messages };
};

// Crear Nuevos avisos ADMIN

const newMessage = async (data) => {
  const { notice, status } = data;

  if (notice == "" || notice == null || notice == undefined || notice == " ")
    return { code: 400, message: `Error, el campo notice es inválido` };

  if (status == "" || status == null || status == undefined || status == " ")
    return { code: 400, message: `Error, el campo estatus es inválido` };

  const message = await postDataC("notices/", { notice, status });

  if (message.status != 200)
    return {
      code: 400,
      message: `Error al crear un nuevo mensaje`,
      error: message.data.message,
    };

  return { code: 200, data: message.data.data };
};

// ELIMINAR LAS NOTIFICACIONES
// notices/d/
const deleteAdvice = async (data) => {
  const { id } = data;

  if (id == "" || id == null || id == undefined || id == "")
    return { code: 400, message: `Error, el campo id es inválido` };

  const delAdvice = await putApi(`notices/d/${id}`, {});

  if (delAdvice.status != 200)
    return {
      code: 400,
      message: `Error al eliminar el Aviso`,
      error: delAdvice.data.message,
    };

  return { code: 200, data: delAdvice.data.data };
};
