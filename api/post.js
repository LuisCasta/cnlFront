const urlBase = 'http://localhost:3000';//`https://cnlapi.onrender.com`

// Example POST method implementation:
async function postDataC(url, data ) {

  const response = await axios({
    method: 'post',
    url: `http://localhost:3000/${url}`,
    data
  });
  // Default options are marked with *
  
  return response; // parses JSON response into native JavaScript objects
}

async function getApi(url ) {

  const response = await axios({
    method: 'get',
    url: `http://localhost:3000/${url}`
  });
  // Default options are marked with *
  
  return response; // parses JSON response into native JavaScript objects
}