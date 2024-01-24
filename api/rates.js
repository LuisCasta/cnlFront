//const post = require ("./post");

// Funcion para crear una carrera
// { name, code, description }

// const create = async (data) => {
//   const { name, code, description } = data;

//   if (name == "" || name == null || name == undefined || name == " ")
//     return { code: 400, message: `Error, el campo nombre es inválido` };

//   if (code == "" || code == null || code == undefined || code == " ")
//     return { code: 400, message: `Error, el campo nombre es inválido` };

//   if (
//     description == "" ||
//     description == null ||
//     description == undefined ||
//     description == " "
//   )
//     return { code: 400, message: `Error, el campo description es inválido` };

//   const career = await postDataC("career/", { name, code, description });

//   if (career.status != 200)
//     return {
//       code: 400,
//       message: `Error al crear la carrera`,
//       error: career.data.message,
//     };

//   return { code: 200, data: career.data.data };
// };

/**
 * Obtiene todas las carreras
 *
 * */
const getAllRatesByUnit = async (idUnit) => {
  const career = await getApi(`unitStudent/aboutUnit/${idUnit}`);

  if (career.status != 200)
    return {
      code: 400,
      message: `Error al crear la carrera`,
      error: career.data.message,
    };

  return { code: 200, data: career.data.data };
};

/**
 * Obtiene todas las carreras
 *
 * */
// const getById = async (id) => {
//   if (id == 0 || id == "" || id == undefined || id == " ")
//     return { code: 400, message: `Error, el campo id es inválido` };

//   const career = await getApi(`career/about/${id}`);

//   if (career.status != 200)
//     return {
//       code: 400,
//       message: `Error al obtener carrera con el id: ${id}`,
//       error: career.data.message,
//     };

//   return { code: 200, data: career.data.data };
// };
