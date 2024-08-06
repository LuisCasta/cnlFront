const getAllProspects = async (status) => {
  const prospect = await getApi(`prospect/all/${status}`);

  if (prospect.status != 200)
    return {
      code: 400,
      message: `Error al obtener todos los prospectos`,
      error: prospect.data.message,
    };

  return { code: 200, data: prospect.data.data };
};
