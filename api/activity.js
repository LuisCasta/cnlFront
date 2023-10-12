//const post = require ("./post");

// Funcion para crear una actividad
// { name, code, description }

const create = async (data) => {
    const { name, type, description, dateStart, dateEnd, intent, link, idUnit, idLesson, idCourse} = data;
  
    if (name == "" || name == null || name == undefined || name == " ")
      return { code: 400, message: `Error, el campo name es inválido` };
  
    if (type == "" || type == null || type == undefined || type == " ")
      return { code: 400, message: `Error, el campo type es inválido` };
  
    if ( intent == "" || intent == null || intent == undefined || intent == " " )
      return { code: 400, message: `Error, el campo intent es inválido` };
    
    if ( idUnit == "" || idUnit == null || idUnit == undefined || idUnit == " " )
      return { code: 400, message: `Error, el campo idUnit es inválido` };
  
    if ( idLesson == "" || idLesson == null || idLesson == undefined || idLesson == " " )
      return { code: 400, message: `Error, el campo idLesson es inválido` };
  
    if ( idCourse == "" || idCourse == null || idCourse == undefined || idCourse == " " )
      return { code: 400, message: `Error, el campo idCourse es inválido` };
  
    const activity = await postDataC("activity/", 
        { name, type, description, dateStart, dateEnd, intent, link, idUnit, idLesson, idCourse });
  
    if (activity.status != 200)
      return {
        code: 400,
        message: `Error al crear la actividad`,
        error: activity.data.message,
      };
  
    return { code: 200, data: activity.data.data };
  };