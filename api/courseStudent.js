/** Funcion para dar de alta un alumno en un curso
*
*/
const create = async (data) => {
    const { idCourse, idStudent } = data;
  
    if ( idStudent == "" || idStudent == null || idStudent == undefined || idLesson == " " )
      return { code: 400, message: `Error, el campo idStudent es inválido` };
  
    if ( idCourse == "" || idCourse == null || idCourse == undefined || idCourse == " " )
      return { code: 400, message: `Error, el campo idCourse es inválido` };
  
    const courseStudent = await postDataC("courseStudent/", 
        { idCourse, idStudent });
  
    if (courseStudent.status != 200)
      return {
        code: 400,
        message: `Error al dar de alta un estudiante a un curso`,
        error: courseStudent.data.message,
      };
  
    return { code: 200, data: courseStudent.data.data };
  };

   /**
 * Obtiene todas los estudiantes de un idCourse
 *
 * */
const getByCourse = async (idCourse) => {
    const courseStudent = await getApi(`courseStudent/aboutCourse/${idCourse}`);
  
    if (courseStudent.status != 200)
      return {
        code: 400,
        message: `Error al obtener los estudiantes`,
        error: courseStudent.data.message,
      };
  
    return { code: 200, data: courseStudent.data.data };
  };

   /**
 * Obtiene todas los cursos de un idStudent
 *
 * */
   const getByStudent = async (idStudent) => {
    const courseStudent = await getApi(`courseStudent/aboutStudent/${idStudent}`);
  
    if (courseStudent.status != 200)
      return {
        code: 400,
        message: `Error al obtener los cursos`,
        error: courseStudent.data.message,
      };
  
    return { code: 200, data: courseStudent.data.data };
  };