const getAllRatesByUnit = async (idUnit) => {
  const ratesByUnit = await getApi(`unitStudent/aboutUnit/${idUnit}`);

  if (ratesByUnit.status != 200)
    return {
      code: 400,
      message: `Error al crear la carrera`,
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
  const ratesByCourse = await getApi(`courseStudent/aboutCourse/${idCourse}`);
  if (ratesByCourse.status != 200)
    return {
      code: 400,
      message: `Error al cargar las calificaciones`,
      error: ratesByCourse.data.message,
    };
  return { code: 200, data: ratesByCourse.data.data };
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
