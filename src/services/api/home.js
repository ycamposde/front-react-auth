import apiConfig from './config';

export default {
  getUsuarios: function (success) {
    const my_token = JSON.parse(sessionStorage.getItem("Token"));
    const token = my_token ? my_token.access_token: '';

    return fetch(`${apiConfig.constants.url_api}/api/home`, {
      headers: {
        Authorization: `Bearer ${ token }`,
        Accept: 'application/json'
      }
    })
    .then(apiConfig.methods.checkStatus)
    .then(apiConfig.methods.parseJSON)
    .then(success);
  },

  createUsuario: function (data, success, error) {
    return fetch(`${apiConfig.constants.url_api}/api/usuario`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(apiConfig.methods.checkStatus)
    .then(apiConfig.methods.parseJSON)
    .then(success)
    .catch(apiConfig.methods.error)
    .then(error);
  }
};
