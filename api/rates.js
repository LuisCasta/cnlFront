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

const getAllRatesByCourse = async (idUnit) => {
  const calificacionesBycourse = await getApi(
    `unitStudent/aboutReport/${idUnit}`
  );

  if (calificacionesBycourse.status != 200)
    return {
      code: 400,
      message: `Error al cargar las calificaciones`,
      error: calificacionesBycourse.data.message,
    };
  return { code: 200, data: calificacionesBycourse.data.data };
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

// const post = require("./post");

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
