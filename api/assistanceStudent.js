/** Funcion para dar de alta un alumno en un curso
*
*/
const createAssistance = async (data) => {
    const { idAssistance, idStudent } = data;
  
    if ( idStudent == "" || idStudent == null || idStudent == undefined || idLesson == " " )
      return { code: 400, message: `Error, el campo idStudent es inválido` };
  
    if ( idAssistance == "" || idAssistance == null || idAssistance == undefined || idCourse == " " )
      return { code: 400, message: `Error, el campo idAssistance es inválido` };
  
    const assistanceStudent = await postDataC("assistanceStudent/", 
        { idCourse, idStudent });
  
    if (assistanceStudent.status != 200)
      return {
        code: 400,
        message: `Error al tomar asistencia`,
        error: assistanceStudent.data.message,
      };
  
    return { code: 200, data: assistanceStudent.data.data };
  };