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
