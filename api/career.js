
//const post = require ("./post");

// Funcion para crear una carrera
// { name, code, description }

const create = async (data) => {

	const { name, code, description } = data;

	if(name == '' || name == null || name == undefined || name == ' ') 
		return {code : 400, message : `Error, el campo nombre es inválido`};

	if(code == '' || code == null || code == undefined || code == ' ') 
		return {code : 400, message : `Error, el campo nombre es inválido`};

	if(description == '' || description == null || description == undefined || description == ' ') 
		return {code : 400, message : `Error, el campo description es inválido`};

	const career = await postDataC("career/", { name, code, description });

	if(career.status != 200)
    	return {code : 400, message : `Error al crear la carrera`, error: career.data.message};

    return {code : 200, data : career.data.data}
}

/**
 * Obtiene todas las carreras
 * 
 * */
const getAll = async () => {

	const career = await getApi("career/all");

	if(career.status != 200)
    	return {code : 400, message : `Error al crear la carrera`, error: career.data.message};

    return {code : 200, data : career.data.data}
}